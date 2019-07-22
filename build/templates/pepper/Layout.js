"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactCustomScrollbars = require("react-custom-scrollbars");

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _reactCiteproc = require("react-citeproc");

var _reactTooltip = _interopRequireDefault(require("react-tooltip"));

var _quinoaSchemas = require("quinoa-schemas");

var _d3Ease = require("d3-ease");

var _reactRouterDom = require("react-router-dom");

var _SectionLayout = _interopRequireDefault(require("./components/SectionLayout"));

var _Nav = _interopRequireDefault(require("./components/Nav"));

var _References = _interopRequireDefault(require("./components/References"));

var _Glossary = _interopRequireDefault(require("./components/Glossary"));

var _Header = _interopRequireDefault(require("./components/Header"));

var _InternalLinkProvider = _interopRequireDefault(require("./components/InternalLinkProvider"));

var _misc = require("../../utils/misc");

var _utils = require("./utils");

var _apa = _interopRequireDefault(require("raw-loader!../../assets/apa.csl"));

var _englishLocale = _interopRequireDefault(require("raw-loader!../../assets/english-locale.xml"));

var _locales = _interopRequireDefault(require("./locales.json"));

var _reactTable = _interopRequireDefault(require("!raw-loader!sass-loader!react-table/react-table.css"));

