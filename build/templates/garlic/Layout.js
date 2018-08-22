'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactCustomScrollbars = require('react-custom-scrollbars');

var _rebound = require('rebound');

var _lodash = require('lodash');

var _reactCiteproc = require('react-citeproc');

var _Bibliography = require('../../components/Bibliography');

var _Bibliography2 = _interopRequireDefault(_Bibliography);

var _NotesContainer = require('../../components/NotesContainer');

var _NotesContainer2 = _interopRequireDefault(_NotesContainer);

var _SectionLayout = require('./components/SectionLayout');

var _SectionLayout2 = _interopRequireDefault(_SectionLayout);

var _Nav = require('./components/Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _Glossary = require('./components/Glossary');

var _Glossary2 = _interopRequireDefault(_Glossary);

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _misc = require('../../utils/misc');

var _utils = require('./utils');

var _apa = require('raw-loader!../../assets/apa.csl');

var _apa2 = _interopRequireDefault(_apa);

var _englishLocale = require('raw-loader!../../assets/english-locale.xml');

var _englishLocale2 = _interopRequireDefault(_englishLocale);

var _locales = require('./locales.json');

var _locales2 = _interopRequireDefault(_locales);

require('./garlic.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GarlicLayout = function (_Component) {
  (0, _inherits3.default)(GarlicLayout, _Component);

  function GarlicLayout(props) {
    (0, _classCallCheck3.default)(this, GarlicLayout);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GarlicLayout.__proto__ || (0, _getPrototypeOf2.default)(GarlicLayout)).call(this, props));

    _this.onScrollUpdate = function (evt) {
      if (!_this.header) {
        return;
      }
      var scrollTop = evt.scrollTop;
      var headerHeight = _this.header.offsetHeight || 20;
      var presentationEls = document.getElementsByClassName('quinoa-presentation-player');
      var presentations = [];
      var fixedPresentationId = void 0;
      var fixedPresentationHeight = void 0;
      var stateChanges = {};

      var inCover = scrollTop < headerHeight;

      if (inCover && !_this.state.inCover) {
        stateChanges = (0, _extends5.default)({}, stateChanges, {
          inCover: true
        });
      } else if (!inCover && _this.state.inCover) {
        stateChanges = (0, _extends5.default)({}, stateChanges, {
          inCover: false
        });
      }
      if (inCover) {
        stateChanges = (0, _extends5.default)({}, stateChanges);
      }
      if ((0, _keys2.default)(stateChanges).length) {
        _this.setState(stateChanges);
        return;
      }
      for (var i = 0; i < presentationEls.length; i++) {
        var presentation = presentationEls[i].parentNode;
        var id = presentation.getAttribute('id');
        var top = presentation.offsetTop + _this.header.offsetHeight;
        var height = presentation.offsetHeight;
        presentations.push({
          id: id,
          top: top,
          height: height
        });
        if (scrollTop >= top && scrollTop <= top + height * 0.4 - 5
        ) {
            fixedPresentationId = id;
            fixedPresentationHeight = height;
          }
      }
      if (fixedPresentationId !== _this.state.fixedPresentationId) {
        stateChanges = (0, _extends5.default)({}, stateChanges, {
          fixedPresentationId: fixedPresentationId,
          fixedPresentationHeight: fixedPresentationHeight
        });
        _this.setState(stateChanges);
        return;
      }
      if (scrollTop !== _this.state.scrollTop) {
        var toc = (0, _utils.buildTOC)(_this.props.story, scrollTop, _this.state);
        stateChanges = (0, _extends5.default)({}, stateChanges, {
          toc: toc,
          scrollTop: scrollTop
        });
      }
      if ((0, _keys2.default)(stateChanges).length) {
        _this.setState(stateChanges);
      }
    };

    _this.onNotePointerClick = function (note) {
      var noteElId = 'note-content-pointer-' + note.id;
      var el = document.getElementById(noteElId);
      var offset = (0, _utils.getOffset)(el);
      var top = offset.top - _this.context.dimensions.height / 2;
      _this.scrollTop(top);
    };

    _this.render = function () {
      var _this$props$story = _this.props.story,
          metadata = _this$props$story.metadata,
          sectionsOrder = _this$props$story.sectionsOrder,
          sections = _this$props$story.sections,
          _this$props$story$set = _this$props$story.settings,
          settings = _this$props$story$set === undefined ? {} : _this$props$story$set,
          _this$state = _this.state,
          inCover = _this$state.inCover,
          toc = _this$state.toc,
          indexOpen = _this$state.indexOpen,
          glossary = _this$state.glossary,
          citations = _this$state.citations,
          coverImage = _this$state.coverImage,
          _this$state$locale = _this$state.locale,
          locale = _this$state$locale === undefined ? {} : _this$state$locale,
          _this$context = _this.context,
          dimensions = _this$context.dimensions,
          getResourceDataUrl = _this$context.getResourceDataUrl,
          scrollToElementId = _this.scrollToElementId,
          scrollToContents = _this.scrollToContents;

      var customCss = settings.css || '';
      var noteCount = 1;
      var notes = sectionsOrder.reduce(function (nf, sectionId) {
        return [].concat((0, _toConsumableArray3.default)(nf), (0, _toConsumableArray3.default)(sections[sectionId].notesOrder.map(function (noteId) {
          return (0, _extends5.default)({}, sections[sectionId].notes[noteId], {
            sectionId: sectionId,
            finalOrder: noteCount++
          });
        })));
      }, []);
      var finalSections = (0, _keys2.default)(sections).reduce(function (res, sectionId) {
        return (0, _extends5.default)({}, res, (0, _defineProperty3.default)({}, sectionId, (0, _extends5.default)({}, sections[sectionId], {
          notes: (0, _keys2.default)(sections[sectionId].notes).reduce(function (tempNotes, noteId) {
            var related = notes.find(function (n) {
              return n.id === noteId;
            });
            return (0, _extends5.default)({}, tempNotes, (0, _defineProperty3.default)({}, noteId, (0, _extends5.default)({}, sections[sectionId].notes[noteId], {
              finalOrder: related ? related.finalOrder : sections[sectionId].notes[noteId].order
            })));
          }, {})
        })));
      }, {});
      var notesPosition = settings.options && settings.options.notesPosition || 'foot';
      var citationLocale = settings.citationLocale && settings.citationLocale.data || _englishLocale2.default;
      var citationStyle = settings.citationStyle && settings.citationStyle.data || _apa2.default;
      var onClickToggle = function onClickToggle() {
        return _this.toggleIndex();
      };
      var onClickTitle = function onClickTitle() {
        _this.scrollToContents();
        _this.toggleIndex();
      };
      var bindGlobalScrollbarRef = function bindGlobalScrollbarRef(scrollbar) {
        _this.globalScrollbar = scrollbar;
      };
      var bindHeaderRef = function bindHeaderRef(header) {
        _this.header = header;
      };
      return _react2.default.createElement(
        _reactCiteproc.ReferencesManager,
        {
          style: citationStyle,
          locale: citationLocale,
          items: citations.citationItems,
          citations: citations.citationData,
          componentClass: 'references-manager' },
        _react2.default.createElement(
          'section',
          { className: 'wrapper' },
          _react2.default.createElement(
            _reactCustomScrollbars.Scrollbars,
            {
              ref: bindGlobalScrollbarRef,
              autoHide: true,
              onUpdate: _this.onScrollUpdate,
              universal: true },
            _react2.default.createElement(_Header2.default, {
              scrollToContents: scrollToContents,
              coverImage: coverImage,
              getResourceDataUrl: getResourceDataUrl,
              metadata: metadata,
              bindRef: bindHeaderRef }),
            _react2.default.createElement(
              'section',
              {
                className: 'body-wrapper' },
              _react2.default.createElement(
                'section',
                { className: 'contents-wrapper' },

                sectionsOrder.map(function (thatId) {
                  return _react2.default.createElement(_SectionLayout2.default, { section: finalSections[thatId], key: thatId });
                }),

                notes && notes.length ? _react2.default.createElement(_NotesContainer2.default, {
                  id: 'notes',
                  notes: notes,
                  onNotePointerClick: _this.onNotePointerClick,
                  title: (0, _misc.capitalize)(locale.notes || 'notes'),
                  notesPosition: notesPosition }) : null,

                citations && citations.citationItems && (0, _keys2.default)(citations.citationItems).length ? _react2.default.createElement(_Bibliography2.default, { id: 'references', title: (0, _misc.capitalize)(locale.references || 'references') }) : null,

                glossary && glossary.length ? _react2.default.createElement(_Glossary2.default, {
                  locale: locale,
                  glossary: glossary,
                  scrollToElementId: scrollToElementId }) : null
              ),
              _react2.default.createElement(_Nav2.default, {
                indexOpen: indexOpen,
                inCover: inCover,
                coverImage: coverImage,
                dimensions: dimensions,
                onClickToggle: onClickToggle,
                onClickTitle: onClickTitle,
                metadata: metadata,
                toc: toc,
                isDisplayed: coverImage && inCover })
            )
          ),
          _react2.default.createElement(_Nav2.default, {
            indexOpen: indexOpen,
            inCover: inCover,
            coverImage: coverImage,
            dimensions: dimensions,
            onClickToggle: onClickToggle,
            onClickTitle: onClickTitle,
            metadata: metadata,
            isDisplayed: !coverImage || !inCover,
            toc: toc })
        ),
        _react2.default.createElement(
          'style',
          null,
          customCss
        )
      );
    };

    _this.scrollToContents = _this.scrollToContents.bind(_this);
    _this.scrollToCover = _this.scrollToCover.bind(_this);
    _this.handleSpringUpdate = _this.handleSpringUpdate.bind(_this);
    _this.scrollTop = _this.scrollTop.bind(_this);
    _this.onScrollUpdate = (0, _lodash.debounce)(_this.onScrollUpdate, 10, { leading: true, trailing: true, maxWait: 100 });
    _this.scrollToElementId = _this.scrollToElementId.bind(_this);
    _this.onNoteContentPointerClick = _this.onNoteContentPointerClick.bind(_this);
    _this.onGlossaryMentionClick = _this.onGlossaryMentionClick.bind(_this);

    _this.toggleIndex = _this.toggleIndex.bind(_this);

    _this.onPresentationExit = _this.onPresentationExit.bind(_this);
    _this.state = {
      inCover: true,
      toc: [],
      scrollTop: 0,
      indexOpen: false,
      citations: {
        citationItems: {},
        citationData: []
      },
      glossary: [],
      coverImage: undefined
    };
    return _this;
  }


  (0, _createClass3.default)(GarlicLayout, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        fixedPresentationId: this.state.fixedPresentationId,
        onExit: this.onPresentationExit,
        onNoteContentPointerClick: this.onNoteContentPointerClick,
        onGlossaryMentionClick: this.onGlossaryMentionClick,
        locale: this.state.locale
      };
    }

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.springSystem = new _rebound.SpringSystem();
      this.spring = this.springSystem.createSpring();
      this.spring.addListener({ onSpringUpdate: this.handleSpringUpdate });
      setTimeout(function () {
        if (_this2.props.story) {
          _this2.setState({
            glossary: (0, _misc.buildGlossary)(_this2.props.story),
            citations: (0, _misc.buildCitations)(_this2.props.story),
            coverImage: (0, _misc.buildCoverImage)(_this2.props.story),
            locale: _this2.props.locale && _locales2.default[_this2.props.locale] ? _locales2.default[_this2.props.locale] : _locales2.default.en
          });
          setTimeout(function () {
            var toc = (0, _utils.buildTOC)(_this2.props.story, 0, _this2.state);
            _this2.setState({ toc: toc });
          });
        }
      });
    }

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      if (this.props.story !== nextProps.story) {
        this.setState({
          glossary: (0, _misc.buildGlossary)(nextProps.story),
          citations: (0, _misc.buildCitations)(nextProps.story),
          coverImage: (0, _misc.buildCoverImage)(nextProps.story),
          locale: nextProps.locale && _locales2.default[nextProps.locale] ? _locales2.default[nextProps.locale] : _locales2.default.en
        });
        setTimeout(function () {
          var toc = (0, _utils.buildTOC)(_this3.props.story, 0, _this3.state);
          _this3.setState({ toc: toc });
        });
      }
    }


  }, {
    key: 'handleSpringUpdate',
    value: function handleSpringUpdate(spring) {
      var val = spring.getCurrentValue();
      if (val !== undefined && this.globalScrollbar) {
        this.globalScrollbar.scrollTop(val);
      }
    }


  }, {
    key: 'scrollTop',
    value: function scrollTop(top) {
      var scrollbars = this.globalScrollbar;
      var scrollTop = scrollbars.getScrollTop();
      var scrollHeight = scrollbars.getScrollHeight();
      var val = _rebound.MathUtil.mapValueInRange(top, 0, scrollHeight, 0, scrollHeight);
      this.spring.setCurrentValue(scrollTop).setAtRest();
      this.spring.setEndValue(val);
    }


  }, {
    key: 'scrollToElementId',
    value: function scrollToElementId(id) {
      var title = document.getElementById(id);
      if (title) {
        this.scrollTop(title.offsetTop + title.offsetParent.offsetParent.offsetTop - this.context.dimensions.height / 2);
      }
    }


  }, {
    key: 'scrollToContents',


    value: function scrollToContents() {
      if (this.header) {
        this.scrollTop(this.header.offsetHeight);
        this.setState({
          inCover: false
        });
      }
    }


  }, {
    key: 'scrollToCover',
    value: function scrollToCover() {
      this.scrollTop(0);
      this.setState({
        inCover: true
      });
    }


  }, {
    key: 'onNoteContentPointerClick',
    value: function onNoteContentPointerClick(noteId) {
      var noteElId = 'note-block-pointer-' + noteId;
      var el = document.getElementById(noteElId);
      var offset = (0, _utils.getOffset)(el);
      var top = offset.top - this.context.dimensions.height / 2;
      this.scrollTop(top);
    }


  }, {
    key: 'onPresentationExit',


    value: function onPresentationExit(direction) {
      var top = this.state.scrollTop;
      if (direction === 'top') {
        this.globalScrollbar.scrollTop(top - 50);
      }
      else {
          var h = this.state.fixedPresentationHeight || this.context.dimensions.height;

          this.globalScrollbar.scrollTop(top + h * 0.1);
        }
    }
  }, {
    key: 'onGlossaryMentionClick',
    value: function onGlossaryMentionClick(id) {
      var target = 'glossary-mention-backlink-' + id;
      this.scrollToElementId(target);
    }


  }, {
    key: 'toggleIndex',
    value: function toggleIndex(to) {
      this.setState({
        indexOpen: to !== undefined ? to : !this.state.indexOpen
      });
    }


  }]);
  return GarlicLayout;
}(_react.Component);



GarlicLayout.propTypes = {
  story: _propTypes2.default.object
};
GarlicLayout.contextTypes = {
  dimensions: _propTypes2.default.object,
  getResourceDataUrl: _propTypes2.default.func
};
GarlicLayout.childContextTypes = {
  fixedPresentationId: _propTypes2.default.string,
  onNoteContentPointerClick: _propTypes2.default.func,
  onExit: _propTypes2.default.func,
  onGlossaryMentionClick: _propTypes2.default.func,

  locale: _propTypes2.default.object
};

exports.default = GarlicLayout;