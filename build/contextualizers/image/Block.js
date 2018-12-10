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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = function (_React$Component) {
  (0, _inherits3.default)(Modal, _React$Component);

  function Modal(props) {
    (0, _classCallCheck3.default)(this, Modal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Modal.__proto__ || (0, _getPrototypeOf2.default)(Modal)).call(this, props));

    _this.shouldComponentUpdate = function () {
      return true;
    };

    _this.el = document.createElement('div');
    return _this;
  }

  (0, _createClass3.default)(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var modalRoot = document.getElementById('modal-root');
      if (modalRoot) {
        modalRoot.appendChild(this.el);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var modalRoot = document.getElementById('modal-root');
      if (modalRoot) {
        modalRoot.removeChild(this.el);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _reactDom2.default.createPortal(this.props.children, this.el);
    }
  }]);
  return Modal;
}(_react2.default.Component);

var ImageBlock = function (_Component) {
  (0, _inherits3.default)(ImageBlock, _Component);

  function ImageBlock(props) {
    (0, _classCallCheck3.default)(this, ImageBlock);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (ImageBlock.__proto__ || (0, _getPrototypeOf2.default)(ImageBlock)).call(this, props));

    _this2.shouldComponentUpdate = function () {
      return true;
    };

    _this2.render = function () {
      var resource = _this2.props.resource,
          getResourceDataUrl = _this2.context.getResourceDataUrl,
          _this2$state$fullscre = _this2.state.fullscreen,
          fullscreen = _this2$state$fullscre === undefined ? false : _this2$state$fullscre;
      var data = resource.data;

      var src = void 0;
      if (typeof getResourceDataUrl === 'function' && data.filePath) {
        src = getResourceDataUrl(data);
      } else {
        src = data.base64 || data.src;
      }

      var handleThumbnailClick = function handleThumbnailClick() {
        _this2.setState({
          fullscreen: true
        });
      };
      var handleLightboxClick = function handleLightboxClick() {
        _this2.setState({
          fullscreen: false
        });
      };
      return _react2.default.createElement(
        'div',
        { className: 'quinoa-contextualization block image content-image' },
        _react2.default.createElement('img', { onClick: handleThumbnailClick, src: src }),
        _react2.default.createElement(
          Modal,
          null,
          _react2.default.createElement(
            'div',
            { onClick: handleLightboxClick, className: 'quinoa-contextualization-lightbox-container ' + (fullscreen ? 'visible' : 'hidden') },
            _react2.default.createElement(
              'figure',
              null,
              _react2.default.createElement(
                'div',
                { className: 'lightbox-image-container' },
                _react2.default.createElement('img', { src: src })
              ),
              _react2.default.createElement(
                'figcaption',
                null,
                resource.metadata.title
              )
            )
          )
        )
      );
    };

    _this2.state = {
      fullscreen: false
    };
    return _this2;
  }

  return ImageBlock;
}(_react.Component);

ImageBlock.contextTypes = {
  getResourceDataUrl: _propTypes2.default.func
};

exports.default = ImageBlock;