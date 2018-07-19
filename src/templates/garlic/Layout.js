/**
 * This module exports a stateful garlic layout component
 * ============
 * @module quinoa-story-player/templates/garlic
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Scrollbars} from 'react-custom-scrollbars';
import {SpringSystem, MathUtil} from 'rebound';
import {debounce} from 'lodash';
import {ReferencesManager} from 'react-citeproc';

import SectionLayout from './SectionLayout';

import Bibliography from '../../components/Bibliography';
import NotesContainer from '../../components/NotesContainer';

import defaultCitationStyle from 'raw-loader!../../assets/apa.csl';
import defaultCitationLocale from 'raw-loader!../../assets/english-locale.xml';

import './garlic.scss';

/**
 * Retrieves the absolute offset of an element
 * (this avoids to use an additionnal lib such as jquery to handle the operation)
 * (todo: this should be stored in a separate utils file)
 * @param {DOMElement} el - the element to inspect
 * @return {object} offset - the absolute offset of the element
 */
function getOffset(el) {
    let _x = 0;
    let _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft; // - el.scrollLeft;
        _y += el.offsetTop; // - el.scrollTop;
        el = el.offsetParent;
    }
    return {top: _y, left: _x};
}
/**
 * GarlicLayout class for building a story-player template react component instances
 */
class GarlicLayout extends Component {
  /**
   * constructor
   * @param {object} props - properties given to instance at instanciation
   */
  constructor(props) {
    super(props);
    this.scrollToContents = this.scrollToContents.bind(this);
    this.scrollToCover = this.scrollToCover.bind(this);
    this.handleSpringUpdate = this.handleSpringUpdate.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
    this.onScrollUpdate = debounce(this.onScrollUpdate, 30);
    // this.onScrollUpdate = this.onScrollUpdate.bind(this);
    this.buildTOC = this.buildTOC.bind(this);
    this.scrollToElementId = this.scrollToElementId.bind(this);
    this.onNoteContentPointerClick = this.onNoteContentPointerClick.bind(this);
    this.onGlossaryMentionClick = this.onGlossaryMentionClick.bind(this);

    this.toggleIndex = this.toggleIndex.bind(this);

    this.onPresentationExit = this.onPresentationExit.bind(this);
    /**
     * Initial state
     */
    this.state = {
      /**
       * Wether the component's scroll is on top's cover of the page
       */
      inCover: true,
      /**
       * Data used for the table of content
       */
      toc: [],
      /**
       * Representation of the scroll position
       */
      scrollTop: 0,
      /**
       * Whether the index displaying the table of content is open
       */
      indexOpen: false,
      /**
       * citation-related data
       */
      citations: {
        citationItems: {},
        citationData: []
      },
      /**
       * Glossary-related data
       */
      glossary: [],
      /**
       * Cover image resource data
       */
      coverImage: undefined
    };
  }
  /**
   * Updates data in the context when the state or props change
   */
  getChildContext() {
    return {
      // id of the presentation-player displayed in full screen if any
      fixedPresentationId: this.state.fixedPresentationId,
      // callback to trigger when a presentation-player is exited
      onExit: this.onPresentationExit,
      // calback to trigger when a note content pointer is clicked
      onNoteContentPointerClick: this.onNoteContentPointerClick,
      // callbacks when a glossary mention is clicked
      onGlossaryMentionClick: this.onGlossaryMentionClick,
    };
  }
  /**
   * Executes code on instance after the component is mounted
   */
  componentDidMount() {
    // we use a spring system to handle automatic scrolls
    // (e.g. note pointer clicked or click in the table of contents)
    this.springSystem = new SpringSystem();
    this.spring = this.springSystem.createSpring();
    this.spring.addListener({onSpringUpdate: this.handleSpringUpdate});
    // todo: why did I have to wrap that in a setTimeout ?
    setTimeout(() => {
      if (this.props.story) {
        this.setState({
          glossary: this.buildGlossary(this.props.story),
          citations: this.buildCitations(this.props.story),
          coverImage: this.buildCoverImage(this.props.story)
        });
      }
    });
  }
  /**
   * Executes code when component receives new properties
   * @param {object} nextProps - the future properties of the component
   */
  componentWillReceiveProps(nextProps) {
    // we perform expensive operations of building glossary
    // and citations data only when the story changes
    if (this.props.story !== nextProps.story) {
      this.setState({
        glossary: this.buildGlossary(nextProps.story),
        citations: this.buildCitations(nextProps.story),
        coverImage: this.buildCoverImage(nextProps.story)
      });
    }
  }

