import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Scrollbars} from 'react-custom-scrollbars';
import ReactDisqusThread from 'react-disqus-thread';
import {SpringSystem, MathUtil} from 'rebound';

import {debounce} from 'lodash';

import {ReferencesManager} from 'react-citeproc';

import SectionLayout from './SectionLayout';
import Bibliography from './Bibliography';

import NoteItem from './NoteItem/NoteItem';


import style from 'raw-loader!./assets/apa.csl';
import locale from 'raw-loader!./assets/english-locale.xml';


class PresentationLayout extends Component {

  constructor(props) {
    super(props);
    this.scrollToContents = this.scrollToContents.bind(this);
    this.scrollToCover = this.scrollToCover.bind(this);
    this.handleSpringUpdate = this.handleSpringUpdate.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
    this.onScrollUpdate = debounce(this.onScrollUpdate, 30);
    this.buildTOC = this.buildTOC.bind(this);
    this.scrollToTitle = this.scrollToTitle.bind(this);
    this.onNoteContentPointerClick = this.onNoteContentPointerClick.bind(this);

    this.toggleIndex = this.toggleIndex.bind(this);

    this.onPresentationExit = this.onPresentationExit.bind(this);

    this.state = {
      inCover: true,
      toc: [],
      scrollTop: 0,
      indexOpen: false
    };
  }

  getChildContext() {
    return {
      fixedPresentationId: this.state.fixedPresentationId,
      onExit: this.onPresentationExit,
      onNoteContentPointerClick: this.onNoteContentPointerClick
    };
  }

  componentDidMount() {
    this.springSystem = new SpringSystem();
    this.spring = this.springSystem.createSpring();
    this.spring.addListener({onSpringUpdate: this.handleSpringUpdate});
  }

  toggleIndex(to) {
    this.setState({
      indexOpen: to !== undefined ? to : !this.state.indexOpen
    });
  }
  scrollToContents () {
    if (this.header) {
      this.scrollTop(this.header.offsetHeight);
      this.setState({
        inCover: false
      });
    }
  }
  scrollToCover () {
    this.scrollTop(0);
    this.setState({
      inCover: true
    });
  }

  onPresentationExit (direction) {
    const top = this.state.scrollTop;
    // user is scrolling in direction of the top of the screen
    if (direction === 'top') {
      this.globalScrollbar.scrollTop(top - 50);
    }
    // user is scrolling in direction of the bottom of the screen
    else {
      const h = this.state.fixedPresentationHeight;
      this.globalScrollbar.scrollTop(top + h * 0.1);
    }
  }

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
    // if new fixed presentation, set it
    if (fixedPresentationId !== this.state.fixedPresentationId) {
      stateChanges = {
        ...stateChanges,
        fixedPresentationId,
        fixedPresentationHeight,
      };
      this.setState(stateChanges);
      return;
    }

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

  scrollTop(top) {
      const scrollbars = this.globalScrollbar;
      const scrollTop = scrollbars.getScrollTop();
      const scrollHeight = scrollbars.getScrollHeight();
      const val = MathUtil.mapValueInRange(top, 0, scrollHeight, 0, scrollHeight);
      this.spring.setCurrentValue(scrollTop).setAtRest();
      this.spring.setEndValue(val);
  }

  onNoteContentPointerClick(noteId) {
    const noteElId = 'note-block-pointer-' + noteId;
    const el = document.getElementById(noteElId);
    const top = el.parentNode.offsetTop + window.innerHeight;
    this.scrollTop(top);
  }

  buildTOC (story, scrollTop) {
    return story.sectionsOrder
    .map((sectionId, sectionIndex) => {
      const section = story.sections[sectionId];
      const sectionLevel = section.metadata.level + 1;
      const content = section.contents;
      const headers = content && content.blocks && content.blocks
      .filter(block => block.type.indexOf('header') === 0);


      let sectionActive;
      let titleOffsetTop;
      let nextTitleOffsetTop;
      let title;
      title = document.getElementById(section.id);
      if (!title) {
        return undefined;
      }
      titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
      if (sectionIndex < story.sectionsOrder.length - 1) {
        const next = story.sectionsOrder[sectionIndex + 1];
        const nextTitle = document.getElementById(next);
        nextTitleOffsetTop = nextTitle.offsetTop + title.offsetParent.offsetParent.offsetTop;
      }
      if (titleOffsetTop <= scrollTop + window.innerHeight / 2 &&
          (nextTitleOffsetTop === undefined ||
            nextTitleOffsetTop >= scrollTop
          )
        ) {
        sectionActive = true;
      }
      const sectionHeader = {
        level: sectionLevel,
        text: section.metadata.title || '',
        key: section.id,
        active: sectionActive
      };
      const headerItems = headers ? headers
        .map((block, index) => {
          const {type, text, key} = block;
          const levelStr = type.split('header-').pop();
          let level;
          switch (levelStr) {
            case 'one':
              level = sectionLevel + 1;
              break;
            case 'two':
              level = sectionLevel + 2;
              break;
            case 'three':
              level = sectionLevel + 3;
              break;
            case 'four':
              level = sectionLevel + 4;
              break;
            case 'five':
              level = sectionLevel + 5;
              break;
            case 'six':
            default:
              level = sectionLevel + 6;
              break;
          }

          title = document.getElementById(key);
          titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
          // nextTitleOffsetTop;
          if (index < headers.length - 1) {
            const next = headers[index + 1];
            const nextTitle = document.getElementById(next.key);
            nextTitleOffsetTop = nextTitle.offsetTop + title.offsetParent.offsetParent.offsetTop;
          }
          let headerActive;
          if (titleOffsetTop <= scrollTop + window.innerHeight / 2 &&
              (nextTitleOffsetTop === undefined ||
                nextTitleOffsetTop >= scrollTop
              )
            ) {
            headerActive = true;
          }
          return {
            level,
            text,
            key,
            active: headerActive
          };
        }) : [];
      return [
        sectionHeader,
        ...headerItems
        ];
      })
      .filter(el => el !== undefined)
      // flatten mini-tocs
      .reduce((result, ar) => [...result, ...ar], []);
  }

