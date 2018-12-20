"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Modal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props) {
    var _this;

    _classCallCheck(this, Modal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).call(this, props));

    _this.shouldComponentUpdate = function () {
      return true;
    };

    _this.el = document.createElement('div');
    return _this;
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // The portal element is inserted in the DOM tree after
      // the Modal's children are mounted, meaning that children
      // will be mounted on a detached DOM node. If a child
      // component requires to be attached to the DOM tree
      // immediately when mounted, for example to measure a
      // DOM node, or uses 'autoFocus' in a descendant, add
      // state to Modal and only render the children when Modal
      // is inserted in the DOM tree.
      var modalRoot = document.getElementById('modal-root');

      if (modalRoot) {
        modalRoot.appendChild(this.el);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var modalRoot = document.getElementById('modal-root');

      if (modalRoot) {
        modalRoot.removeChild(this.el);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _reactDom.default.createPortal(this.props.children, this.el);
    }
  }]);

  return Modal;
}(_react.default.Component);

var ImageBlock =
/*#__PURE__*/
function (_Component) {
  _inherits(ImageBlock, _Component);

  function ImageBlock(props) {
    var _this2;

    _classCallCheck(this, ImageBlock);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ImageBlock).call(this, props));

    _this2.shouldComponentUpdate = function () {
      return true;
    };

    _this2.render = function () {
      var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this2)),
          resource = _assertThisInitialize.props.resource,
          getResourceDataUrl = _assertThisInitialize.context.getResourceDataUrl,
          _assertThisInitialize2 = _assertThisInitialize.state.fullscreen,
          fullscreen = _assertThisInitialize2 === void 0 ? false : _assertThisInitialize2;

      var data = resource.data;
      var src;

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

      return _react.default.createElement("div", {
        className: "quinoa-contextualization block image content-image"
      }, _react.default.createElement("img", {
        onClick: handleThumbnailClick,
        src: src
      }), _react.default.createElement(Modal, null, _react.default.createElement("div", {
        onClick: handleLightboxClick,
        className: "quinoa-contextualization-lightbox-container ".concat(fullscreen ? 'visible' : 'hidden')
      }, _react.default.createElement("figure", null, _react.default.createElement("div", {
        className: "lightbox-image-container"
      }, _react.default.createElement("img", {
        src: src
      })), _react.default.createElement("figcaption", null, _react.default.createElement("h3", null, resource.metadata.title), resource.metadata.authors && resource.metadata.authors.length > 0 && _react.default.createElement("h5", null, resource.metadata.authors.join(', ')), resource.metadata.description && _react.default.createElement("div", {
        className: "lightbox-description"
      }, resource.metadata.description), resource.metadata.source && resource.metadata.source && _react.default.createElement("div", {
        className: "lightbox-source"
      }, "Source: ", resource.metadata.source))))));
    };

    _this2.state = {
      fullscreen: false
    };
    return _this2;
  }

  return ImageBlock;
}(_react.Component);

ImageBlock.contextTypes = {
  getResourceDataUrl: _propTypes.default.func
};
var _default = ImageBlock;
exports.default = _default;