  /**
   * Builds component-consumable table of contents data
   * @param {object} story - the story to process
   * @param {number} scrollTop - the position of the scroll to use for decidinng which TOC item is active
   * @return {array} tocElements - the toc elements to use for rendering the TOC
   */
  buildTOC (story, scrollTop) {
    return story.sectionsOrder
    .map((sectionId, sectionIndex) => {
      const section = story.sections[sectionId];
      const sectionLevel = section.metadata.level + 1;
      // const content = section.contents;
      // we retrieve all the 'header-#' blocks
      // in the draft-js raw representation of each section
      // const headers = content && content.blocks && content.blocks
      // .filter(block => block.type.indexOf('header') === 0);

      let sectionActive;
      let nextTitleOffsetTop;
      // title of the section
      const title = document.getElementById(section.id);
      if (!title) {
        return undefined;
      }
      // we will check if scroll is in this section's part of the page height
      const titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
      // to do that we need the offset of the next element
      if (sectionIndex < story.sectionsOrder.length - 1) {
        const next = story.sectionsOrder[sectionIndex + 1];
        const nextTitle = document.getElementById(next);
        if (nextTitle) {
          nextTitleOffsetTop = nextTitle.offsetTop + title.offsetParent.offsetParent.offsetTop;
        }
      }
      if (titleOffsetTop <= scrollTop + window.innerHeight / 2 &&
          (nextTitleOffsetTop === undefined ||
            nextTitleOffsetTop >= scrollTop
          )
        ) {
        sectionActive = true;
      }
      // eventually we format the headers for display
      const sectionHeader = {
        level: sectionLevel,
        text: section.metadata.title || '',
        key: section.id,
        active: sectionActive
      };
      // const headerItems = headers ? headers
      //   .map((block, index) => {
      //     const {type, text, key} = block;
      //     const levelStr = type.split('header-').pop();
      //     let level;
      //     switch (levelStr) {
      //       case 'one':
      //         level = sectionLevel + 1;
      //         break;
      //       case 'two':
      //         level = sectionLevel + 2;
      //         break;
      //       case 'three':
      //         level = sectionLevel + 3;
      //         break;
      //       case 'four':
      //         level = sectionLevel + 4;
      //         break;
      //       case 'five':
      //         level = sectionLevel + 5;
      //         break;
      //       case 'six':
      //       default:
      //         level = sectionLevel + 6;
      //         break;
      //     }

      //     title = document.getElementById(key);
      //     titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
      //     // nextTitleOffsetTop;
      //     if (index < headers.length - 1) {
      //       const next = headers[index + 1];
      //       const nextTitle = document.getElementById(next.key);
      //       nextTitleOffsetTop = nextTitle.offsetTop + title.offsetParent.offsetParent.offsetTop;
      //     }
      //     let headerActive;
      //     if (titleOffsetTop <= scrollTop + window.innerHeight / 2 &&
      //         (nextTitleOffsetTop === undefined ||
      //           nextTitleOffsetTop >= scrollTop
      //         )
      //       ) {
      //       headerActive = true;
      //     }
      //     return {
      //       level,
      //       text,
      //       key,
      //       active: headerActive
      //     };
      //   }) : [];
      return [
        sectionHeader,
        // ...headerItems
        ];
      })
      .filter(el => el !== undefined)
      // flatten mini-tocs
      .reduce((result, ar) => [...result, ...ar], []);
  }

