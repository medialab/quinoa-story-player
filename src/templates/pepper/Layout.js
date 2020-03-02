/*
 * This module exports a stateful pepper layout component
 * ============
 * @module quinoa-story-player/templates/pepper
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import debounce from 'lodash/debounce';
import { ReferencesManager } from 'react-citeproc';
import { getStyles } from 'quinoa-schemas';
import { easeCubic } from 'd3-ease';
import { HashRouter, Switch, Route, Redirect, withRouter } from 'react-router-dom';


// import Bibliography from '../../components/Bibliography';
import SectionLayout from './components/SectionLayout';
import Nav from './components/Nav';
import References from './components/References';
import Glossary from './components/Glossary';
import Header from './components/Header';
import InternalLinkProvider from './components/InternalLinkProvider';

import {
  buildCoverImage,
  buildCitations,
  buildGlossary,
  capitalize
} from '../../utils/misc';
import { buildTOC, getOffset, stylesVariablesToCss,
getTocAdjacentNavItems
 } from './utils';

import defaultCitationStyle from 'raw-loader!../../assets/apa.csl';
import defaultCitationLocale from 'raw-loader!../../assets/english-locale.xml';
import locales from './locales.json';
import tableStyles from '!raw-loader!sass-loader!react-table/react-table.css';

// import './pepper.scss';
import templateCss from '!raw-loader!sass-loader!./pepper.scss';

const contextualizersStyles = [
  tableStyles
].join('\n\n');
/**
 * PepperLayout class for building a story-player template react component instances
 */
class PepperLayout extends Component {
  /**
   * constructor
   * @param {object} props - properties given to instance at instanciation
   */
  constructor(props) {
    super(props);
    this.scrollToContents = this.scrollToContents.bind(this);
    this.scrollToCover = this.scrollToCover.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
    this.onScrollUpdate = debounce(this.onScrollUpdate, 50, { leading: true, trailing: true, maxWait: 100 });
    // this.onScrollUpdate = this.onScrollUpdate.bind(this);
    this.scrollToElementId = this.scrollToElementId.bind(this);
    this.onNoteContentPointerClick = this.onNoteContentPointerClick.bind(this);
    this.onGlossaryMentionClick = this.onGlossaryMentionClick.bind(this);
    this.onInternalLinkClick = this.onInternalLinkClick.bind(this);

    this.toggleIndex = this.toggleIndex.bind(this);

    /**
     * Initial state
     */
    this.state = {
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
      coverImage: undefined,
      viewType: 'home',
      viewParams: {}
    };
  }

