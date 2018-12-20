"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactPlayer = _interopRequireDefault(require("react-player"));

var _reactMeasure = _interopRequireDefault(require("react-measure"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var VideoBlock =
/*#__PURE__*/
function (_Component) {
  _inherits(VideoBlock, _Component);

  function VideoBlock(props) {
    var _this;

    _classCallCheck(this, VideoBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VideoBlock).call(this, props));

    _this.render = function () {
      var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this)),
          resource = _assertThisInitialize.props.resource,
          _assertThisInitialize2 = _assertThisInitialize.state.dimensions,
          dimensions = _assertThisInitialize2 === void 0 ? {} : _assertThisInitialize2;

      return _react.default.createElement(_reactMeasure.default, {
        bounds: true,
        onResize: function onResize(contentRect) {
          _this.setState({
            dimensions: contentRect.bounds
          });
        }
      }, function (_ref) {
        var measureRef = _ref.measureRef;
        return _react.default.createElement("div", {
          ref: measureRef,
          className: "quinoa-contextualization block video media-player-container"
        }, _react.default.createElement(_reactPlayer.default, {
          width: dimensions.width,
          height: dimensions.height,
          url: resource.data.url
        }));
      });
    };

    _this.state = {
      dimensions: {}
    };
    return _this;
  }

  return VideoBlock;
}(_react.Component);

var _default = VideoBlock;
exports.default = _default;