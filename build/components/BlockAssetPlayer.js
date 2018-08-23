'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _reactPlayer = require('react-player');

var _reactPlayer2 = _interopRequireDefault(_reactPlayer);

var _reactTable = require('react-table');

var _reactTable2 = _interopRequireDefault(_reactTable);

var _axios = require('axios');

require('react-table/react-table.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockAssetPlayer = function (_React$Component) {
  (0, _inherits3.default)(BlockAssetPlayer, _React$Component);

  function BlockAssetPlayer(props) {
    (0, _classCallCheck3.default)(this, BlockAssetPlayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BlockAssetPlayer.__proto__ || (0, _getPrototypeOf2.default)(BlockAssetPlayer)).call(this, props));

    _this.state = {
      data: undefined,
      loading: false,
      columns: []
    };
    _this.onWheel = _this.onWheel.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(BlockAssetPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          type = _props.type,
          data = _props.data;
      var getResourceDataUrl = this.context.getResourceDataUrl;

      if (type === 'table' && data.filePath && typeof getResourceDataUrl === 'function') {
        this.setState({ loading: true });
        (0, _axios.get)(getResourceDataUrl(data)).then(function (res) {
          var columns = (0, _keys2.default)(res.data[0]).map(function (key) {
            return {
              Header: key,
              accessor: key
            };
          });
          _this2.setState({
            loading: false,
            data: res.data,
            columns: columns
          });
        });
      }
      if (type === 'data-presentation' && data.filePath && typeof getResourceDataUrl === 'function') {
        (0, _axios.get)(getResourceDataUrl(data)).then(function (res) {
          _this2.setState({
            data: res.data
          });
        });
      }
    }
  }, {
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
      var _props2 = this.props,
          type = _props2.type,
          data = _props2.data;
      var getResourceDataUrl = this.context.getResourceDataUrl;

      switch (type) {
        case 'table':
          var columns = void 0;
          if (data.json) {
            columns = (0, _keys2.default)(data.json[0]).map(function (key) {
              return {
                Header: key,
                accessor: key
              };
            });
          }
          return _react2.default.createElement(_reactTable2.default, {
            data: data.json || this.state.data,
            columns: columns || this.state.columns,
            loading: this.state.loading });
        case 'image':
          var src = void 0;
          if (typeof getResourceDataUrl === 'function' && data.filePath) {
            src = getResourceDataUrl(data);
          } else {
            src = data.base64 || data.src;
          }
          return _react2.default.createElement('img', { className: 'content-image', src: src });
        case 'video':
          return _react2.default.createElement(
            'div',
            { className: 'media-player-container' },
            _react2.default.createElement(_reactPlayer2.default, { url: data.url })
          );
        case 'embed':
          return _react2.default.createElement('div', {
            className: 'embed-container',
            dangerouslySetInnerHTML: {
              __html: data.html
            } });
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
  dimensions: _propTypes2.default.object,
  getResourceDataUrl: _propTypes2.default.func
};

exports.default = BlockAssetPlayer;