var _pepper = _interopRequireDefault(require("!raw-loader!sass-loader!./pepper.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var contextualizersStyles = [_reactTable.default].join('\n\n');
/**
 * PepperLayout class for building a story-player template react component instances
 */

var PepperLayout =
/*#__PURE__*/
function (_Component) {
  _inherits(PepperLayout, _Component);

  /**
   * constructor
   * @param {object} props - properties given to instance at instanciation
   */
  function PepperLayout(_props) {
    var _this;

    _classCallCheck(this, PepperLayout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PepperLayout).call(this, _props));

    _this.getChildContext = function () {
      return {
        // id of the presentation-player displayed in full screen if any
        fixedPresentationId: _this.state.fixedPresentationId,
        // callback to trigger when a presentation-player is exited
        // calback to trigger when a note content pointer is clicked
        onNoteContentPointerClick: _this.onNoteContentPointerClick,
        // callbacks when a glossary mention is clicked
        onGlossaryMentionClick: _this.onGlossaryMentionClick,
        onInternalLinkClick: _this.onInternalLinkClick,
        locale: _this.state.locale,
        scrollTop: _this.scrollTop,
        scrollToElementId: _this.scrollToElementId,
        InternalLinkProvider: _InternalLinkProvider.default,
        navigateTo: _this.navigateTo,
        activeView: {
          viewType: _this.state.viewType,
          viewParams: _this.state.viewParams
        },
        previewMode: _this.props.previewMode === undefined ? true : _this.props.previewMode,
        citationLocale: _this.props.story && _this.props.story.settings.citationLocale && _this.props.story.settings.citationLocale.data || _englishLocale.default,
        citationStyle: _this.props.story && _this.props.story.settings.citationStyle && _this.props.story.settings.citationStyle.data || _apa.default
      };
    };

    _this.navigateTo = function (_ref, history) {
      var _ref$viewType = _ref.viewType,
          viewType = _ref$viewType === void 0 ? 'home' : _ref$viewType,
          _ref$viewParams = _ref.viewParams,
          viewParams = _ref$viewParams === void 0 ? {} : _ref$viewParams;

      _this.setState({
        viewType: viewType,
        viewParams: viewParams
      });

      if (viewParams.focusOnId) {
        setTimeout(function () {
          return _this.scrollToElementId(viewParams.focusOnId);
        });
      } else {
        _this.globalScrollbar.scrollTop(0);
      }

      if (history) {
        history.push("/".concat(viewType, "/"));
      }
    };

    _this.scrollTop = function (initialTop) {
      var scrollbars = _this.globalScrollbar;
      var scrollTop = scrollbars.getScrollTop();
      var scrollHeight = scrollbars.getScrollHeight();
      var top = initialTop > scrollHeight ? scrollHeight : initialTop;
      top = top < 0 ? 0 : top;
      var ANIMATION_DURATION = 1000;
      var ANIMATION_STEPS = 10;
      var animationTick = 1 / ANIMATION_STEPS;
      var diff = top - scrollTop;

      var _loop = function _loop(t) {
        var to = (0, _d3Ease.easeCubic)(t);
        setTimeout(function () {
          _this.globalScrollbar.scrollTop(scrollTop + diff * to);
        }, ANIMATION_DURATION * t);
      };

      for (var t = 0; t <= 1; t += animationTick) {
        _loop(t);
      }
    };

    _this.scrollToElementId = function (id) {
      var title = _this.props.usedDocument.getElementById(id);

      if (title && title.offsetParent) {
        _this.scrollTop(title.offsetTop + title.offsetParent.offsetParent.offsetTop - _this.context.dimensions.height / 2);
      }
    };

    _this.onScrollUpdate = function (evt) {
      var scrollTop = evt.scrollTop;
      var stateChanges = {};
      var inCover = scrollTop < 10; // check if we are in the cover of the story

      if (inCover && !_this.state.inCover) {
        stateChanges = _objectSpread({}, stateChanges, {
          inCover: true
        });
      } else if (!inCover && _this.state.inCover) {
        stateChanges = _objectSpread({}, stateChanges, {
          inCover: false
        });
      } // applying state changes if needed


      if (Object.keys(stateChanges).length) {
        _this.setState(stateChanges);

        return;
      }
    };

    _this.onNotePointerClick = function (note) {
      var noteElId = 'note-content-pointer-' + note.id;

      var el = _this.props.usedDocument.getElementById(noteElId);

      var offset = (0, _utils.getOffset)(el);
      var top = offset.top - _this.context.dimensions.height / 2;

      _this.scrollTop(top);
    };

    _this.render = function () {
      var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this)),
          _assertThisInitialize2 = _assertThisInitialize.props,
          _assertThisInitialize3 = _assertThisInitialize2.story,
          metadata = _assertThisInitialize3.metadata,
          sections = _assertThisInitialize3.sections,
          settings = _assertThisInitialize3.settings,
          _assertThisInitialize4 = _assertThisInitialize2.previewMode,
          previewMode = _assertThisInitialize4 === void 0 ? true : _assertThisInitialize4,
          usedDocument = _assertThisInitialize2.usedDocument,
          usedWindow = _assertThisInitialize2.usedWindow,
          _assertThisInitialize5 = _assertThisInitialize.state,
          inCover = _assertThisInitialize5.inCover,
          toc = _assertThisInitialize5.toc,
          indexOpen = _assertThisInitialize5.indexOpen,
          glossary = _assertThisInitialize5.glossary,
          citations = _assertThisInitialize5.citations,
          coverImage = _assertThisInitialize5.coverImage,
          _assertThisInitialize6 = _assertThisInitialize5.locale,
          locale = _assertThisInitialize6 === void 0 ? {} : _assertThisInitialize6,
          _assertThisInitialize7 = _assertThisInitialize5.viewType,
          viewType = _assertThisInitialize7 === void 0 ? 'home' : _assertThisInitialize7,
          _assertThisInitialize8 = _assertThisInitialize5.viewParams,
          viewParams = _assertThisInitialize8 === void 0 ? {} : _assertThisInitialize8,
          _assertThisInitialize9 = _assertThisInitialize.context,
          dimensions = _assertThisInitialize9.dimensions,
          getResourceDataUrl = _assertThisInitialize9.getResourceDataUrl,
          scrollToElementId = _assertThisInitialize.scrollToElementId,
          onNotePointerClick = _assertThisInitialize.onNotePointerClick;
      /**
       * ==========================================
       * Local rendering-related variables
       * ==========================================
       */


      var customCss = (0, _quinoaSchemas.getStyles)(_this.props.story).css || ''; // let noteCount = 1;
      // const notes = sectionsOrder.reduce((nf, sectionId) => [
      //   ...nf,
      //   ...sections[sectionId].notesOrder
      //       .map(noteId => ({
      //         ...sections[sectionId].notes[noteId],
      //         sectionId,
      //         finalOrder: noteCount++,
      //       }))
      // ], []);

      var finalSections = Object.keys(sections).reduce(function (res, sectionId) {
        return _objectSpread({}, res, _defineProperty({}, sectionId, _objectSpread({}, sections[sectionId], {
          notes: Object.keys(sections[sectionId].notes).reduce(function (tempNotes, noteId, noteIndex) {
            return _objectSpread({}, tempNotes, _defineProperty({}, noteId, _objectSpread({}, sections[sectionId].notes[noteId], {
              finalOrder: noteIndex + 1
            })));
          }, {})
        })));
      }, {});

      var _getStyles = (0, _quinoaSchemas.getStyles)(_this.props.story),
          _getStyles$options = _getStyles.options,
          options = _getStyles$options === void 0 ? {} : _getStyles$options;

      var notesPosition = options.notesPosition || 'foot'; // "responsive" notes positionning

      notesPosition = dimensions.width > 700 ? notesPosition : 'foot';
      var citationLocale = settings.citationLocale && settings.citationLocale.data || _englishLocale.default;
      var citationStyle = settings.citationStyle && settings.citationStyle.data || _apa.default;
      /**
       * Styles Variables (WYSIWYG)
       */

      var computedStylesVariables = settings.styles ? (0, _utils.stylesVariablesToCss)(settings.styles.pepper.stylesVariables) : '';
      /**
       * ==========================================
       * Callbacks
       * ==========================================
       */

      var onClickToggle = function onClickToggle() {
        return _this.toggleIndex();
      };

      var onClickTitle = function onClickTitle() {
        _this.scrollToContents();

        _this.toggleIndex();
      };
      /**
       * ==========================================
       * References binding
       * ==========================================
       */


      var bindGlobalScrollbarRef = function bindGlobalScrollbarRef(scrollbar) {
        _this.globalScrollbar = scrollbar;
      };

      var bindHeaderRef = function bindHeaderRef(header) {
        _this.header = header;
      };

      var NavEl = function NavEl(props) {
        return _react.default.createElement(_Nav.default, _extends({
          indexOpen: indexOpen,
          inCover: inCover,
          coverImage: coverImage,
          dimensions: dimensions,
          onClickToggle: onClickToggle,
          onClickTitle: onClickTitle,
          viewType: viewType,
          metadata: metadata,
          scrollToElementId: scrollToElementId,
          toggleIndex: _this.toggleIndex,
          isDisplayed: !coverImage && dimensions.width > 700 || !inCover,
          toc: toc
        }, props));
      };

      var FinalNav = function FinalNav() {
        if (previewMode) {
          return _react.default.createElement(NavEl, null);
        }

        var ConnectedEl = (0, _reactRouterDom.withRouter)(function (props) {
          return _react.default.createElement(NavEl, props);
        });
        return _react.default.createElement(_reactRouterDom.HashRouter, null, _react.default.createElement(ConnectedEl, null));
      };

      var PreviewContent = null;
      var navItems;

      switch (viewType) {
        case 'glossary':
          navItems = (0, _utils.getTocAdjacentNavItems)(toc, function (item) {
            return item.viewType === 'glossary';
          });
          PreviewContent = glossary && glossary.length ? function () {
            return _react.default.createElement(_Glossary.default, {
              locale: locale,
              glossary: glossary,
              scrollToElementId: scrollToElementId,
              prevItem: navItems.prevItem,
              nextItem: navItems.nextItem
            });
          } : null;
          break;

        case 'references':
          navItems = (0, _utils.getTocAdjacentNavItems)(toc, function (item) {
            return item.viewType === 'references';
          });
          PreviewContent = citations && citations.citationItems && Object.keys(citations.citationItems).length ? function () {
            return _react.default.createElement(_References.default, {
              id: "references",
              prevItem: navItems.prevItem,
              nextItem: navItems.nextItem,
              title: (0, _misc.capitalize)(locale.references || 'references')
            });
          } : null;
          break;

        case 'section':
          navItems = (0, _utils.getTocAdjacentNavItems)(toc, function (item) {
            return item.viewType === 'section' && item.viewParams.sectionId === viewParams.sectionId;
          });

          PreviewContent = function PreviewContent() {
            return _react.default.createElement(_SectionLayout.default, {
              section: finalSections[viewParams.sectionId],
              viewParams: viewParams,
              notesPosition: notesPosition,
              onNotePointerClick: onNotePointerClick,
              usedDocument: usedDocument,
              prevItem: navItems.prevItem,
              nextItem: navItems.nextItem,
              usedWindow: usedWindow,
              key: viewParams.sectionId
            });
          };

          break;

        case 'home':
        default:
          PreviewContent = function PreviewContent() {
            return _react.default.createElement(_Header.default, {
              coverImage: coverImage,
              getResourceDataUrl: getResourceDataUrl,
              metadata: metadata,
              bindRef: bindHeaderRef,
              toc: toc,
              locale: locale
            });
          };

          break;
      }

      if (!PreviewContent) {
        PreviewContent = function PreviewContent() {
          return _react.default.createElement(_Header.default, {
            coverImage: coverImage,
            getResourceDataUrl: getResourceDataUrl,
            metadata: metadata,
            bindRef: bindHeaderRef,
            toc: toc,
            locale: locale
          });
        };
      }

      return _react.default.createElement(_reactCiteproc.ReferencesManager, {
        style: citationStyle,
        locale: citationLocale,
        items: citations.citationItems,
        citations: citations.citationData,
        componentClass: "references-manager"
      }, _react.default.createElement("section", {
        className: "wrapper"
      }, _react.default.createElement(_reactCustomScrollbars.Scrollbars, {
        ref: bindGlobalScrollbarRef,
        autoHide: true,
        onUpdate: _this.onScrollUpdate,
        universal: true
      }, _react.default.createElement("section", {
        className: "body-wrapper"
      }, _react.default.createElement("section", {
        className: "contents-wrapper"
      }, previewMode ? _react.default.createElement(PreviewContent, null) : _react.default.createElement(_reactRouterDom.HashRouter, null, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
        path: "/",
        exact: true,
        component: function component() {
          return _react.default.createElement(_Header.default, {
            coverImage: coverImage,
            getResourceDataUrl: getResourceDataUrl,
            metadata: metadata,
            bindRef: bindHeaderRef,
            locale: locale,
            toc: toc
          });
        }
      }), _react.default.createElement(_reactRouterDom.Route, {
        path: "/sections/:sectionId",
        exact: true,
        component: function component(_ref2) {
          var sectionId = _ref2.match.params.sectionId,
              location = _ref2.location,
              history = _ref2.history;

          var _getTocAdjacentNavIte = (0, _utils.getTocAdjacentNavItems)(toc, function (item) {
            return item.viewType === 'section' && item.viewParams.sectionId === sectionId;
          }),
              prevItem = _getTocAdjacentNavIte.prevItem,
              nextItem = _getTocAdjacentNavIte.nextItem;

          if (location.search && location.search.length) {
            var queryParams = location.search.substr(1).split('&').map(function (couple) {
              return couple.split('=');
            }).reduce(function (params, couple) {
              return _objectSpread({}, params, _defineProperty({}, couple[0], couple[1]));
            }, {});

            if (queryParams.focusOnId) {
              setTimeout(function () {
                return _this.scrollToElementId(queryParams.focusOnId);
              });
            }
          }

          return _react.default.createElement(_SectionLayout.default, {
            section: finalSections[sectionId],
            notesPosition: notesPosition,
            prevItem: prevItem,
            nextItem: nextItem,
            onNotePointerClick: onNotePointerClick,
            usedDocument: usedDocument,
            usedWindow: usedWindow,
            history: history,
            key: sectionId
          });
        }
      }), _react.default.createElement(_reactRouterDom.Route, {
        path: "/glossary",
        exact: true,
        component: function component() {
          var _getTocAdjacentNavIte2 = (0, _utils.getTocAdjacentNavItems)(toc, function (item) {
            return item.viewType === 'glossary';
          }),
              prevItem = _getTocAdjacentNavIte2.prevItem,
              nextItem = _getTocAdjacentNavIte2.nextItem;

          return _react.default.createElement(_Glossary.default, {
            locale: locale,
            glossary: glossary,
            prevItem: prevItem,
            nextItem: nextItem
          });
        }
      }), _react.default.createElement(_reactRouterDom.Route, {
        path: "/references",
        exact: true,
        component: function component() {
          var _getTocAdjacentNavIte3 = (0, _utils.getTocAdjacentNavItems)(toc, function (item) {
            return item.viewType === 'references';
          }),
              prevItem = _getTocAdjacentNavIte3.prevItem,
              nextItem = _getTocAdjacentNavIte3.nextItem;

          return citations && citations.citationItems && Object.keys(citations.citationItems).length ? _react.default.createElement(_References.default, {
            id: "references",
            prevItem: prevItem,
            nextItem: nextItem,
            title: (0, _misc.capitalize)(locale.references || 'references')
          }) : null;
        }
      }), _react.default.createElement(_reactRouterDom.Route, {
        render: function render() {
          return _react.default.createElement(_reactRouterDom.Redirect, {
            to: "/"
          });
        }
      })))))), _react.default.createElement(FinalNav, null)), _react.default.createElement("style", null, contextualizersStyles, _pepper.default, computedStylesVariables, customCss), _react.default.createElement(_reactTooltip.default, {
        id: "tooltip",
        effect: "solid"
      }));
    };

    _this.scrollToContents = _this.scrollToContents.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.scrollToCover = _this.scrollToCover.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.scrollTop = _this.scrollTop.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onScrollUpdate = (0, _debounce.default)(_this.onScrollUpdate, 50, {
      leading: true,
      trailing: true,
      maxWait: 100
    }); // this.onScrollUpdate = this.onScrollUpdate.bind(this);

    _this.scrollToElementId = _this.scrollToElementId.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onNoteContentPointerClick = _this.onNoteContentPointerClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onGlossaryMentionClick = _this.onGlossaryMentionClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onInternalLinkClick = _this.onInternalLinkClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.toggleIndex = _this.toggleIndex.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    /**
     * Initial state
     */

    _this.state = {
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
    return _this;
  }
  /**
   * Updates data in the context when the state or props change
   */


  _createClass(PepperLayout, [{
    key: "componentDidMount",

    /**
     * Executes code on instance after the component is mounted
     */
    value: function componentDidMount() {
      var _this2 = this;

      // @todo: why did I have to wrap that in a setTimeout ?
      setTimeout(function () {
        if (_this2.props.story) {
          _this2.setState({
            glossary: (0, _misc.buildGlossary)(_this2.props.story),
            citations: (0, _misc.buildCitations)(_this2.props.story),
            coverImage: (0, _misc.buildCoverImage)(_this2.props.story),
            locale: _this2.props.locale && _locales.default[_this2.props.locale] ? _locales.default[_this2.props.locale] : _locales.default.en
          });

          setTimeout(function () {
            var toc = (0, _utils.buildTOC)(_this2.props.story, 0, _this2.state, {
              usedDocument: _this2.props.usedDocument,
              usedWindow: _this2.props.usedWindow
            });

            _this2.setState({
              toc: toc
            });
          });
        }
      });
    }
    /**
     * Executes code when component receives new properties
     * @param {object} nextProps - the future properties of the component
     */

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      // we perform expensive operations of building glossary
      // and citations data only when the story changes
      if (this.props.story !== nextProps.story) {
        this.setState({
          glossary: (0, _misc.buildGlossary)(nextProps.story),
          citations: (0, _misc.buildCitations)(nextProps.story),
          coverImage: (0, _misc.buildCoverImage)(nextProps.story),
          locale: nextProps.locale && _locales.default[nextProps.locale] ? _locales.default[nextProps.locale] : _locales.default.en
        });
        setTimeout(function () {
          var toc = (0, _utils.buildTOC)(_this3.props.story, 0, _this3.state, {
            usedDocument: _this3.props.usedDocument,
            usedWindow: _this3.props.usedWindow
          });

          _this3.setState({
            toc: toc
          });
        });
      }
    }
    /**
     * Programmatically navigates to a given view
     */

  }, {
    key: "scrollToContents",

    /**
     * Handle scrolling to the begining of contents
     */
    value: function scrollToContents() {
      if (this.header) {
        this.scrollTop(this.header.offsetHeight + 10);
        this.setState({
          inCover: false
        });
      }
    }
    /**
     * Handle scrolling to the cover (top of the page)
     */

  }, {
    key: "scrollToCover",
    value: function scrollToCover() {
      this.scrollTop(0);
      this.setState({
        inCover: true
      });
    }
    /**
     * Handles click on a specific note pointer in the main contents (scroll to the related note)
     * @param {string} noteId - the id of the note clicked
     */

  }, {
    key: "onNoteContentPointerClick",
    value: function onNoteContentPointerClick(noteId) {
      var noteElId = 'note-block-pointer-' + noteId;
      var el = this.props.usedDocument.getElementById(noteElId);
      var offset = (0, _utils.getOffset)(el);
      var top = offset.top - this.context.dimensions.height / 2;
      this.scrollTop(top);
    }
    /**
     * Handles click on a specific note pointer in the notes section (scroll to the related pointer)
     * @param {object} note - the note data
     */

  }, {
    key: "onGlossaryMentionClick",
    value: function onGlossaryMentionClick(id) {
      var target = 'glossary-mention-backlink-' + id;
      this.scrollToElementId(target);
    }
  }, {
    key: "onInternalLinkClick",
    value: function onInternalLinkClick(sectionId) {
      var target = 'section-container-' + sectionId;
      this.scrollToElementId(target);
    }
    /**
     * Toggles the visibility of the table of contents
     * @param {boolean} to - whether toc should be visible
     */

  }, {
    key: "toggleIndex",
    value: function toggleIndex(to) {
      this.setState({
        indexOpen: to !== undefined ? to : !this.state.indexOpen
      });
    }
    /**
     * Renders the component
     * @return {ReactElement} component - the component
     */

  }]);

  return PepperLayout;
}(_react.Component);
/**
 * Component's properties types
 */