  /**
   * Updates data in the context when the state or props change
   */
  getChildContext = () => {
    return {
      // id of the presentation-player displayed in full screen if any
      fixedPresentationId: this.state.fixedPresentationId,
      // callback to trigger when a presentation-player is exited
      // calback to trigger when a note content pointer is clicked
      onNoteContentPointerClick: this.onNoteContentPointerClick,
      // callbacks when a glossary mention is clicked
      onGlossaryMentionClick: this.onGlossaryMentionClick,
      onInternalLinkClick: this.onInternalLinkClick,
      locale: this.state.locale,

      scrollTop: this.scrollTop,
      scrollToElementId: this.scrollToElementId,

      InternalLinkProvider,

      navigateTo: this.navigateTo,

      activeView: {
        viewType: this.state.viewType,
        viewParams: this.state.viewParams,
      },

      previewMode: this.props.previewMode === undefined ? true : this.props.previewMode,

      usedDocument: this.props.usedDocument || document,
      usedWindow: this.props.usedWindow || window,

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
          if (this.props.previewMode !== false) {
            this.updatePreviewContent();
          }
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
        this.updatePreviewContent();
      });
    }
  }


  /**
   * Programmatically navigates to a given view
   */
  navigateTo = ({ viewType = 'home', viewParams = {} }, history) => {
    this.setState({
      viewType,
      viewParams,
    });
    setTimeout(() => {
      if (this.props.previewMode !== false) {
        this.updatePreviewContent();
      }
      if (viewParams.focusOnId) {
        this.scrollToElementId(viewParams.focusOnId);
      }
      else {
        this.globalScrollbar.scrollTop(0);
      }
    });

    if (history) {
      history.push(`/${viewType}/`);
    }
  }

  /**
   * Programmatically modifies the scroll state of the component
   * so that it transitions to a specific point in the page
   * @param {number} top - the position to scroll to
   */
  scrollTop = (initialTop) => {
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
  scrollToElementId = (id) => {
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
    const scrollTop = evt.scrollTop;
    let stateChanges = {};

    const inCover = scrollTop < 10;


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

  bindHeaderRef = header => {
    this.header = header;
  };

  updatePreviewContent = () => {
    const {
      props: {
        story: {
          metadata,
          sections,
        },
        usedDocument,
        usedWindow,
      },
      state: {
        toc,
        glossary,
        citations,
        coverImage,
        locale = {},
        viewType = 'home',
        viewParams = {},
      },
      context: {
        getResourceDataUrl,
        dimensions,
      },
      scrollToElementId,
      // scrollToContents,
      onNotePointerClick,
      bindHeaderRef,
    } = this;

    const finalSections = Object.keys(sections).reduce((res, sectionId) => ({
      ...res,
      [sectionId]: {
        ...sections[sectionId],
        notes: Object.keys(sections[sectionId].notes).reduce((tempNotes, noteId, noteIndex) => {
          return {
            ...tempNotes,
            [noteId]: {
              ...sections[sectionId].notes[noteId],
              finalOrder: noteIndex + 1
            }
          };
        }, {})
      }
    }), {});

    const { options = {} } = getStyles(this.props.story);
    let notesPosition = options.notesPosition || 'foot';
    // "responsive" notes positionning
    notesPosition = dimensions.width > 700 ? notesPosition : 'foot';

    let PreviewContent = null;
    let navItems;
    switch (viewType) {
      case 'glossary':
        navItems = getTocAdjacentNavItems(
          toc,
          (item) => item.viewType === 'glossary'
        );
        PreviewContent = glossary &&
                  glossary.length ?
                    () => (
                      <Glossary
                        locale={locale}
                        glossary={glossary}
                        scrollToElementId={scrollToElementId}
                        prevItem={navItems.prevItem}
                        nextItem={navItems.nextItem} />
                  )
                  : null;
        break;
      case 'references':
        navItems = getTocAdjacentNavItems(
          toc,
          (item) => item.viewType === 'references'
        );
        PreviewContent = citations &&
                  citations.citationItems &&
                  Object.keys(citations.citationItems).length ?
                    () => (
                      <References
                        id="references"
                        prevItem={navItems.prevItem}
                        nextItem={navItems.nextItem}
                        title={capitalize(locale.references || 'references')} />
                    )
                :
                  null;
          break;
      case 'section':
        navItems = getTocAdjacentNavItems(
          toc,
          (item) => item.viewType === 'section' && item.viewParams.sectionId === viewParams.sectionId
        );

        PreviewContent = () => (
          <SectionLayout
            section={finalSections[viewParams.sectionId]}
            viewParams={viewParams}
            notesPosition={notesPosition}
            onNotePointerClick={onNotePointerClick}
            usedDocument={usedDocument}
            prevItem={navItems.prevItem}
            nextItem={navItems.nextItem}
            usedWindow={usedWindow}
            key={viewParams.sectionId} />
        );
        break;
      case 'home':
      default:
        PreviewContent = () => (
          <Header
            coverImage={coverImage}
            getResourceDataUrl={getResourceDataUrl}
            metadata={metadata}
            bindRef={bindHeaderRef}
            toc={toc}
            locale={locale} />
        );
        break;
    }

    if (!PreviewContent) {
      PreviewContent = () => (
        <Header
          coverImage={coverImage}
          getResourceDataUrl={getResourceDataUrl}
          metadata={metadata}
          bindRef={bindHeaderRef}
          toc={toc}
          locale={locale} />
      );
    }
    this.setState({
      PreviewContent,
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
          // sectionsOrder,
          sections,
          settings,
        },
        previewMode = true,
        usedDocument,
        usedWindow,
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
        viewType = 'home',
        PreviewContent = () => <div />,
      },
      context: {
        dimensions,
        getResourceDataUrl
      },
      scrollToElementId,
      // scrollToContents,
      onNotePointerClick,
      bindHeaderRef,
    } = this;
    /**
     * ==========================================
     * Local rendering-related variables
     * ==========================================
     */
    const customCss = getStyles(this.props.story).css || '';
    const finalSections = Object.keys(sections).reduce((res, sectionId) => ({
      ...res,
      [sectionId]: {
        ...sections[sectionId],
        notes: Object.keys(sections[sectionId].notes).reduce((tempNotes, noteId, noteIndex) => {
          return {
            ...tempNotes,
            [noteId]: {
              ...sections[sectionId].notes[noteId],
              finalOrder: noteIndex + 1
            }
          };
        }, {})
      }
    }), {});

    const { options = {} } = getStyles(this.props.story);
    let notesPosition = options.notesPosition || 'foot';
    // "responsive" notes positionning
    notesPosition = dimensions.width > 700 ? notesPosition : 'foot';
    const citationLocale = (settings.citationLocale && settings.citationLocale.data) || defaultCitationLocale;
    const citationStyle = (settings.citationStyle && settings.citationStyle.data) || defaultCitationStyle;

    /**
     * Styles Variables (WYSIWYG)
     */
    const computedStylesVariables = settings.styles
      ? stylesVariablesToCss(settings.styles.pepper.stylesVariables)
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


    const NavEl = (props) => (
      <Nav
        indexOpen={indexOpen}
        inCover={inCover}
        coverImage={coverImage}
        dimensions={dimensions}
        onClickToggle={onClickToggle}
        onClickTitle={onClickTitle}
        viewType={viewType}
        metadata={metadata}
        scrollToElementId={scrollToElementId}
        toggleIndex={this.toggleIndex}
        isDisplayed={((!coverImage && dimensions.width > 700) || !inCover)}
        toc={toc}
        {...props} />
    );
    const FinalNav = () => {
      if (previewMode) {
        return <NavEl />;
      }
      const ConnectedEl = withRouter(props => <NavEl {...props} />);
      return <HashRouter><ConnectedEl /></HashRouter>;
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
            {/*<Header
              scrollToContents={scrollToContents}
              coverImage={coverImage}
              getResourceDataUrl={getResourceDataUrl}
              metadata={metadata}
              bindRef={bindHeaderRef} />*/}
            <section
              className="body-wrapper">
              <section className="contents-wrapper">
                {
                  previewMode ?
                    <PreviewContent />
                  :
                    <HashRouter>
                      <Switch>
                        <Route
                          path="/"
                          exact
                          component={() => (
                            <Header
                              coverImage={coverImage}
                              getResourceDataUrl={getResourceDataUrl}
                              metadata={metadata}
                              bindRef={bindHeaderRef}
                              locale={locale}
                              toc={toc} />
                        )} />
                        <Route
                          path="/sections/:sectionId"
                          exact
                          component={({ match: { params: { sectionId } }, location, history }) => {
                            const { prevItem, nextItem } = getTocAdjacentNavItems(
                              toc,
                              (item) => item.viewType === 'section' && item.viewParams.sectionId === sectionId
                            );

                            if (location.search && location.search.length) {
                              const queryParams = location.search.substr(1).split('&')
                                .map(couple => couple.split('='))
                                .reduce((params, couple) => ({
                                  ...params,
                                  [couple[0]]: couple[1]
                                }), {});
                              if (queryParams.focusOnId) {
                                setTimeout(() => this.scrollToElementId(queryParams.focusOnId));
                              }
                            }
                            return (
                              <SectionLayout
                                section={finalSections[sectionId]}
                                notesPosition={notesPosition}
                                prevItem={prevItem}
                                nextItem={nextItem}
                                onNotePointerClick={onNotePointerClick}
                                usedDocument={usedDocument}
                                usedWindow={usedWindow}
                                history={history}
                                key={sectionId} />
                            );
                      }} />
                        <Route
                          path="/glossary"
                          exact
                          component={() => {
                        const { prevItem, nextItem } = getTocAdjacentNavItems(
                              toc,
                              (item) => item.viewType === 'glossary'
                            );
                        return (
                          <Glossary
                            locale={locale}
                            glossary={glossary}
                            prevItem={prevItem}
                            nextItem={nextItem} />
                        );
                      }} />
                        <Route
                          path="/references"
                          exact
                          component={() => {
                        const { prevItem, nextItem } = getTocAdjacentNavItems(
                              toc,
                              (item) => item.viewType === 'references'
                            );
                        return citations &&
                          citations.citationItems &&
                          Object.keys(citations.citationItems).length ?
                            (
                              <References
                                id="references"
                                prevItem={prevItem}
                                nextItem={nextItem}
                                title={capitalize(locale.references || 'references')} />
                          )
                        :
                          null;
                      }} />
                        <Route render={() => <Redirect to="/" />} />
                      </Switch>
                    </HashRouter>
                }
              </section>
            </section>
          </Scrollbars>

          {
            /**
             * Nav bar
             */
          }
          <FinalNav />


        </section>
        <style>
          {contextualizersStyles}
          {templateCss}
          {computedStylesVariables}
          {customCss}
        </style>
      </ReferencesManager>
    );
  }
}

/**
 * Component's properties types
 */
PepperLayout.propTypes = {
  story: PropTypes.object
};
/**
 * Component's context used properties
 */
PepperLayout.contextTypes = {
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
PepperLayout.childContextTypes = {
  /**
   * The presentation player to display full-screen if any
   */
  fixedPresentationId: PropTypes.string,
  /**
   * Callback triggered when a note pointer is clicked
   */
  onNoteContentPointerClick: PropTypes.func,
  /**
   * Callbacks when a glossary item is clicked
   */
   onGlossaryMentionClick: PropTypes.func,

   onInternalLinkClick: PropTypes.func,

   locale: PropTypes.object,

   citationStyle: PropTypes.string,

   citationLocale: PropTypes.string,

   InternalLinkProvider: PropTypes.func,

   navigateTo: PropTypes.func,

   previewMode: PropTypes.bool,

   activeView: PropTypes.shape({
    viewType: PropTypes.string,
    viewParams: PropTypes.obj,
   }),
   scrollTop: PropTypes.func,
   scrollToElementId: PropTypes.func,

   usedDocument: PropTypes.object,
   usedWindow: PropTypes.object,
};


export default PepperLayout;

