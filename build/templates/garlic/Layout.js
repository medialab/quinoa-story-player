'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _SectionLayout = require('./SectionLayout');

var _SectionLayout2 = _interopRequireDefault(_SectionLayout);

var _Bibliography = require('../../components/Bibliography');

var _Bibliography2 = _interopRequireDefault(_Bibliography);

var _NotesContainer = require('../../components/NotesContainer');

var _NotesContainer2 = _interopRequireDefault(_NotesContainer);

var _ReactDisqusWrapper = require('../../components/ReactDisqusWrapper');

var _ReactDisqusWrapper2 = _interopRequireDefault(_ReactDisqusWrapper);

var _apa = require('raw-loader!../../assets/apa.csl');

var _apa2 = _interopRequireDefault(_apa);

var _englishLocale = require('raw-loader!../../assets/english-locale.xml');

var _englishLocale2 = _interopRequireDefault(_englishLocale);

require('./garlic.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOffset(el) {
  var _x = 0;
  var _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft; // - el.scrollLeft;
    _y += el.offsetTop; // - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

var PresentationLayout = function (_Component) {
  (0, _inherits3.default)(PresentationLayout, _Component);

  function PresentationLayout(props) {
    (0, _classCallCheck3.default)(this, PresentationLayout);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PresentationLayout.__proto__ || (0, _getPrototypeOf2.default)(PresentationLayout)).call(this, props));

    _this.onScrollUpdate = function (evt) {
      if (!_this.header) {
        return;
      }
      var scrollTop = evt.scrollTop;
      var headerHeight = _this.header.offsetHeight;
      var presentationEls = document.getElementsByClassName('quinoa-presentation-player');
      var presentations = [];
      var fixedPresentationId = void 0;
      var fixedPresentationHeight = void 0;
      var stateChanges = {};

      // check if we are in the cover of the story
      if (scrollTop < headerHeight && !_this.state.inCover) {
        stateChanges = (0, _extends5.default)({}, stateChanges, {
          inCover: true
        });
      } else if (scrollTop > headerHeight && _this.state.inCover) {
        stateChanges = (0, _extends5.default)({}, stateChanges, {
          inCover: false
        });
      }
      // applying state changes if needed
      if ((0, _keys2.default)(stateChanges).length) {
        _this.setState(stateChanges);
        return;
      }
      // check if a presentation is in "fixed" mode (user scrolls inside it)
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
        // checking if this presentation deserves to be "fixed" (user scroll inside it)
        // note : there can be more or less strict rules to define when to switch to "fixed" mode - it's a matter of ux and testing
        if (scrollTop >= top && scrollTop <= top + height * 0.4 - 5
        // (scrollTop > prevScroll && prevScroll < top && scrollTop > top)
        // || (scrollTop >= prevScroll && scrollTop >= top && scrollTop <= top + height * 0.9)
        // || (scrollTop <= prevScroll && scrollTop >= top && scrollTop <= top + height * .5)
        ) {
            fixedPresentationId = id;
            fixedPresentationHeight = height;
          }
      }
      // if new fixed presentation, set it
      if (fixedPresentationId !== _this.state.fixedPresentationId) {
        stateChanges = (0, _extends5.default)({}, stateChanges, {
          fixedPresentationId: fixedPresentationId,
          fixedPresentationHeight: fixedPresentationHeight
        });
        _this.setState(stateChanges);
        return;
      }

      if (scrollTop !== _this.state.scrollTop) {
        var toc = _this.buildTOC(_this.props.story, scrollTop);
        stateChanges = (0, _extends5.default)({}, stateChanges, {
          toc: toc,
          scrollTop: scrollTop
        });
      }

      // applying state changes if needed
      if ((0, _keys2.default)(stateChanges).length) {
        _this.setState(stateChanges);
      }
    };

    _this.onNotePointerClick = function (note) {
      var noteElId = 'note-content-pointer-' + note.id;
      var el = document.getElementById(noteElId);
      var offset = getOffset(el);
      var top = offset.top - window.innerHeight / 2;
      _this.scrollTop(top);
    };

    _this.prepareCitations = function () {
      var story = _this.props.story;

      if (!story) {
        return;
      }
      var contextualizations = story.contextualizations,
          contextualizers = story.contextualizers,
          resources = story.resources;
      /*
       * Assets preparation
       */

      var assets = (0, _keys2.default)(contextualizations).reduce(function (ass, id) {
        var contextualization = contextualizations[id];
        var contextualizer = contextualizers[contextualization.contextualizerId];
        return (0, _extends5.default)({}, ass, (0, _defineProperty3.default)({}, id, (0, _extends5.default)({}, contextualization, {
          resource: resources[contextualization.resourceId],
          contextualizer: contextualizer,
          type: contextualizer ? contextualizer.type : 'INLINE_ASSET'
        })));
      }, {}); /*
              * Citations preparation
              */
      // isolate bib contextualizations
      var bibContextualizations = (0, _keys2.default)(assets).filter(function (assetKey) {
        return assets[assetKey].type === 'bib';
      }).map(function (assetKey) {
        return assets[assetKey];
      });
      // build citations items data
      var citationItems = (0, _keys2.default)(bibContextualizations).reduce(function (finalCitations, key1) {
        var bibCit = bibContextualizations[key1];
        var citations = bibCit.resource.data;
        var newCitations = citations.reduce(function (final2, citation) {
          return (0, _extends5.default)({}, final2, (0, _defineProperty3.default)({}, citation.id, citation));
        }, {});
        return (0, _extends5.default)({}, finalCitations, newCitations);
      }, {});
      // build citations's citations data
      var citationInstances = bibContextualizations // Object.keys(bibContextualizations)
      .map(function (bibCit, index) {
        var key1 = bibCit.id;
        var contextualization = contextualizations[key1];

        var contextualizer = contextualizers[contextualization.contextualizerId];
        var resource = resources[contextualization.resourceId];
        return {
          citationID: key1,
          citationItems: resource.data.map(function (ref) {
            return {
              locator: contextualizer.locator,
              prefix: contextualizer.prefix,
              suffix: contextualizer.suffix,
              // ...contextualizer,
              id: ref.id
            };
          }),
          properties: {
            noteIndex: index + 1
          }
        };
      });
      // map them to the clumsy formatting needed by citeProc
      var citationData = citationInstances.map(function (instance, index) {
        return [instance,
        // citations before
        citationInstances.slice(0, index === 0 ? 0 : index).map(function (oCitation) {
          return [oCitation.citationID, oCitation.properties.noteIndex];
        }), []
        // citations after
        // citationInstances.slice(index)
        //   .map((oCitation) => [
        //       oCitation.citationID,
        //       oCitation.properties.noteIndex
        //     ]
        //   ),
        ];
      });
      return {
        citationData: citationData,
        citationItems: citationItems
      };
    };

    _this.scrollToContents = _this.scrollToContents.bind(_this);
    _this.scrollToCover = _this.scrollToCover.bind(_this);
    _this.handleSpringUpdate = _this.handleSpringUpdate.bind(_this);
    _this.scrollTop = _this.scrollTop.bind(_this);
    _this.onScrollUpdate = (0, _lodash.debounce)(_this.onScrollUpdate, 30);
    _this.buildTOC = _this.buildTOC.bind(_this);
    _this.scrollToTitle = _this.scrollToTitle.bind(_this);
    _this.onNoteContentPointerClick = _this.onNoteContentPointerClick.bind(_this);

    _this.toggleIndex = _this.toggleIndex.bind(_this);

    _this.onPresentationExit = _this.onPresentationExit.bind(_this);

    _this.state = {
      inCover: true,
      toc: [],
      scrollTop: 0,
      indexOpen: false
    };
    return _this;
  }

  (0, _createClass3.default)(PresentationLayout, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        fixedPresentationId: this.state.fixedPresentationId,
        onExit: this.onPresentationExit,
        onNoteContentPointerClick: this.onNoteContentPointerClick
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.springSystem = new _rebound.SpringSystem();
      this.spring = this.springSystem.createSpring();
      this.spring.addListener({ onSpringUpdate: this.handleSpringUpdate });
    }
  }, {
    key: 'toggleIndex',
    value: function toggleIndex(to) {
      this.setState({
        indexOpen: to !== undefined ? to : !this.state.indexOpen
      });
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
    key: 'onPresentationExit',
    value: function onPresentationExit(direction) {
      var top = this.state.scrollTop;
      // user is scrolling in direction of the top of the screen
      if (direction === 'top') {
        this.globalScrollbar.scrollTop(top - 50);
      }
      // user is scrolling in direction of the bottom of the screen
      else {
          var h = this.state.fixedPresentationHeight;
          this.globalScrollbar.scrollTop(top + h * 0.1);
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
    key: 'onNoteContentPointerClick',
    value: function onNoteContentPointerClick(noteId) {
      var noteElId = 'note-block-pointer-' + noteId;
      var el = document.getElementById(noteElId);
      var offset = getOffset(el);
      var top = offset.top - window.innerHeight / 2;
      this.scrollTop(top);
    }
  }, {
    key: 'buildTOC',
    value: function buildTOC(story, scrollTop) {
      return story.sectionsOrder.map(function (sectionId, sectionIndex) {
        var section = story.sections[sectionId];
        var sectionLevel = section.metadata.level + 1;
        var content = section.contents;
        var headers = content && content.blocks && content.blocks.filter(function (block) {
          return block.type.indexOf('header') === 0;
        });

        var sectionActive = void 0;
        var titleOffsetTop = void 0;
        var nextTitleOffsetTop = void 0;
        var title = void 0;
        title = document.getElementById(section.id);
        if (!title) {
          return undefined;
        }
        titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
        if (sectionIndex < story.sectionsOrder.length - 1) {
          var next = story.sectionsOrder[sectionIndex + 1];
          var nextTitle = document.getElementById(next);
          nextTitleOffsetTop = nextTitle.offsetTop + title.offsetParent.offsetParent.offsetTop;
        }
        if (titleOffsetTop <= scrollTop + window.innerHeight / 2 && (nextTitleOffsetTop === undefined || nextTitleOffsetTop >= scrollTop)) {
          sectionActive = true;
        }
        var sectionHeader = {
          level: sectionLevel,
          text: section.metadata.title || '',
          key: section.id,
          active: sectionActive
        };
        var headerItems = headers ? headers.map(function (block, index) {
          var type = block.type,
              text = block.text,
              key = block.key;

          var levelStr = type.split('header-').pop();
          var level = void 0;
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
            var _next = headers[index + 1];
            var _nextTitle = document.getElementById(_next.key);
            nextTitleOffsetTop = _nextTitle.offsetTop + title.offsetParent.offsetParent.offsetTop;
          }
          var headerActive = void 0;
          if (titleOffsetTop <= scrollTop + window.innerHeight / 2 && (nextTitleOffsetTop === undefined || nextTitleOffsetTop >= scrollTop)) {
            headerActive = true;
          }
          return {
            level: level,
            text: text,
            key: key,
            active: headerActive
          };
        }) : [];
        return [sectionHeader].concat((0, _toConsumableArray3.default)(headerItems));
      }).filter(function (el) {
        return el !== undefined;
      })
      // flatten mini-tocs
      .reduce(function (result, ar) {
        return [].concat((0, _toConsumableArray3.default)(result), (0, _toConsumableArray3.default)(ar));
      }, []);
    }
  }, {
    key: 'scrollToTitle',
    value: function scrollToTitle(id) {
      var title = document.getElementById(id);
      if (title) {
        this.scrollTop(title.offsetTop + title.offsetParent.offsetParent.offsetTop);
      }
    }
  }, {
    key: 'handleSpringUpdate',
    value: function handleSpringUpdate(spring) {
      var val = spring.getCurrentValue();
      this.globalScrollbar.scrollTop(val);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props$story = this.props.story,
          metadata = _props$story.metadata,
          sectionsOrder = _props$story.sectionsOrder,
          sections = _props$story.sections,
          _props$story$settings = _props$story.settings,
          settings = _props$story$settings === undefined ? {} : _props$story$settings,
          id = _props$story.id;
      var _state = this.state,
          inCover = _state.inCover,
          toc = _state.toc,
          indexOpen = _state.indexOpen;
      var dimensions = this.context.dimensions;


      var bindGlobalScrollbarRef = function bindGlobalScrollbarRef(scrollbar) {
        _this2.globalScrollbar = scrollbar;
      };
      var bindHeaderRef = function bindHeaderRef(header) {
        _this2.header = header;
      };

      var onClickToggle = function onClickToggle() {
        return _this2.toggleIndex();
      };
      var noteCount = 1;
      var notes = sectionsOrder.reduce(function (nf, sectionId) {
        return [].concat((0, _toConsumableArray3.default)(nf), (0, _toConsumableArray3.default)((0, _keys2.default)(sections[sectionId].notes || {}).map(function (noteId) {
          return (0, _extends5.default)({}, sections[sectionId].notes[noteId], {
            sectionId: sectionId,
            finalOrder: noteCount++
          });
        })));
      }, []);

      var citations = this.prepareCitations();

      var location = window.location.href;
      var customCss = settings.css || '';

      var notesPosition = settings.options && settings.options.notesPosition || 'foot';
      var allowDisqusComments = settings.options && settings.options.allowDisqusComments === 'yes';
      var citationLocale = settings.citationLocale && settings.citationLocale.data || _englishLocale2.default;
      var citationStyle = settings.citationStyle && settings.citationStyle.data || _apa2.default;
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
              onUpdate: this.onScrollUpdate,
              universal: true },
            _react2.default.createElement(
              'header',
              {
                onClick: this.scrollToContents,
                className: 'header',
                ref: bindHeaderRef,
                style: {
                  backgroundImage: metadata.coverImage ? 'url(' + metadata.coverImage + ')' : undefined
                } },
              _react2.default.createElement(
                'div',
                {
                  className: 'header-content' },
                _react2.default.createElement(
                  'h1',
                  null,
                  metadata.title || 'Quinoa story'
                ),
                metadata.authors && metadata.authors.length ? _react2.default.createElement(
                  'div',
                  { className: 'authors' },
                  metadata.authors.map(function (author) {
                    return author;
                  }).join(', ')
                ) : null
              )
            ),
            _react2.default.createElement(
              'section',
              {
                className: 'body-wrapper' },
              _react2.default.createElement(
                'section',
                { className: 'contents-wrapper' },
                sectionsOrder.map(function (thatId) {
                  return _react2.default.createElement(_SectionLayout2.default, { section: sections[thatId], key: thatId });
                }),
                notes && notes.length ? _react2.default.createElement(_NotesContainer2.default, {
                  notes: notes,
                  onNotePointerClick: this.onNotePointerClick,
                  notesPosition: notesPosition }) : null,
                citations && citations.citationItems && (0, _keys2.default)(citations.citationItems).length ? _react2.default.createElement(_Bibliography2.default, null) : null,
                allowDisqusComments && _react2.default.createElement(_ReactDisqusWrapper2.default, {
                  shortname: 'quinoa-story-' + id,
                  identifier: 'quinoa-story-' + id,
                  title: metadata.title,
                  url: location })
              ),
              _react2.default.createElement(
                'nav',
                {
                  className: 'nav',
                  style: {
                    position: inCover ? 'relative' : 'fixed',
                    left: inCover ? '' : dimensions.left,
                    top: inCover ? '' : dimensions.top
                  }
                },
                _react2.default.createElement(
                  'h2',
                  { onClick: this.scrollToCover },
                  metadata.title || 'Quinoa story'
                ),
                toc && toc.length !== undefined && toc.length > 0 && _react2.default.createElement(
                  'button',
                  {
                    className: 'index-toggle ' + (indexOpen ? 'active' : ''),
                    onClick: onClickToggle },
                  'Index'
                ),
                _react2.default.createElement(
                  'ul',
                  {
                    className: 'table-of-contents',
                    style: {
                      maxHeight: indexOpen ? '100%' : 0
                    } },
                  toc && toc.map(function (item, index) {
                    var onClick = function onClick(e) {
                      e.stopPropagation();
                      e.preventDefault();
                      _this2.scrollToTitle(item.key);
                    };
                    return _react2.default.createElement(
                      'li',
                      {
                        key: index,
                        className: 'level-' + item.level + (item.active ? ' active' : '') },
                      _react2.default.createElement(
                        'a',
                        { href: '#' + item.key,
                          onClick: onClick },
                        item.text
                      )
                    );
                  })
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'style',
          null,
          customCss
        )
      );
    }
  }]);
  return PresentationLayout;
}(_react.Component);

PresentationLayout.contextTypes = {
  dimensions: _propTypes2.default.object
};

PresentationLayout.childContextTypes = {
  fixedPresentationId: _propTypes2.default.string,
  onNoteContentPointerClick: _propTypes2.default.func,
  onExit: _propTypes2.default.func
};

exports.default = PresentationLayout;