  scrollToTitle (id) {
    const title = document.getElementById(id);
    if (title) {
      this.scrollTop(title.offsetTop + title.offsetParent.offsetParent.offsetTop);
    }
  }

  handleSpringUpdate(spring) {
    const val = spring.getCurrentValue();
    this.globalScrollbar.scrollTop(val);
  }

  prepareCitations = () => {
    const {
      story
    } = this.props;
    if (!story) {
      return;
    }
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
    }, {});    /*
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
      // citations after
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

  render() {
    const {
      story: {
        metadata,
        sectionsOrder,
        sections,
        id
      }
    } = this.props;
    const {
      inCover,
      toc,
      indexOpen
    } = this.state;
    const bindGlobalScrollbarRef = scrollbar => {
      this.globalScrollbar = scrollbar;
    };
    const bindHeaderRef = header => {
      this.header = header;
    };

    const onClickToggle = () => this.toggleIndex();
    let noteCount = 1;
    const notes = sectionsOrder.reduce((nf, sectionId) => [
      ...nf,
      ...Object.keys(sections[sectionId].notes || {})
          .map(noteId => ({
            ...sections[sectionId].notes[noteId],
            sectionId,
            finalOrder: noteCount++
          }))
    ], []);

    const citations = this.prepareCitations();

    const handleNewComment = comment => {
      return comment;
      // console.log('comment', comment);
    };
    const location = window.location.href;
    return (
      <ReferencesManager
        style={style}
        locale={locale}
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
              backgroundImage: metadata.coverImage ? 'url(' + metadata.coverImage + ')' : undefined
            }}>
              <div
                className="header-content">
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
            </header>
            <section
              className="body-wrapper">
              <section className="contents-wrapper">
                {
                sectionsOrder.map((thatId) => (
                  <SectionLayout section={sections[thatId]} key={thatId} />
                ))
              }
                {notes && notes.length ? <div className="notes-container">
                  <h3>Notes</h3>
                  <ol className="notes-list">
                    {
                    notes.map((note) => {
                      const onNotePointerClick = () => {
                        const noteElId = 'note-content-pointer-' + note.id;
                        const el = document.getElementById(noteElId);
                        const top = el.parentNode.offsetTop + window.innerHeight;
                        this.scrollTop(top);
                      };
                      return (
                        <NoteItem key={note.finalOrder} note={note} onNotePointerClick={onNotePointerClick} />
                      );
                    })
                  }
                  </ol>
                </div> : null}
                {citations && citations.citationItems && Object.keys(citations.citationItems).length ? <Bibliography /> : null}

                {location.indexOf('http://localhost') !== 0 && <ReactDisqusThread
                  shortname={'quinoa-story-' + id}
                  identifier={'quinoa-story-' + id}
                  title={metadata.title}
                  url={location}
                  onNewComment={handleNewComment} />}
              </section>

              <nav
                className="nav"
                style={{
                position: inCover ? 'relative' : 'fixed'
              }}>
                <h2 onClick={this.scrollToCover}>{metadata.title || 'Quinoa story'}</h2>
                {toc && toc.length !== undefined && toc.length > 0 && <button
                  className={'index-toggle ' + (indexOpen ? 'active' : '')}
                  onClick={onClickToggle}>Index</button>}
                <ul
                  className="table-of-contents"
                  style={{
                  maxHeight: indexOpen ? '100%' : 0
                }}>
                  {
                  toc && toc.map((item, index) => {
                    const onClick = (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      this.scrollToTitle(item.key);
                    };
                    return (
                      <li
                        key={index}
                        className={'level-' + item.level + (item.active ? ' active' : '')}>
                        <a href={'#' + item.key}
                          onClick={onClick}>
                          {item.text}
                        </a>
                      </li>
                    );
                  })
                }
                </ul>
              </nav>
            </section>
          </Scrollbars>
        </section>
      </ReferencesManager>
    );
  }
}

PresentationLayout.childContextTypes = {
  fixedPresentationId: PropTypes.string,
  onNoteContentPointerClick: PropTypes.func,
  onExit: PropTypes.func,
};


export default PresentationLayout;