  buildCoverImage = (story) => {
    const {
      resources,
      metadata
    } = story;
    if (metadata.coverImage && metadata.coverImage.resourceId) {
      if (resources[metadata.coverImage.resourceId])
        return resources[metadata.coverImage.resourceId].data;
      else return null;
    }
    else return null;
  }
  /**
   * Builds component-consumable data to represent
   * the citations of "bib" resources being mentionned in the story
   * @param {object} story - the story to process
   * @return {object} citationData - the citation data to input in the reference manager
   */
  buildCitations = (story) => {
    const {
      contextualizations,
      contextualizers,
      resources
    } = story;
    /*
     * Assets preparation
     */
    const assets = Object.keys(contextualizations)
    .reduce((ass, id) => {
      const contextualization = contextualizations[id];
      const contextualizer = contextualizers[contextualization.contextualizerId];
      return {
        ...ass,
        [id]: {
          ...contextualization,
          resource: resources[contextualization.resourceId],
          contextualizer,
          type: contextualizer ? contextualizer.type : 'INLINE_ASSET'
        }
      };
    }, {});
    /*
     * Citations preparation
     */
    // isolate bib contextualizations
    const bibContextualizations = Object.keys(assets)
    .filter(assetKey =>
        assets[assetKey].type === 'bib'
      )
    .map(assetKey => assets[assetKey]);
    // build citations items data
    const citationItems = Object.keys(bibContextualizations)
      .reduce((finalCitations, key1) => {
        const bibCit = bibContextualizations[key1];
        const citations = bibCit.resource.data;
        const newCitations = citations.reduce((final2, citation) => {
          return {
            ...final2,
            [citation.id]: citation
          };
        }, {});
        return {
          ...finalCitations,
          ...newCitations,
        };
      }, {});
    // build citations's citations data
    const citationInstances = bibContextualizations // Object.keys(bibContextualizations)
      .map((bibCit, index) => {
        const key1 = bibCit.id;
        const contextualization = contextualizations[key1];

        const contextualizer = contextualizers[contextualization.contextualizerId];
        const resource = resources[contextualization.resourceId];
        return {
          citationID: key1,
          citationItems: resource.data.map(ref => ({
            locator: contextualizer.locator,
            prefix: contextualizer.prefix,
            suffix: contextualizer.suffix,
            // ...contextualizer,
            id: ref.id,
          })),
          properties: {
            noteIndex: index + 1
          }
        };
      });
    // map them to the clumsy formatting needed by citeProc
    const citationData = citationInstances.map((instance, index) => [
      instance,
      // citations before
      citationInstances.slice(0, (index === 0 ? 0 : index))
        .map((oCitation) => [
            oCitation.citationID,
            oCitation.properties.noteIndex
          ]
        ),
      []
      // citations after the current citation
      // this is claimed to be needed by citeproc.js
      // but it works without it so ¯\_(ツ)_/¯
      // citationInstances.slice(index)
      //   .map((oCitation) => [
      //       oCitation.citationID,
      //       oCitation.properties.noteIndex
      //     ]
      //   ),
    ]);
    return {
      citationData,
      citationItems
    };
  }

  /**
   * Builds component-consumable data to represent
   * the glossary of "entities" resources being mentionned in the story
   * @param {object} story - the story to process
   * @return {array} glossaryMentions - all the glossary entries properly formatted for rendering
   */
  buildGlossary(story) {
    const {
      contextualizations,
      contextualizers,
      resources
    } = story;
    let glossaryMentions = Object.keys(contextualizations)
      .filter(contextualizationId => {
        const contextualizerId = contextualizations[contextualizationId].contextualizerId;
        const contextualizer = contextualizers[contextualizerId];
        return contextualizer && contextualizer.type === 'glossary';
      })
      .map(contextualizationId => ({
        ...contextualizations[contextualizationId],
        contextualizer: contextualizers[contextualizations[contextualizationId].contextualizerId],
        resource: resources[contextualizations[contextualizationId].resourceId]
      }))
      .reduce((entries, contextualization) => {
        return {
          ...entries,
          [contextualization.resourceId]: {
            resource: contextualization.resource,
            mentions: entries[contextualization.resourceId] ?
                        entries[contextualization.resourceId].mentions.concat(contextualization)
                        : [contextualization]
          }
        };
      }, {});

    glossaryMentions = Object.keys(glossaryMentions)
                        .map(id => glossaryMentions[id])
                        .sort((a, b) => {
                          if (a.resource.data.name > b.resource.data.name) {
                            return -1;
                          }
                          else {
                            return 1;
                          }
                        });

    return glossaryMentions;
  }

  /**
   * Handles the scrolling process using the spring system
   * @param {object} spring - the spring system instance
   */
  handleSpringUpdate(spring) {
    const val = spring.getCurrentValue();
    if (val !== undefined && this.globalScrollbar) {
      this.globalScrollbar.scrollTop(val);
    }
  }

  /**
   * Programmatically modifies the scroll state of the component
   * so that it transitions to a specific point in the page
   * @param {number} top - the position to scroll to
   */
  scrollTop(top) {
      const scrollbars = this.globalScrollbar;
      const scrollTop = scrollbars.getScrollTop();
      const scrollHeight = scrollbars.getScrollHeight();
      const val = MathUtil.mapValueInRange(top, 0, scrollHeight, 0, scrollHeight);
      this.spring.setCurrentValue(scrollTop).setAtRest();
      this.spring.setEndValue(val);
  }

