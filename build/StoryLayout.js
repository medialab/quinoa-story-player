'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _Renderer = require('./Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

var _Bibliography = require('./Bibliography');

var _Bibliography2 = _interopRequireDefault(_Bibliography);

var _apa = require('raw-loader!./assets/apa.csl');

var _apa2 = _interopRequireDefault(_apa);

var _englishLocale = require('raw-loader!./assets/english-locale.xml');

var _englishLocale2 = _interopRequireDefault(_englishLocale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PresentationLayout = function (_Component) {
  (0, _inherits3.default)(PresentationLayout, _Component);

  function PresentationLayout(props) {
    (0, _classCallCheck3.default)(this, PresentationLayout);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PresentationLayout.__proto__ || (0, _getPrototypeOf2.default)(PresentationLayout)).call(this, props));

    _this.onScrollUpdate = function (evt) {
      var scrollTop = evt.scrollTop;
      var headerHeight = _this.header.offsetHeight;
      var presentationEls = document.getElementsByClassName('quinoa-presentation-player');
      var presentations = [];
      var fixedPresentationId = void 0;
      var fixedPresentationHeight = void 0;
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
        // const prevScroll = this.state.scrollTop;
        if (scrollTop >= top && scrollTop <= top + height * 0.4
        // (scrollTop > prevScroll && prevScroll < top && scrollTop > top)
        // || (scrollTop >= prevScroll && scrollTop >= top && scrollTop <= top + height * 0.9)
        // || (scrollTop <= prevScroll && scrollTop >= top && scrollTop <= top + height * .5)
        ) {
            fixedPresentationId = id;
            fixedPresentationHeight = height;
          }
      }
      if (fixedPresentationId !== _this.state.fixedPresentationId) {
        _this.setState({
          fixedPresentationId: fixedPresentationId,
          fixedPresentationHeight: fixedPresentationHeight
        });
        return;
      }
      if (scrollTop < headerHeight && !_this.state.inCover) {
        _this.setState({
          inCover: true
        });
      } else if (scrollTop > headerHeight && _this.state.inCover) {
        _this.setState({
          inCover: false
        });
      }

      if (scrollTop !== _this.state.scrollTop) {
        var toc = _this.buildTOC(_this.props.story, scrollTop);
        _this.setState({
          toc: toc,
          scrollTop: scrollTop
        });
      }
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
    _this.onScrollUpdate = (0, _lodash.debounce)(_this.onScrollUpdate, 200);
    _this.buildTOC = _this.buildTOC.bind(_this);
    _this.scrollToTitle = _this.scrollToTitle.bind(_this);

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
        onExit: this.onPresentationExit
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
      this.scrollTop(this.header.offsetHeight);
      this.setState({
        inCover: false
      });
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
      if (direction === 'top') {
        this.globalScrollbar.scrollTop(top - 50);
      } else {
        var h = this.state.fixedPresentationHeight;
        this.globalScrollbar.scrollTop(top + h * 0.2);
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
    key: 'buildTOC',
    value: function buildTOC(story, scrollTop) {
      return story.sectionsOrder.map(function (sectionId, sectionIndex) {
        var section = story.sections[sectionId];
        var sectionLevel = section.metadata.level;
        var content = section.contents;
        var headers = content && content.blocks.filter(function (block) {
          return block.type.indexOf('header') === 0;
        });

        var sectionActive = void 0;
        var titleOffsetTop = void 0;
        var nextTitleOffsetTop = void 0;
        var title = void 0;
        title = document.getElementById(section.id);
        titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
        if (sectionIndex < story.sectionsOrder.length - 1) {
          var next = headers[sectionIndex + 1];
          var nextTitle = document.getElementById(next.key);
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
        var headerItems = headers.map(function (block, index) {
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
        });
        return [sectionHeader].concat((0, _toConsumableArray3.default)(headerItems));
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
          sections = _props$story.sections;
      var _state = this.state,
          inCover = _state.inCover,
          toc = _state.toc,
          indexOpen = _state.indexOpen;

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
      return _react2.default.createElement(
        _reactCiteproc.ReferencesManager,
        {
          style: _apa2.default,
          locale: _englishLocale2.default,
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
                sectionsOrder.map(function (id) {
                  return _react2.default.createElement(_SectionLayout2.default, { section: sections[id], key: id });
                }),
                _react2.default.createElement(
                  'div',
                  { className: 'notes-container' },
                  _react2.default.createElement(
                    'h3',
                    null,
                    'Notes'
                  ),
                  _react2.default.createElement(
                    'ol',
                    null,
                    notes.map(function (note) {
                      return _react2.default.createElement(
                        'li',
                        { key: note.finalOrder },
                        _react2.default.createElement(_Renderer2.default, { raw: note.editorState })
                      );
                    })
                  )
                ),
                _react2.default.createElement(_Bibliography2.default, null)
              ),
              _react2.default.createElement(
                'nav',
                {
                  className: 'nav',
                  style: {
                    position: inCover ? 'relative' : 'fixed'
                  } },
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
        )
      );
    }
  }]);
  return PresentationLayout;
}(_react.Component);

PresentationLayout.childContextTypes = {
  fixedPresentationId: _propTypes2.default.string,
  onExit: _propTypes2.default.func
};

exports.default = PresentationLayout;