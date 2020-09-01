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

var _quinoaSchemas = require("quinoa-schemas");

var _d3Ease = require("d3-ease");

var _Bibliography = _interopRequireDefault(require("../../components/Bibliography"));

var _NotesContainer = _interopRequireDefault(require("../../components/NotesContainer"));

var _SectionLayout = _interopRequireDefault(require("./components/SectionLayout"));

var _Nav = _interopRequireDefault(require("./components/Nav"));

var _Glossary = _interopRequireDefault(require("./components/Glossary"));

var _Header = _interopRequireDefault(require("./components/Header"));

var _misc = require("../../utils/misc");

var _utils = require("./utils");

var _apa = _interopRequireDefault(require("raw-loader!../../assets/apa.csl"));

var _englishLocale = _interopRequireDefault(require("raw-loader!../../assets/english-locale.xml"));

var _locales = _interopRequireDefault(require("./locales.json"));

var _reactTable = _interopRequireDefault(require("!raw-loader!sass-loader!react-table/react-table.css"));

var _garlic = _interopRequireDefault(require("!raw-loader!sass-loader!./garlic.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
 * GarlicLayout class for building a story-player template react component instances
 */

var GarlicLayout =
/*#__PURE__*/
function (_Component) {
  _inherits(GarlicLayout, _Component);

  /**
   * constructor
   * @param {object} props - properties given to instance at instanciation
   */
  function GarlicLayout(props) {
    var _this;

    _classCallCheck(this, GarlicLayout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GarlicLayout).call(this, props));

    _this.componentDidUpdate = function (prevProps) {
      if (prevProps.story !== _this.props.story) {
        _this.updateScrollRelatedData();
      }
    };

    _this.componentWillUnmount = function () {
      (_this.props.usedWindow || window).removeEventListener('resize', _this.updateScrollRelatedData);
    };

    _this.getFinalStoryData = function (story) {
      var sectionsOrder = story.sectionsOrder,
          sections = story.sections;
      var noteCount = 1;
      var notes = sectionsOrder.reduce(function (nf, sectionId) {
        return [].concat(_toConsumableArray(nf), _toConsumableArray(sections[sectionId].notesOrder.map(function (noteId) {
          return _objectSpread({}, sections[sectionId].notes[noteId], {
            sectionId: sectionId,
            finalOrder: noteCount++
          });
        })));
      }, []);
      var finalSections = Object.keys(sections).reduce(function (res, sectionId) {
        return _objectSpread({}, res, _defineProperty({}, sectionId, _objectSpread({}, sections[sectionId], {
          notes: Object.keys(sections[sectionId].notes).reduce(function (tempNotes, noteId) {
            var related = notes.find(function (n) {
              return n.id === noteId;
            });
            return _objectSpread({}, tempNotes, _defineProperty({}, noteId, _objectSpread({}, sections[sectionId].notes[noteId], {
              finalOrder: related ? related.finalOrder : sections[sectionId].notes[noteId].order
            })));
          }, {})
        })));
      }, {});
      return {
        notes: notes,
        finalSections: finalSections
      };
    };

    _this.updateScrollRelatedData = function () {
      var scrollbars = _this.globalScrollbar;
      var scrollTop = scrollbars && scrollbars.getScrollTop();

      var scrollElements = _this.getScrollElements();

      var toc = (0, _utils.buildTOC)(_this.props.story, scrollTop || 0, _this.state, {
        usedDocument: _this.props.usedDocument,
        usedWindow: _this.props.usedWindow
      });

      _this.setState({
        toc: toc,
        scrollElements: scrollElements
      });
    };

    _this.getSectionId = function (element) {
      var parent = element.parentNode;

      while (parent && parent.className && !parent.className.includes('section ')) {
        parent = parent.parentNode;
      }

      if (parent && parent.className.includes('section ')) {
        var id = parent.id.split('section-container-').pop();
        return id;
      }
    };

    _this.getScrollElements = function () {
      var rawElements = _this.globalScrollbar.view.querySelectorAll('.content-atomic-container,.section-title,.content-title,.header-story-title');

      return Array.from(rawElements).map(function (element) {
        return {
          element: element,
          type: element.className.includes('content-atomic-container') ? 'atomic' : 'title',
          bbox: element.getBoundingClientRect(),
          sectionId: _this.getSectionId(element)
        };
      });
    };

    _this.checkIfInCover = function (evt) {
      if (!_this.header) {
        return;
      }

      var scrollTop = evt.scrollTop;
      var headerHeight = _this.header.offsetHeight || 20;
      var inCover = scrollTop < headerHeight;

      if (inCover !== _this.state.inCover) {
        _this.setState({
          inCover: inCover
        });
      }
    };

    _this.updateToc = function (evt) {
      var activeTOCElementKey = (0, _utils.getActiveTocElementKey)(evt.scrollTop, _this.state.toc, _this.props.usedWindow.innerHeight / 2);

      if (activeTOCElementKey !== _this.state.activeTOCElementKey) {
        _this.setState({
          activeTOCElementKey: activeTOCElementKey
        });
      }
    };

    _this.updateActiveFigure = function (evt) {
      var scrollTop = evt.scrollTop; // if scroll has changed, update the table of contents
      // (active element may have changed)
      // (todo: right now we are rebuilding the toc from scratch
      // at each update, we should split buildTOC in two functions
      // to handle the change of active element separately, for better performances)

      if (scrollTop !== _this.state.scrollTop) {
        var activeBlockId; // pick last matching element

        var activeBlock = _toConsumableArray(_this.state.scrollElements).reverse().find(function (element) {
          // return (element.bbox.top < evt.clientHeight * 0.5);
          return element.bbox.top < scrollTop + _this.props.usedWindow.innerHeight / 2;
        });

        var activeBlockSectionId = activeBlock.sectionId;

        if (activeBlock && activeBlock.type === 'atomic') {
          var idBearer = activeBlock.element.querySelector('.content-figure');

          if (idBearer) {
            activeBlockId = idBearer.id;
          }
        } else {
          activeBlockId = undefined;
        } // if (!this.state.activeBlock || (this.state.activeBlock.id !== activeBlock.id)) {


        if (_this.state.activeBlockId !== activeBlockId || _this.state.activeBlockSectionId !== activeBlockSectionId) {
          _this.setState({
            activeBlockId: activeBlockId,
            activeBlockSectionId: activeBlockSectionId
          });
        }
      }
    };

    _this.onScrollUpdate = function (evt) {
      if (!_this.header) {
        return;
      }

      _this.checkIfInCover(evt);

      _this.updateToc(evt);

      var _getStyles = (0, _quinoaSchemas.getStyles)(_this.props.story),
          _getStyles$options = _getStyles.options,
          options = _getStyles$options === void 0 ? {} : _getStyles$options;

      var figuresPosition = options.figuresPosition || 'body';

      if (figuresPosition === 'aside') {
        _this.updateActiveFigure(evt);
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
          sectionsOrder = _assertThisInitialize3.sectionsOrder,
          settings = _assertThisInitialize3.settings,
          usedDocument = _assertThisInitialize2.usedDocument,
          _assertThisInitialize4 = _assertThisInitialize.state,
          inCover = _assertThisInitialize4.inCover,
          toc = _assertThisInitialize4.toc,
          indexOpen = _assertThisInitialize4.indexOpen,
          glossary = _assertThisInitialize4.glossary,
          citations = _assertThisInitialize4.citations,
          coverImage = _assertThisInitialize4.coverImage,
          _assertThisInitialize5 = _assertThisInitialize4.locale,
          locale = _assertThisInitialize5 === void 0 ? {} : _assertThisInitialize5,
          activeTOCElementKey = _assertThisInitialize4.activeTOCElementKey,
          finalSections = _assertThisInitialize4.finalSections,
          notes = _assertThisInitialize4.notes,
          _assertThisInitialize6 = _assertThisInitialize.context,
          dimensions = _assertThisInitialize6.dimensions,
          getResourceDataUrl = _assertThisInitialize6.getResourceDataUrl,
          scrollToElementId = _assertThisInitialize.scrollToElementId,
          scrollToContents = _assertThisInitialize.scrollToContents;
      /**
       * ==========================================
       * Local rendering-related variables
       * ==========================================
       */


      var customCss = (0, _quinoaSchemas.getStyles)(_this.props.story).css || '';

      var _getStyles2 = (0, _quinoaSchemas.getStyles)(_this.props.story),
          _getStyles2$options = _getStyles2.options,
          options = _getStyles2$options === void 0 ? {} : _getStyles2$options;

      var notesPosition = options.notesPosition || 'foot';
      var figuresPosition = options.figuresPosition || 'body'; // "responsive" notes positionning

      notesPosition = dimensions.width > 700 ? notesPosition : 'foot';
      figuresPosition = dimensions.width > 700 ? figuresPosition : 'body';
      var citationLocale = settings.citationLocale && settings.citationLocale.data || _englishLocale.default;
      var citationStyle = settings.citationStyle && settings.citationStyle.data || _apa.default;
      /**
       * Styles Variables (WYSIWYG)
       */

      var computedStylesVariables = settings.styles ? (0, _utils.stylesVariablesToCss)(settings.styles.garlic.stylesVariables) : '';
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

      return _react.default.createElement(_reactCiteproc.ReferencesManager, {
        style: citationStyle,
        locale: citationLocale,
        items: citations.citationItems,
        citations: citations.citationData,
        componentClass: "references-manager"
      }, _react.default.createElement("section", {
        className: 'wrapper'
      }, _react.default.createElement(_reactCustomScrollbars.Scrollbars, {
        ref: bindGlobalScrollbarRef,
        autoHide: true,
        onUpdate: _this.onScrollUpdate,
        universal: true
      }, _react.default.createElement(_Header.default, {
        scrollToContents: scrollToContents,
        coverImage: coverImage,
        getResourceDataUrl: getResourceDataUrl,
        metadata: metadata,
        bindRef: bindHeaderRef
      }), _react.default.createElement("section", {
        className: "body-wrapper"
      }, _react.default.createElement("section", {
        className: "contents-wrapper  figures-position-".concat(figuresPosition)
      },
      /**
       * Sections display
       */
      sectionsOrder.map(function (thatId) {
        return _react.default.createElement(_SectionLayout.default, {
          section: finalSections[thatId],
          key: thatId
        });
      }),
      /**
       * End notes
       */
      notes && notes.length ? _react.default.createElement(_NotesContainer.default, {
        id: "notes",
        notes: notes,
        usedDocument: usedDocument,
        onNotePointerClick: _this.onNotePointerClick,
        title: (0, _misc.capitalize)(locale.notes || 'notes'),
        notesPosition: notesPosition
      }) : null,
      /**
       * References
       */
      citations && citations.citationItems && Object.keys(citations.citationItems).length ? _react.default.createElement(_Bibliography.default, {
        id: "references",
        title: (0, _misc.capitalize)(locale.references || 'references')
      }) : null,
      /**
       * Glossary
       */
      glossary && glossary.length ? _react.default.createElement(_Glossary.default, {
        locale: locale,
        glossary: glossary,
        scrollToElementId: scrollToElementId
      }) : null), _react.default.createElement(_Nav.default, {
        indexOpen: indexOpen,
        inCover: inCover,
        coverImage: coverImage,
        dimensions: dimensions,
        onClickToggle: onClickToggle,
        onClickTitle: onClickTitle,
        metadata: metadata,
        scrollToElementId: scrollToElementId,
        toc: toc,
        activeTOCElementKey: activeTOCElementKey,
        isDisplayed: coverImage && inCover
      }))), _react.default.createElement(_Nav.default, {
        indexOpen: indexOpen,
        inCover: inCover,
        coverImage: coverImage,
        dimensions: dimensions,
        onClickToggle: onClickToggle,
        onClickTitle: onClickTitle,
        metadata: metadata,
        scrollToElementId: scrollToElementId,
        activeTOCElementKey: activeTOCElementKey,
        toggleIndex: _this.toggleIndex,
        isDisplayed: !coverImage && dimensions.width > 700 || !inCover,
        toc: toc
      })), _react.default.createElement("style", null, contextualizersStyles, _garlic.default, computedStylesVariables, customCss), _react.default.createElement("div", {
        id: "modal-container"
      }));
    };

    _this.scrollToContents = _this.scrollToContents.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.scrollToCover = _this.scrollToCover.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.scrollTop = _this.scrollTop.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onScrollUpdate = (0, _debounce.default)(_this.onScrollUpdate, 40, {
      leading: true,
      trailing: true,
      maxWait: 100
    }); // this.onScrollUpdate = debounce(this.onScrollUpdate, 500, { leading: true, trailing: true, maxWait: 505 });
    // this.onScrollUpdate = debounce(this.onScrollUpdate, 500);
    // this.onScrollUpdate = this.onScrollUpdate.bind(this);

    _this.updateToc = (0, _debounce.default)(_this.updateToc, 500);
    _this.checkIfInCover = (0, _debounce.default)(_this.checkIfInCover, 500);
    _this.scrollToElementId = _this.scrollToElementId.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onNoteContentPointerClick = _this.onNoteContentPointerClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onGlossaryMentionClick = _this.onGlossaryMentionClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onInternalLinkClick = _this.onInternalLinkClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.toggleIndex = _this.toggleIndex.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    /**
     * Initial state
     */

    _this.state = _objectSpread({
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
    }, _this.getFinalStoryData(props.story));
    return _this;
  }
  /**
   * Updates data in the context when the state or props change
   */


  _createClass(GarlicLayout, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        // calback to trigger when a note content pointer is clicked
        onNoteContentPointerClick: this.onNoteContentPointerClick,
        // callbacks when a glossary mention is clicked
        onGlossaryMentionClick: this.onGlossaryMentionClick,
        onInternalLinkClick: this.onInternalLinkClick,
        locale: this.state.locale,
        activeBlockId: this.state.activeBlockId,
        activeBlockSectionId: this.state.activeBlockSectionId,
        usedDocument: this.props.usedDocument || document,
        usedWindow: this.props.usedWindow || window,
        citationLocale: this.props.story && this.props.story.settings.citationLocale && this.props.story.settings.citationLocale.data || _englishLocale.default,
        citationStyle: this.props.story && this.props.story.settings.citationStyle && this.props.story.settings.citationStyle.data || _apa.default
      };
    }
    /**
     * Executes code on instance after the component is mounted
     */

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      (this.props.usedWindow || window).addEventListener('resize', this.updateScrollRelatedData); // @todo: why did I have to wrap that in a setTimeout ?

      setTimeout(function () {
        if (_this2.props.story) {
          _this2.setState(_objectSpread({
            glossary: (0, _misc.buildGlossary)(_this2.props.story),
            citations: (0, _misc.buildCitations)(_this2.props.story),
            coverImage: (0, _misc.buildCoverImage)(_this2.props.story),
            locale: _this2.props.locale && _locales.default[_this2.props.locale] ? _locales.default[_this2.props.locale] : _locales.default.en
          }, _this2.getFinalStoryData(_this2.props.story)));

          _this2.updateScrollRelatedData();
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
      // we perform expensive operations of building glossary
      // and citations data only when the story changes
      if (this.props.story !== nextProps.story) {
        this.setState(_objectSpread({
          glossary: (0, _misc.buildGlossary)(nextProps.story),
          citations: (0, _misc.buildCitations)(nextProps.story),
          coverImage: (0, _misc.buildCoverImage)(nextProps.story),
          locale: nextProps.locale && _locales.default[nextProps.locale] ? _locales.default[nextProps.locale] : _locales.default.en
        }, this.getFinalStoryData(nextProps.story)));
      }
    }
  }, {
    key: "scrollTop",

    /**
     * Programmatically modifies the scroll state of the component
     * so that it transitions to a specific point in the page
     * @param {number} top - the position to scroll to
     */
    value: function scrollTop(initialTop) {
      var _this3 = this;

      var scrollbars = this.globalScrollbar;
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
          _this3.globalScrollbar.scrollTop(scrollTop + diff * to);
        }, ANIMATION_DURATION * t);
      };

      for (var t = 0; t <= 1; t += animationTick) {
        _loop(t);
      }
    }
    /**
     * Handle scrolling to a specific title in the page
     * @param {string} id - the id of the item to scroll to
     */

  }, {
    key: "scrollToElementId",
    value: function scrollToElementId(id) {
      var title = this.props.usedDocument.getElementById(id);

      if (title && title.offsetParent) {
        this.scrollTop(title.offsetTop + title.offsetParent.offsetParent.offsetTop - this.context.dimensions.height / 2);
      }
    }
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

  return GarlicLayout;
}(_react.Component);
/**
 * Component's properties types
 */


GarlicLayout.propTypes = {
  story: _propTypes.default.object
};
/**
 * Component's context used properties
 */

GarlicLayout.contextTypes = {
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

GarlicLayout.childContextTypes = {
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
  activeBlockId: _propTypes.default.string,
  activeBlockSectionId: _propTypes.default.string,
  usedDocument: _propTypes.default.object,
  usedWindow: _propTypes.default.object
};
var _default = GarlicLayout;
exports.default = _default;