  /**
   * Handle scrolling to a specific title in the page
   * @param {string} id - the id of the item to scroll to
   */
  scrollToElementId (id) {
    const title = document.getElementById(id);
    if (title) {
      this.scrollTop(title.offsetTop + title.offsetParent.offsetParent.offsetTop - this.context.dimensions.height / 2);
    }
  }

  /**
   * Updates the state when scroll is changed
   * @param {object} evt - the scroll event to process
   */
  onScrollUpdate = (evt) => {
    if (!this.header) {
      return;
    }
    const scrollTop = evt.scrollTop;
    const headerHeight = this.header.offsetHeight;
    const presentationEls = document.getElementsByClassName('quinoa-presentation-player');
    const presentations = [];
    let fixedPresentationId;
    let fixedPresentationHeight;
    let stateChanges = {};

    // check if we are in the cover of the story
    if (scrollTop < headerHeight && !this.state.inCover) {
      stateChanges = {
        ...stateChanges,
        inCover: true,
      };
    }
    else if (scrollTop > headerHeight && this.state.inCover) {
      stateChanges = {
        ...stateChanges,
        inCover: false,
      };
    }
    // applying state changes if needed
    if (Object.keys(stateChanges).length) {
      this.setState(stateChanges);
      return;
    }
    // check if a presentation is in "fixed" mode (user scrolls inside it)
    for (let i = 0; i < presentationEls.length; i ++) {
      const presentation = presentationEls[i].parentNode;
      const id = presentation.getAttribute('id');
      const top = presentation.offsetTop + this.header.offsetHeight;
      const height = presentation.offsetHeight;
      presentations.push({
        id,
        top,
        height
      });
      // checking if this presentation deserves to be "fixed" (user scroll inside it)
      // note : there can be more or less strict rules to define when to switch to "fixed" mode - it's a matter of ux and testing
      if (
        scrollTop >= top && scrollTop <= top + height * 0.4 - 5
        // (scrollTop > prevScroll && prevScroll < top && scrollTop > top)
        // || (scrollTop >= prevScroll && scrollTop >= top && scrollTop <= top + height * 0.9)
        // || (scrollTop <= prevScroll && scrollTop >= top && scrollTop <= top + height * .5)
      ) {
        fixedPresentationId = id;
        fixedPresentationHeight = height;
      }
    }
    // if new fixed presentation, set it in state thanks to fixedPresentationId
    if (fixedPresentationId !== this.state.fixedPresentationId) {
      stateChanges = {
        ...stateChanges,
        fixedPresentationId,
        fixedPresentationHeight,
      };
      this.setState(stateChanges);
      return;
    }
    // if scroll has changed, update the table of contents
    // (active element may have changed)
    // (todo: right now we are rebuilding the toc from scratch
    // at each update, we should split buildTOC in two functions
    // to handle the change of active element separately, for better performances)
    if (scrollTop !== this.state.scrollTop) {
      const toc = this.buildTOC(this.props.story, scrollTop);
      stateChanges = {
        ...stateChanges,
        toc,
        scrollTop,
      };
    }
    // applying state changes if needed
    if (Object.keys(stateChanges).length) {
      this.setState(stateChanges);
    }
  }

  /**
   * Handle scrolling to the begining of contents
   */
  scrollToContents () {
    if (this.header) {
      this.scrollTop(this.header.offsetHeight);
      this.setState({
        inCover: false,
      });
    }
  }

  /**
   * Handle scrolling to the cover (top of the page)
   */
  scrollToCover () {
    this.scrollTop(0);
    this.setState({
      inCover: true,
    });
  }

  /**
   * Handles click on a specific note pointer in the main contents (scroll to the related note)
   * @param {string} noteId - the id of the note clicked
   */
  onNoteContentPointerClick(noteId) {
    const noteElId = 'note-block-pointer-' + noteId;
    const el = document.getElementById(noteElId);
    const offset = getOffset(el);
    const top = offset.top - this.context.dimensions.height / 2;
    this.scrollTop(top);
  }

