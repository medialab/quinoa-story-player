'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPlayer = require('react-player');

var _reactPlayer2 = _interopRequireDefault(_reactPlayer);

var _reactMeasure = require('react-measure');

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VideoBlock = function (_Component) {
  (0, _inherits3.default)(VideoBlock, _Component);

  function VideoBlock(props) {
    (0, _classCallCheck3.default)(this, VideoBlock);

    var _this = (0, _possibleConstructorReturn3.default)(this, (VideoBlock.__proto__ || (0, _getPrototypeOf2.default)(VideoBlock)).call(this, props));

    _this.render = function () {
      var resource = _this.props.resource,
          _this$state$dimension = _this.state.dimensions,
          dimensions = _this$state$dimension === undefined ? {} : _this$state$dimension;

      return _react2.default.createElement(
        _reactMeasure2.default,
        {
          bounds: true,
          onResize: function onResize(contentRect) {
            _this.setState({ dimensions: contentRect.bounds });
          } },
        function (_ref) {
          var measureRef = _ref.measureRef;
          return _react2.default.createElement(
            'div',
            { ref: measureRef, className: 'quinoa-contextualization block video media-player-container' },
            _react2.default.createElement(_reactPlayer2.default, { width: dimensions.width, height: dimensions.height, url: resource.data.url })
          );
        }
      );
    };

    _this.state = {
      dimensions: {}
    };
    return _this;
  }

  return VideoBlock;
}(_react.Component);

exports.default = VideoBlock;