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

    _this.state = {
      inCover: true,
      toc: [],
      scrollTop: 0
    };
    return _this;
  }

  (0, _createClass3.default)(PresentationLayout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.springSystem = new _rebound.SpringSystem();
      this.spring = this.springSystem.createSpring();
      this.spring.addListener({ onSpringUpdate: this.handleSpringUpdate });
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
    key: 'onScrollUpdate',
    value: function onScrollUpdate(evt) {
      var scrollTop = evt.scrollTop;
      var headerHeight = this.header.offsetHeight;
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
          toc = _state.toc;

      var bindGlobalScrollbarRef = function bindGlobalScrollbarRef(scrollbar) {
        _this2.globalScrollbar = scrollbar;
      };
      var bindHeaderRef = function bindHeaderRef(header) {
        _this2.header = header;
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
              _react2.default.createElement(
                'ul',
                { className: 'table-of-contents' },
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

exports.default = PresentationLayout;