  /**
   * Handles click on a specific note pointer in the notes section (scroll to the related pointer)
   * @param {object} note - the note data
   */
  onNotePointerClick = (note) => {
    const noteElId = 'note-content-pointer-' + note.id;
    const el = document.getElementById(noteElId);
    const offset = getOffset(el);
    const top = offset.top - this.context.dimensions.height / 2;
    this.scrollTop(top);
  }

  /**
   * Handles when a full-screen presentation is exited
   * @param {string} - the direction of the exit (top or bottom)
   */
  onPresentationExit (direction) {
    const top = this.state.scrollTop;
    // user is scrolling in direction of the top of the screen
    if (direction === 'top') {
      this.globalScrollbar.scrollTop(top - 50);
    }
    // user is scrolling in direction of the bottom of the screen
    else {
      const h = this.state.fixedPresentationHeight || this.context.dimensions.height;

      this.globalScrollbar.scrollTop(top + h * 0.1);
    }
  }

  onGlossaryMentionClick(id) {
    const target = 'glossary-mention-backlink-' + id;
    this.scrollToElementId(target);
  }

  /**
   * Toggles the visibility of the table of contents
   * @param {boolean} to - whether toc should be visible
   */
  toggleIndex(to) {
    this.setState({
      indexOpen: to !== undefined ? to : !this.state.indexOpen
    });
  }

