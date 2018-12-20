"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _image = require("../contextualizers/image");

var _video = require("../contextualizers/video");

var _embed = require("../contextualizers/embed");

var _table = require("../contextualizers/table");

require("react-table/react-table.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 * Renders a block asset player as a stateful component
 * @param {object} props -
 * @param {string} props.type - the type of asset to display
 * @param {object} props.data - the data to consume for displaying the asset
 * @param {object} props.options - specific display options
 * @param {boolean} props.fixed - whether the asset should be displayed full screen
 * @param {boolean} props.allowInteractions - whether to allow interactions with the asset
 * @param {function} props.onInteractions - callbacks when interacting with an asset
 * @param {object} context -
 * @param {object} context.dimensions - the dimensions of the root component
 * @return {ReactElement} component - the component
 */
var BlockAssetPlayer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BlockAssetPlayer, _React$Component);

  function BlockAssetPlayer(props) {
    var _this;

    _classCallCheck(this, BlockAssetPlayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BlockAssetPlayer).call(this, props));

    _this.shouldComponentUpdate = function () {
      return true;
    };

    _this.onWheel = _this.onWheel.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(BlockAssetPlayer, [{
    key: "onWheel",
    value: function onWheel(e) {
      if (this.props.fixed) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
    /**
    * Investigate needed: wrap switch render inside a div will cause an issue on QuinoaPresentationPlayer lost pointer interaction
    */

  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$resource = _this$props.resource,
          resource = _this$props$resource === void 0 ? {} : _this$props$resource,
          _this$props$contextua = _this$props.contextualizer,
          contextualizer = _this$props$contextua === void 0 ? {} : _this$props$contextua,
          _this$props$contextua2 = _this$props.contextualization,
          contextualization = _this$props$contextua2 === void 0 ? {} : _this$props$contextua2;
      var type = contextualizer.type;

      switch (type) {
        case 'table':
          return _react.default.createElement(_table.Block, {
            resource: resource,
            contextualizer: contextualizer,
            contextualization: contextualization
          });

        case 'image':
          return _react.default.createElement(_image.Block, {
            resource: resource,
            contextualizer: contextualizer,
            contextualization: contextualization
          });

        case 'video':
          return _react.default.createElement(_video.Block, {
            resource: resource,
            contextualizer: contextualizer,
            contextualization: contextualization
          });

        case 'embed':
          return _react.default.createElement(_embed.Block, {
            resource: resource,
            contextualizer: contextualizer,
            contextualization: contextualization
          });
        // case 'data-presentation':
        //   return (
        //     <DataPresentation
        //       resource={resource}
        //       contextualizer={contextualizer}
        //       contextualization={contextualization}
        //       onWheel={this.onWheel}
        //       onExit={onExit}
        //       style={{
        //           position: fixed ? 'fixed' : 'absolute',
        //           left: fixed ? dimensions.left : '0',
        //           top: fixed ? dimensions.top : '0',
        //           width: fixed ? dimensions.width : '',
        //           height: fixed ? dimensions.height : '',
        //           pointerEvents: allowInteractions ? 'all' : 'none'
        //       }}
        //     />
        //   );

        default:
          return null;
      }
    }
  }]);

  return BlockAssetPlayer;
}(_react.default.Component);
/**
 * Component's properties types
 */


BlockAssetPlayer.propTypes = {
  type: _propTypes.default.string,
  data: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),
  options: _propTypes.default.object,
  fixed: _propTypes.default.bool,
  allowInteractions: _propTypes.default.bool,
  onExit: _propTypes.default.func
};
/**
 * Component's context used properties
 */

BlockAssetPlayer.contextTypes = {
  dimensions: _propTypes.default.object
};
var _default = BlockAssetPlayer;
exports.default = _default;