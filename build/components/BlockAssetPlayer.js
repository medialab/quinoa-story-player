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

var _image = require('../contextualizers/image');

var _video = require('../contextualizers/video');

var _embed = require('../contextualizers/embed');

var _table = require('../contextualizers/table');

require('react-table/react-table.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockAssetPlayer = function (_React$Component) {
  (0, _inherits3.default)(BlockAssetPlayer, _React$Component);

  function BlockAssetPlayer(props) {
    (0, _classCallCheck3.default)(this, BlockAssetPlayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BlockAssetPlayer.__proto__ || (0, _getPrototypeOf2.default)(BlockAssetPlayer)).call(this, props));

    _this.shouldComponentUpdate = function () {
      return true;
    };

    _this.onWheel = _this.onWheel.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(BlockAssetPlayer, [{
    key: 'onWheel',
    value: function onWheel(e) {
      if (this.props.fixed) {
        e.stopPropagation();
        e.preventDefault();
      }
    }


  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$resource = _props.resource,
          resource = _props$resource === undefined ? {} : _props$resource,
          _props$contextualizer = _props.contextualizer,
          contextualizer = _props$contextualizer === undefined ? {} : _props$contextualizer,
          _props$contextualizat = _props.contextualization,
          contextualization = _props$contextualizat === undefined ? {} : _props$contextualizat;
      var type = contextualizer.type;

      switch (type) {
        case 'table':
          return _react2.default.createElement(_table.Block, { resource: resource, contextualizer: contextualizer, contextualization: contextualization });
        case 'image':
          return _react2.default.createElement(_image.Block, { resource: resource, contextualizer: contextualizer, contextualization: contextualization });
        case 'video':
          return _react2.default.createElement(_video.Block, { resource: resource, contextualizer: contextualizer, contextualization: contextualization });

        case 'embed':
          return _react2.default.createElement(_embed.Block, { resource: resource, contextualizer: contextualizer, contextualization: contextualization });
        default:
          return null;
      }
    }
  }]);
  return BlockAssetPlayer;
}(_react2.default.Component);






BlockAssetPlayer.propTypes = {
  type: _propTypes2.default.string,
  data: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
  options: _propTypes2.default.object,
  fixed: _propTypes2.default.bool,
  allowInteractions: _propTypes2.default.bool,
  onExit: _propTypes2.default.func
};
BlockAssetPlayer.contextTypes = {
  dimensions: _propTypes2.default.object
};

exports.default = BlockAssetPlayer;