  /**
   * Renders the component
   * @return {ReactElement} component - the component
   */
  render() {
    const {
      story: {
        metadata,
        sectionsOrder,
        sections,
        settings = {},
      }
    } = this.props;
    const {
      inCover,
      toc,
      indexOpen,
      glossary,
      citations,
      coverImage
    } = this.state;
    const {
      dimensions,
      getResourceDataUrl
    } = this.context;
    const customCss = settings.css || '';
    /**
     * callbacks
     */
    let noteCount = 1;
    const notes = sectionsOrder.reduce((nf, sectionId) => [
      ...nf,
      ...sections[sectionId].notesOrder
          .map(noteId => ({
            ...sections[sectionId].notes[noteId],
            sectionId,
            finalOrder: noteCount++,
          }))
    ], []);
    const finalSections = Object.keys(sections).reduce((res, sectionId) => ({
      ...res,
      [sectionId]: {
        ...sections[sectionId],
        notes: Object.keys(sections[sectionId].notes).reduce((tempNotes, noteId) => {
          const related = notes.find(n => n.id === noteId);
          return {
            ...tempNotes,
            [noteId]: {
              ...sections[sectionId].notes[noteId],
              finalOrder: related ? related.finalOrder : sections[sectionId].notes[noteId].order
            }
          };
        }, {})
      }
    }), {});
    const onClickToggle = () => this.toggleIndex();
    const onClickTitle = () => {
      this.scrollToContents();
      this.toggleIndex();
    };
    const notesPosition = (settings.options && settings.options.notesPosition) || 'foot';
    const citationLocale = (settings.citationLocale && settings.citationLocale.data) || defaultCitationLocale;
    const citationStyle = (settings.citationStyle && settings.citationStyle.data) || defaultCitationStyle;
    /**
     * References binding
     */
    const bindGlobalScrollbarRef = scrollbar => {
      this.globalScrollbar = scrollbar;
    };
    const bindHeaderRef = header => {
      this.header = header;
    };
    return (
      <ReferencesManager
        style={citationStyle}
        locale={citationLocale}
        items={citations.citationItems}
        citations={citations.citationData}
        componentClass="references-manager">
        <section className="wrapper">
          <Scrollbars
            ref={bindGlobalScrollbarRef}
            autoHide
            onUpdate={this.onScrollUpdate}
            universal>
            <header
              onClick={this.scrollToContents}
              className="header"
              ref={bindHeaderRef}
              style={{
              backgroundImage: coverImage ? 'url(' + (coverImage.filePath ? getResourceDataUrl(coverImage) : coverImage.base64) + ')' : undefined,
              height: coverImage ? '100%' : '0'
            }} />
            <section
              className="body-wrapper">
              <section className="contents-wrapper">
                <div
                  className="header-titles">
                  <h1>
                    {metadata.title || 'Quinoa story'}
                  </h1>
                  {
                  metadata.authors && metadata.authors.length ?
                    <div className="authors">
                      {
                      metadata.authors.map(author => author).join(', ')
                    }
                    </div>
                  : null
                }
                </div>
                {
                sectionsOrder.map((thatId) => (
                  <SectionLayout section={finalSections[thatId]} key={thatId} />
                ))
                }
                {notes && notes.length ?
                  <NotesContainer
                    notes={notes}
                    onNotePointerClick={this.onNotePointerClick}
                    notesPosition={notesPosition} />
                : null}
                {
                  citations &&
                  citations.citationItems &&
                  Object.keys(citations.citationItems).length ?
                    <Bibliography />
                : null}

                {glossary &&
                  glossary.length ?
                    <div className="glossary-container">
                      <h2>Glossary</h2>
                      <ul className="glossary-mentions-container">
                        {
                      glossary.map((entry, index) => {
                        const entryName = entry.resource.data.name;
                        return (
                          <li key={index} id={'glossary-entry-' + entry.resource.id}>
                            <h3>{entryName} <i>({
                                  entry.mentions.map((mention, count) => {
                                    const target = 'glossary-mention-' + mention.id;
                                    const onClick = e => {
                                      e.preventDefault();
                                      this.scrollToElementId(target);
                                    };
                                    return (
                                      <a
                                        key={mention.id}
                                        onClick={onClick}
                                        id={'glossary-mention-backlink-' + mention.id}
                                        href={'#' + target}>
                                        <span className="link-content">{count + 1}</span>
                                      </a>
                                    );
                                  })
                                  .reduce((prev, curr) => [prev, ', ', curr])
                                })</i>
                            </h3>
                            {entry.resource.metadata.description && <p>
                              {entry.resource.metadata.description}
                            </p>}
                          </li>
                        );
                      })
                     }
                      </ul>
                    </div>
                : null}
              </section>

              <nav
                className={'nav' + (indexOpen ? ' active' : '') + (inCover ? '' : ' fixed')}
                style={{
                  position: inCover ? 'relative' : 'fixed',
                  left: inCover ? '' : dimensions.left,
                  top: inCover ? '' : dimensions.top,
                  height: dimensions && dimensions.height,
                }}>
                <div
                  className="nav-content"
                  style={{
                      maxHeight: (indexOpen || inCover) ? '100%' : 0
                    }}>
                  <button
                    className={'index-toggle ' + ((indexOpen || inCover) ? 'active' : '')}
                    style={{
                      opacity: inCover ? 0 : 1,
                      maxHeight: inCover ? 0 : '3em'
                    }}
                    onClick={onClickToggle}>
                    <span id="burger-menu" className={(indexOpen || inCover) ? 'open' : ''}>
                      <span />
                      <span />
                      <span />
                      <span />
                    </span>
                  </button>
                  <ul
                    className="table-of-contents">
                    <li>
                      <h2
                        className="menu-title"
                        onClick={onClickTitle}>{metadata.title || 'Quinoa story'}</h2>
                    </li>
                    {
                      toc && toc.map((item, index) => {
                        const onClick = (e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          this.scrollToElementId(item.key);
                          this.toggleIndex();
                        };
                        return (
                          <li
                            key={index}
                            className={'level-' + item.level + (item.active ? ' active' : '')}>
                            <a
                              href={'#' + item.key}
                              onClick={onClick}>
                              <span className="link-content">{item.text || 'Untitled section'}</span>
                            </a>
                          </li>
                        );
                      })
                    }
                  </ul>
                </div>
              </nav>
            </section>
          </Scrollbars>
        </section>
        <style>
          {customCss}
        </style>
      </ReferencesManager>
    );
  }
}

/**
 * Component's properties types
 */
GarlicLayout.propTypes = {
  story: PropTypes.object
};
/**
 * Component's context used properties
 */
GarlicLayout.contextTypes = {
  /**
   * dimensions of the container
   */
  dimensions: PropTypes.object,
  /**
   * getResourceDataUrl in fonio DataUrlProvider
   */
  getResourceDataUrl: PropTypes.func,
};
/**
 * Component's context properties provided to children
 */
GarlicLayout.childContextTypes = {
  /**
   * The presentation player to display full-screen if any
   */
  fixedPresentationId: PropTypes.string,
  /**
   * Callback triggered when a note pointer is clicked
   */
  onNoteContentPointerClick: PropTypes.func,
  /**
   * Callback triggered when a presentation displayed in full
   * screen is exited
   */
  onExit: PropTypes.func,
  /**
   * Callbacks when a glossary item is clicked
   */
   onGlossaryMentionClick: PropTypes.func,
};


export default GarlicLayout;

