/*
 * This module exports a stateful garlic layout component
 * ============
 * @module quinoa-story-player/templates/garlic
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import debounce from 'lodash/debounce';
import { ReferencesManager } from 'react-citeproc';
import Tooltip from 'react-tooltip';
import { getStyles } from 'quinoa-schemas';
import { easeCubic } from 'd3-ease';
import Bibliography from '../../components/Bibliography';
import NotesContainer from '../../components/NotesContainer';
import SectionLayout from './components/SectionLayout';
import Nav from './components/Nav';
import Glossary from './components/Glossary';
import Header from './components/Header';

import {
  buildCoverImage,
  buildCitations,
  buildGlossary,
  capitalize
} from '../../utils/misc';
import { buildTOC, getOffset, stylesVariablesToCss } from './utils';

import defaultCitationStyle from 'raw-loader!../../assets/apa.csl';
import defaultCitationLocale from 'raw-loader!../../assets/english-locale.xml';
import locales from './locales.json';
import tableStyles from '!raw-loader!sass-loader!react-table/react-table.css';

// import './garlic.scss';
import templateCss from '!raw-loader!sass-loader!./garlic.scss';

const contextualizersStyles = [
  tableStyles
].join('\n\n');
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
    this.scrollTop = this.scrollTop.bind(this);
    this.onScrollUpdate = debounce(this.onScrollUpdate, 10, { leading: true, trailing: true, maxWait: 100 });
    // this.onScrollUpdate = this.onScrollUpdate.bind(this);
    this.scrollToElementId = this.scrollToElementId.bind(this);
    this.onNoteContentPointerClick = this.onNoteContentPointerClick.bind(this);
    this.onGlossaryMentionClick = this.onGlossaryMentionClick.bind(this);
    this.onInternalLinkClick = this.onInternalLinkClick.bind(this);

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
      onInternalLinkClick: this.onInternalLinkClick,
      locale: this.state.locale,

      citationLocale: (this.props.story && this.props.story.settings.citationLocale && this.props.story.settings.citationLocale.data) || defaultCitationLocale,
      citationStyle: (this.props.story && this.props.story.settings.citationStyle && this.props.story.settings.citationStyle.data) || defaultCitationStyle,
    };
  }
  /**
   * Executes code on instance after the component is mounted
   */
  componentDidMount() {
    // @todo: why did I have to wrap that in a setTimeout ?
    setTimeout(() => {
      if (this.props.story) {
        this.setState({
          glossary: buildGlossary(this.props.story),
          citations: buildCitations(this.props.story),
          coverImage: buildCoverImage(this.props.story),
          locale: this.props.locale && locales[this.props.locale] ? locales[this.props.locale] : locales.en,
        });
        setTimeout(() => {
          const toc = buildTOC(
            this.props.story,
            0,
            this.state,
            {
              usedDocument: this.props.usedDocument,
              usedWindow: this.props.usedWindow
            }
          );
          this.setState({ toc });
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
        const toc = buildTOC(this.props.story, 0, this.state, { usedDocument: this.props.usedDocument, usedWindow: this.props.usedWindow });
        this.setState({ toc });
      });
    }
  }

  /**
   * Programmatically modifies the scroll state of the component
   * so that it transitions to a specific point in the page
   * @param {number} top - the position to scroll to
   */
  scrollTop(initialTop) {
      const scrollbars = this.globalScrollbar;
      const scrollTop = scrollbars.getScrollTop();
      const scrollHeight = scrollbars.getScrollHeight();
      let top = initialTop > scrollHeight ? scrollHeight : initialTop;
      top = top < 0 ? 0 : top;

      const ANIMATION_DURATION = 1000;
      const ANIMATION_STEPS = 10;
      const animationTick = 1 / ANIMATION_STEPS;

      const diff = top - scrollTop;

      for (let t = 0; t <= 1; t += animationTick) {
        const to = easeCubic(t);
        setTimeout(() => {
          this.globalScrollbar.scrollTop(scrollTop + (diff * to));
        }, ANIMATION_DURATION * t);
      }
  }

  /**
   * Handle scrolling to a specific title in the page
   * @param {string} id - the id of the item to scroll to
   */
  scrollToElementId (id) {
    const title = this.props.usedDocument.getElementById(id);
    if (title && title.offsetParent) {
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
      };
    }
    // applying state changes if needed
    if (Object.keys(stateChanges).length) {
      this.setState(stateChanges);
      return;
    }
    // if scroll has changed, update the table of contents
    // (active element may have changed)
    // (todo: right now we are rebuilding the toc from scratch
    // at each update, we should split buildTOC in two functions
    // to handle the change of active element separately, for better performances)
    if (scrollTop !== this.state.scrollTop) {
      const toc = buildTOC(
        this.props.story,
        scrollTop,
        this.state,
        { usedDocument: this.props.usedDocument, usedWindow: this.props.usedWindow }
      );
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
    Tooltip.rebuild();
  }

  /**
   * Handle scrolling to the begining of contents
   */
  scrollToContents () {
    if (this.header) {
      this.scrollTop(this.header.offsetHeight + 10);
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
    const el = this.props.usedDocument.getElementById(noteElId);
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
    const el = this.props.usedDocument.getElementById(noteElId);
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

  onInternalLinkClick(sectionId) {
    const target = 'section-container-' + sectionId;
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
      props: {
        story: {
          metadata,
          sectionsOrder,
          sections,
          settings,
        },
        usedDocument,
        // usedWindow
      },
      state: {
        inCover,
        toc,
        indexOpen,
        glossary,
        citations,
        coverImage,
        locale = {},
      },
      context: {
        dimensions,
        getResourceDataUrl
      },
      scrollToElementId,
      scrollToContents
    } = this;
    /**
     * ==========================================
     * Local rendering-related variables
     * ==========================================
     */
    const customCss = getStyles(this.props.story).css || '';
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

    const { options } = getStyles(this.props.story);
    let notesPosition = options.notesPosition || 'foot';
    // "responsive" notes positionning
    notesPosition = dimensions.width > 700 ? notesPosition : 'foot';
    const citationLocale = (settings.citationLocale && settings.citationLocale.data) || defaultCitationLocale;
    const citationStyle = (settings.citationStyle && settings.citationStyle.data) || defaultCitationStyle;

    /**
     * Styles Variables (WYSIWYG)
     */
    const computedStylesVariables = settings.styles
      ? stylesVariablesToCss(settings.styles.garlic.stylesVariables)
      : '';

    /**
     * ==========================================
     * Callbacks
     * ==========================================
     */
    const onClickToggle = () => this.toggleIndex();
    const onClickTitle = () => {
      this.scrollToContents();
      this.toggleIndex();
    };
    /**
     * ==========================================
     * References binding
     * ==========================================
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
            <Header
              scrollToContents={scrollToContents}
              coverImage={coverImage}
              getResourceDataUrl={getResourceDataUrl}
              metadata={metadata}
              bindRef={bindHeaderRef} />
            <section
              className="body-wrapper">
              <section className="contents-wrapper">

                {
                  /**
                   * Sections display
                   */
                  sectionsOrder.map((thatId) => (
                    <SectionLayout section={finalSections[thatId]} key={thatId} />
                  ))
                }
                {
                  /**
                   * End notes
                   */
                  notes &&
                  notes.length ?
                    <NotesContainer
                      id="notes"
                      notes={notes}
                      usedDocument={usedDocument}
                      onNotePointerClick={this.onNotePointerClick}
                      title={capitalize(locale.notes || 'notes')}
                      notesPosition={notesPosition} />
                :
                  null
                }
                {
                  /**
                   * References
                   */
                  citations &&
                  citations.citationItems &&
                  Object.keys(citations.citationItems).length ?
                    <Bibliography
                      id="references"
                      title={capitalize(locale.references || 'references')} />
                :
                  null
                }

                {
                  /**
                   * Glossary
                   */
                  glossary &&
                  glossary.length ?
                    <Glossary
                      locale={locale}
                      glossary={glossary}
                      scrollToElementId={scrollToElementId} />
                  : null}
              </section>
              <Nav
                indexOpen={indexOpen}
                inCover={inCover}
                coverImage={coverImage}
                dimensions={dimensions}
                onClickToggle={onClickToggle}
                onClickTitle={onClickTitle}
                metadata={metadata}
                scrollToElementId={scrollToElementId}
                toc={toc}
                isDisplayed={coverImage && inCover} />

            </section>
          </Scrollbars>

          {
            /**
             * Nav bar
             */
          }
          <Nav
            indexOpen={indexOpen}
            inCover={inCover}
            coverImage={coverImage}
            dimensions={dimensions}
            onClickToggle={onClickToggle}
            onClickTitle={onClickTitle}
            metadata={metadata}
            scrollToElementId={scrollToElementId}
            toggleIndex={this.toggleIndex}
            isDisplayed={((!coverImage && dimensions.width > 700) || !inCover)}
            toc={toc} />


        </section>
        <style>
          {contextualizersStyles}
          {templateCss}
          {computedStylesVariables}
          {customCss}
        </style>
        <Tooltip id="tooltip" effect="solid" />
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

   onInternalLinkClick: PropTypes.func,

   locale: PropTypes.object,

   citationStyle: PropTypes.string,

   citationLocale: PropTypes.string,
};


export default GarlicLayout;

