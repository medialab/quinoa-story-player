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

import {
  buildCoverImage,
  buildCitations,
  buildGlossary,
  capitalize
} from '../../utils/misc';

import defaultCitationStyle from 'raw-loader!../../assets/apa.csl';
import defaultCitationLocale from 'raw-loader!../../assets/english-locale.xml';

import locales from './locales.json';

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
    this.onScrollUpdate = debounce(this.onScrollUpdate, 10, {leading: true, trailing: true, maxWait: 100});
    // this.onScrollUpdate = this.onScrollUpdate.bind(this);
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
      locale: this.state.locale
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
          glossary: buildGlossary(this.props.story),
          citations: buildCitations(this.props.story),
          coverImage: buildCoverImage(this.props.story),
          locale: this.props.locale && locales[this.props.locale] ? locales[this.props.locale] : locales.en
        });
        setTimeout(() => {
          const toc = this.buildTOC(this.props.story, 0, this.state);
          this.setState({toc});
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
        glossary: buildGlossary(nextProps.story),
        citations: buildCitations(nextProps.story),
        coverImage: buildCoverImage(nextProps.story),
        locale: nextProps.locale && locales[nextProps.locale] ? locales[nextProps.locale] : locales.en
      });
      setTimeout(() => {
        const toc = this.buildTOC(this.props.story, 0, this.state);
        this.setState({toc});
      });
    }
  }

  /**
   * Builds component-consumable table of contents data
   * @param {object} story - the story to process
   * @param {number} scrollTop - the position of the scroll to use for decidinng which TOC item is active
   * @return {array} tocElements - the toc elements to use for rendering the TOC
   */
  buildTOC = (story, scrollTop, {citations, glossary, locale = {}}) => {
    const toc = story.sectionsOrder
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
      return [
        sectionHeader,
        // ...headerItems
        ];
      })
      .filter(el => el !== undefined)
      // flatten mini-tocs
      .reduce((result, ar) => [...result, ...ar], []);

    // adding special items to table of contents
    const hasReferences = Object.keys(citations.citationItems).length > 0;
    const hasGlossary = glossary.length > 0;
    const notesPosition = (story.settings.options && story.settings.options.notesPosition) || 'foot';
    const hasNotes = story.sectionsOrder.find(key => story.sections[key].notesOrder.length > 0) !== undefined;
    if (notesPosition === 'foot' && hasNotes) {
      let notesActive;
      let nextTitleOffsetTop;
      // title of the section
      const title = document.getElementById('notes');

      if (title) {
        // we will check if scroll is after glossary title
        const titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
        let nextTitleId;
        if (hasReferences) {
          nextTitleId = 'references';
        }
        else if (hasGlossary) {
          nextTitleId = 'glossary';
        }
        if (nextTitleId) {
          const nextTitle = document.getElementById(nextTitleId);
          if (nextTitle) {
            nextTitleOffsetTop = nextTitle.offsetTop + title.offsetParent.offsetParent.offsetTop;
          }
        }
        if (titleOffsetTop <= scrollTop + window.innerHeight / 2 &&
            (nextTitleOffsetTop === undefined ||
              nextTitleOffsetTop >= scrollTop
            )
          ) {
          notesActive = true;
        }
        toc.push({
          level: 0,
          text: capitalize(locale.notes || 'notes'),
          key: 'notes',
          active: notesActive
        });
      }
    }


    if (hasReferences) {
      let referencesActive;
      let nextTitleOffsetTop;
      // title of the section
      const title = document.getElementById('references');
      if (title) {
        // we will check if scroll is after glossary title
        const titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
        const nextTitle = document.getElementById('glossary');
        if (nextTitle) {
          nextTitleOffsetTop = nextTitle.offsetTop + title.offsetParent.offsetParent.offsetTop;
        }
        if (titleOffsetTop <= scrollTop + window.innerHeight / 2 &&
            (nextTitleOffsetTop === undefined ||
              nextTitleOffsetTop >= scrollTop
            )
          ) {
          referencesActive = true;
        }
        toc.push({
          level: 0,
          text: capitalize(locale.references || 'references'),
          key: 'references',
          active: referencesActive
        });
      }
    }

    if (hasGlossary) {
      let glossaryActive;
      let nextTitleOffsetTop;
      // title of the section
      const title = document.getElementById('glossary');
      if (title) {
        // we will check if scroll is after glossary title
        const titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
        if (titleOffsetTop <= scrollTop + window.innerHeight / 2 &&
            (nextTitleOffsetTop === undefined ||
              nextTitleOffsetTop >= scrollTop
            )
          ) {
          glossaryActive = true;
        }
        toc.push({
          level: 0,
          text: capitalize(locale.glossary || 'glossary'),
          key: 'glossary',
          active: glossaryActive
        });
      }
    }
    return toc;
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
    const headerHeight = this.header.offsetHeight || 20;
    const presentationEls = document.getElementsByClassName('quinoa-presentation-player');
    const presentations = [];
    let fixedPresentationId;
    let fixedPresentationHeight;
    let stateChanges = {};

    const inCover = scrollTop < headerHeight;

    // check if we are in the cover of the story
    if (inCover && !this.state.inCover) {
      stateChanges = {
        ...stateChanges,
        inCover: true,
      };
    }
    else if (!inCover && this.state.inCover) {
      stateChanges = {
        ...stateChanges,
        inCover: false,
        navPosition: undefined
      };
    }
    if (inCover) {
      stateChanges = {
        ...stateChanges,
        navPosition: headerHeight - scrollTop
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
      const toc = this.buildTOC(this.props.story, scrollTop, this.state);
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
  render = () => {
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
      coverImage,
      locale = {},
      navPosition
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
              backgroundImage: coverImage ? `url(${coverImage.filePath ? getResourceDataUrl(coverImage) : coverImage.base64}` : undefined,
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
                  {metadata.subtitle &&
                    <h2 className="header-subtitle">
                      {metadata.subtitle}
                    </h2>
                  }
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
                    id="notes"
                    notes={notes}
                    onNotePointerClick={this.onNotePointerClick}
                    title={capitalize(locale.notes || 'notes')}
                    notesPosition={notesPosition} />
                : null}
                {
                  citations &&
                  citations.citationItems &&
                  Object.keys(citations.citationItems).length ?
                    <Bibliography id="references" title={capitalize(locale.references || 'references')} />
                : null}

                {glossary &&
                  glossary.length ?
                    <div className="glossary-container">
                      <h2 id="glossary">{capitalize(locale.glossary || 'glossary')}</h2>
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
                            {entry.resource.data.description && <p>
                              {entry.resource.data.description}
                            </p>}
                          </li>
                        );
                      })
                     }
                      </ul>
                    </div>
                : null}
              </section>


            </section>
          </Scrollbars>
          <nav
            className={'nav' + (indexOpen ? ' active' : '') + (inCover ? '' : ' fixed')}
            style={{
                  // position: inCover ? 'relative' : 'absolute',
                  left: 0,
                  top: inCover ? navPosition : 0,
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
                      opacity: inCover ? 0 : 1
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
                className="table-of-contents"
                style={{
                  marginTop: inCover ? 0 : '2em'
                }}>
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

   locale: PropTypes.object,
};


export default GarlicLayout;