PepperLayout.propTypes = {
  story: _propTypes.default.object
};
/**
 * Component's context used properties
 */

PepperLayout.contextTypes = {
  /**
   * dimensions of the container
   */
  dimensions: _propTypes.default.object,

  /**
   * getResourceDataUrl in fonio DataUrlProvider
   */
  getResourceDataUrl: _propTypes.default.func
};
/**
 * Component's context properties provided to children
 */

PepperLayout.childContextTypes = {
  /**
   * The presentation player to display full-screen if any
   */
  fixedPresentationId: _propTypes.default.string,

  /**
   * Callback triggered when a note pointer is clicked
   */
  onNoteContentPointerClick: _propTypes.default.func,

  /**
   * Callbacks when a glossary item is clicked
   */
  onGlossaryMentionClick: _propTypes.default.func,
  onInternalLinkClick: _propTypes.default.func,
  locale: _propTypes.default.object,
  citationStyle: _propTypes.default.string,
  citationLocale: _propTypes.default.string,
  InternalLinkProvider: _propTypes.default.func,
  navigateTo: _propTypes.default.func,
  previewMode: _propTypes.default.bool,
  activeView: _propTypes.default.shape({
    viewType: _propTypes.default.string,
    viewParams: _propTypes.default.obj
  }),
  scrollTop: _propTypes.default.func,
  scrollToElementId: _propTypes.default.func
};
var _default = PepperLayout;
exports.default = _default;