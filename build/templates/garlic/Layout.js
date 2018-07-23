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

var _SectionLayout = require('./SectionLayout');

var _SectionLayout2 = _interopRequireDefault(_SectionLayout);

var _Bibliography = require('../../components/Bibliography');

var _Bibliography2 = _interopRequireDefault(_Bibliography);

var _NotesContainer = require('../../components/NotesContainer');

var _NotesContainer2 = _interopRequireDefault(_NotesContainer);

var _misc = require('../../utils/misc');

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
    _x += el.offsetLeft; 
    _y += el.offsetTop; 
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

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

      if (scrollTop < headerHeight && !_this.state.inCover) {
        stateChanges = (0, _extends5.default)({}, stateChanges, {
          inCover: true
        });
      } else if (scrollTop > headerHeight && _this.state.inCover) {
        stateChanges = (0, _extends5.default)({}, stateChanges, {
          inCover: false
        });
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
        var toc = _this.buildTOC(_this.props.story, scrollTop);
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
      var offset = getOffset(el);
      var top = offset.top - _this.context.dimensions.height / 2;
      _this.scrollTop(top);
    };

    _this.scrollToContents = _this.scrollToContents.bind(_this);
    _this.scrollToCover = _this.scrollToCover.bind(_this);
    _this.handleSpringUpdate = _this.handleSpringUpdate.bind(_this);
    _this.scrollTop = _this.scrollTop.bind(_this);
    _this.onScrollUpdate = (0, _lodash.debounce)(_this.onScrollUpdate, 30);
    _this.buildTOC = _this.buildTOC.bind(_this);
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
        onGlossaryMentionClick: this.onGlossaryMentionClick
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
            coverImage: (0, _misc.buildCoverImage)(_this2.props.story)
          });
        }
      });
    }

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.story !== nextProps.story) {
        this.setState({
          glossary: (0, _misc.buildGlossary)(nextProps.story),
          citations: (0, _misc.buildCitations)(nextProps.story),
          coverImage: (0, _misc.buildCoverImage)(nextProps.story)
        });
      }
    }


  }, {
    key: 'buildTOC',
    value: function buildTOC(story, scrollTop) {
      return story.sectionsOrder.map(function (sectionId, sectionIndex) {
        var section = story.sections[sectionId];
        var sectionLevel = section.metadata.level + 1;

        var sectionActive = void 0;
        var nextTitleOffsetTop = void 0;
        var title = document.getElementById(section.id);
        if (!title) {
          return undefined;
        }
        var titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
        if (sectionIndex < story.sectionsOrder.length - 1) {
          var next = story.sectionsOrder[sectionIndex + 1];
          var nextTitle = document.getElementById(next);
          if (nextTitle) {
            nextTitleOffsetTop = nextTitle.offsetTop + title.offsetParent.offsetParent.offsetTop;
          }
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

        return [sectionHeader];
      }
      ).filter(function (el) {
        return el !== undefined;
      })
      .reduce(function (result, ar) {
        return [].concat((0, _toConsumableArray3.default)(result), (0, _toConsumableArray3.default)(ar));
      }, []);
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
      var offset = getOffset(el);
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


  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props$story = this.props.story,
          metadata = _props$story.metadata,
          sectionsOrder = _props$story.sectionsOrder,
          sections = _props$story.sections,
          _props$story$settings = _props$story.settings,
          settings = _props$story$settings === undefined ? {} : _props$story$settings;
      var _state = this.state,
          inCover = _state.inCover,
          toc = _state.toc,
          indexOpen = _state.indexOpen,
          glossary = _state.glossary,
          citations = _state.citations,
          coverImage = _state.coverImage;
      var _context = this.context,
          dimensions = _context.dimensions,
          getResourceDataUrl = _context.getResourceDataUrl;

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
      var onClickToggle = function onClickToggle() {
        return _this3.toggleIndex();
      };
      var onClickTitle = function onClickTitle() {
        _this3.scrollToContents();
        _this3.toggleIndex();
      };
      var notesPosition = settings.options && settings.options.notesPosition || 'foot';
      var citationLocale = settings.citationLocale && settings.citationLocale.data || _englishLocale2.default;
      var citationStyle = settings.citationStyle && settings.citationStyle.data || _apa2.default;
      var bindGlobalScrollbarRef = function bindGlobalScrollbarRef(scrollbar) {
        _this3.globalScrollbar = scrollbar;
      };
      var bindHeaderRef = function bindHeaderRef(header) {
        _this3.header = header;
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
              onUpdate: this.onScrollUpdate,
              universal: true },
            _react2.default.createElement('header', {
              onClick: this.scrollToContents,
              className: 'header',
              ref: bindHeaderRef,
              style: {
                backgroundImage: coverImage ? 'url(' + (coverImage.filePath ? getResourceDataUrl(coverImage) : coverImage.base64) + ')' : undefined,
                height: coverImage ? '100%' : '0'
              } }),
            _react2.default.createElement(
              'section',
              {
                className: 'body-wrapper' },
              _react2.default.createElement(
                'section',
                { className: 'contents-wrapper' },
                _react2.default.createElement(
                  'div',
                  {
                    className: 'header-titles' },
                  _react2.default.createElement(
                    'h1',
                    null,
                    metadata.title || 'Quinoa story'
                  ),
                  metadata.subtitle && _react2.default.createElement(
                    'h2',
                    { className: 'header-subtitle' },
                    metadata.subtitle
                  ),
                  metadata.authors && metadata.authors.length ? _react2.default.createElement(
                    'div',
                    { className: 'authors' },
                    metadata.authors.map(function (author) {
                      return author;
                    }).join(', ')
                  ) : null
                ),
                sectionsOrder.map(function (thatId) {
                  return _react2.default.createElement(_SectionLayout2.default, { section: finalSections[thatId], key: thatId });
                }),
                notes && notes.length ? _react2.default.createElement(_NotesContainer2.default, {
                  notes: notes,
                  onNotePointerClick: this.onNotePointerClick,
                  notesPosition: notesPosition }) : null,
                citations && citations.citationItems && (0, _keys2.default)(citations.citationItems).length ? _react2.default.createElement(_Bibliography2.default, null) : null,
                glossary && glossary.length ? _react2.default.createElement(
                  'div',
                  { className: 'glossary-container' },
                  _react2.default.createElement(
                    'h2',
                    null,
                    'Glossary'
                  ),
                  _react2.default.createElement(
                    'ul',
                    { className: 'glossary-mentions-container' },
                    glossary.map(function (entry, index) {
                      var entryName = entry.resource.data.name;
                      return _react2.default.createElement(
                        'li',
                        { key: index, id: 'glossary-entry-' + entry.resource.id },
                        _react2.default.createElement(
                          'h3',
                          null,
                          entryName,
                          ' ',
                          _react2.default.createElement(
                            'i',
                            null,
                            '(',
                            entry.mentions.map(function (mention, count) {
                              var target = 'glossary-mention-' + mention.id;
                              var onClick = function onClick(e) {
                                e.preventDefault();
                                _this3.scrollToElementId(target);
                              };
                              return _react2.default.createElement(
                                'a',
                                {
                                  key: mention.id,
                                  onClick: onClick,
                                  id: 'glossary-mention-backlink-' + mention.id,
                                  href: '#' + target },
                                _react2.default.createElement(
                                  'span',
                                  { className: 'link-content' },
                                  count + 1
                                )
                              );
                            }).reduce(function (prev, curr) {
                              return [prev, ', ', curr];
                            }),
                            ')'
                          )
                        ),
                        entry.resource.metadata.description && _react2.default.createElement(
                          'p',
                          null,
                          entry.resource.metadata.description
                        )
                      );
                    })
                  )
                ) : null
              )
            )
          ),
          _react2.default.createElement(
            'nav',
            {
              className: 'nav' + (indexOpen ? ' active' : '') + (inCover ? '' : ' fixed'),
              style: {
                height: dimensions && dimensions.height
              } },
            _react2.default.createElement(
              'div',
              {
                className: 'nav-content',
                style: {
                  maxHeight: indexOpen || inCover ? '100%' : 0
                } },
              _react2.default.createElement(
                'button',
                {
                  className: 'index-toggle ' + (indexOpen || inCover ? 'active' : ''),
                  style: {
                    opacity: inCover ? 0 : 1,
                    maxHeight: inCover ? 0 : '3em',
                    position: indexOpen ? 'relative' : 'absolute',
                    left: indexOpen ? 0 : undefined,
                    top: indexOpen ? 0 : undefined
                  },
                  onClick: onClickToggle },
                _react2.default.createElement(
                  'span',
                  { id: 'burger-menu', className: indexOpen || inCover ? 'open' : '' },
                  _react2.default.createElement('span', null),
                  _react2.default.createElement('span', null),
                  _react2.default.createElement('span', null),
                  _react2.default.createElement('span', null)
                )
              ),
              _react2.default.createElement(
                'ul',
                {
                  className: 'table-of-contents' },
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'h2',
                    {
                      className: 'menu-title',
                      onClick: onClickTitle },
                    metadata.title || 'Quinoa story'
                  )
                ),
                toc && toc.map(function (item, index) {
                  var onClick = function onClick(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    _this3.scrollToElementId(item.key);
                    _this3.toggleIndex();
                  };
                  return _react2.default.createElement(
                    'li',
                    {
                      key: index,
                      className: 'level-' + item.level + (item.active ? ' active' : '') },
                    _react2.default.createElement(
                      'a',
                      {
                        href: '#' + item.key,
                        onClick: onClick },
                      _react2.default.createElement(
                        'span',
                        { className: 'link-content' },
                        item.text || 'Untitled section'
                      )
                    )
                  );
                })
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
  onGlossaryMentionClick: _propTypes2.default.func
};

exports.default = GarlicLayout;