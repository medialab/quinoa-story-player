'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Renderer = require('./Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PresentationLayout = function (_Component) {
  (0, _inherits3.default)(PresentationLayout, _Component);

  function PresentationLayout(props) {
    (0, _classCallCheck3.default)(this, PresentationLayout);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PresentationLayout.__proto__ || (0, _getPrototypeOf2.default)(PresentationLayout)).call(this, props));

    _this.scrollToContents = _this.scrollToContents.bind(_this);
    _this.scrollToCover = _this.scrollToCover.bind(_this);
    _this.handleSpringUpdate = _this.handleSpringUpdate.bind(_this);
    _this.scrollTop = _this.scrollTop.bind(_this);
    _this.onScrollUpdate = _this.onScrollUpdate.bind(_this);
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
        this.globalScrollbar.scrollTop(top + 50);
      }
    }
  }, {
    key: 'onScrollUpdate',
    value: function onScrollUpdate(evt) {
      var scrollTop = evt.scrollTop;
      var headerHeight = this.header.offsetHeight;
      var presentationEls = document.getElementsByClassName('quinoa-presentation-player');
      var presentations = [];
      var fixedPresentationId = void 0;
      var fixedPresentationHeight = void 0;
      for (var i = 0; i < presentationEls.length; i++) {
        var presentation = presentationEls[i].parentNode;
        var id = presentation.getAttribute('id');
        var top = presentation.offsetTop + this.header.offsetHeight;
        var height = presentation.offsetHeight;
        presentations.push({
          id: id,
          top: top,
          height: height
        });
        var prevScroll = this.state.scrollTop;
        if (scrollTop > prevScroll && prevScroll < top && scrollTop > top || scrollTop > prevScroll && scrollTop >= top && scrollTop <= top + height * 0.9 || scrollTop <= prevScroll && scrollTop >= top && scrollTop <= top + 40) {
          fixedPresentationId = id;
          fixedPresentationHeight = height;
        }
      }
      if (fixedPresentationId !== this.state.fixedPresentationId) {
        this.setState({
          fixedPresentationId: fixedPresentationId,
          fixedPresentationHeight: fixedPresentationHeight
        });
      }
      if (scrollTop < headerHeight && !this.state.inCover) {
        this.setState({
          inCover: true
        });
      } else if (scrollTop > headerHeight && this.state.inCover) {
        this.setState({
          inCover: false
        });
      }

      if (scrollTop !== this.state.scrollTop) {
        var toc = this.buildTOC(this.props.story.content, scrollTop);
        this.setState({
          toc: toc,
          scrollTop: scrollTop
        });
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
    value: function buildTOC(content, scrollTop) {
      var headers = content && content.blocks.filter(function (block) {
        return block.type.indexOf('header') === 0;
      });
      return headers.map(function (block, index) {
        var type = block.type,
            text = block.text,
            key = block.key;

        var levelStr = type.split('header-').pop();
        var level = void 0;
        switch (levelStr) {
          case 'one':
            level = 1;
            break;
          case 'two':
            level = 2;
            break;
          case 'three':
            level = 3;
            break;
          case 'four':
            level = 4;
            break;
          case 'five':
            level = 5;
            break;
          case 'six':
          default:
            level = 6;
            break;
        }

        var title = document.getElementById(key);
        var titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
        var nextTitleOffsetTop = void 0;
        if (index < headers.length - 1) {
          var next = headers[index + 1];
          var nextTitle = document.getElementById(next.key);
          nextTitleOffsetTop = nextTitle.offsetTop + title.offsetParent.offsetParent.offsetTop;
        }
        var active = void 0;
        if (titleOffsetTop <= scrollTop + window.innerHeight / 2 && (nextTitleOffsetTop === undefined || nextTitleOffsetTop >= scrollTop)) {
          active = true;
        }
        return {
          level: level,
          text: text,
          key: key,
          active: active
        };
      });
    }
  }, {
    key: 'scrollToTitle',
    value: function scrollToTitle(id) {
      var title = document.getElementById(id);
      this.scrollTop(title.offsetTop + title.offsetParent.offsetParent.offsetTop);
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
          content = _props$story.content;
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

      return _react2.default.createElement(
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
              _react2.default.createElement(_Renderer2.default, { raw: content })
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