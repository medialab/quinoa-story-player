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

var _reactMediaPlayer = require('react-media-player');

var _quinoaPresentationPlayer = require('quinoa-presentation-player');

var _quinoaPresentationPlayer2 = _interopRequireDefault(_quinoaPresentationPlayer);

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

      if (type === 'table' && data.url) {
        this.setState({ loading: true });
        (0, _axios.get)(data.url).then(function (res) {
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
      if (type === 'data-presentation' && data.url) {
        (0, _axios.get)(data.url).then(function (res) {
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
          data = _props2.data,
          options = _props2.options,
          fixed = _props2.fixed,
          allowInteractions = _props2.allowInteractions,
          onExit = _props2.onExit;
      var dimensions = this.context.dimensions;

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
          var src = data.base64 || data.src || data.url;
          return _react2.default.createElement('img', { src: src });
        case 'video':
          return _react2.default.createElement(
            _reactMediaPlayer.Media,
            null,
            _react2.default.createElement(_reactMediaPlayer.Player, { src: data.url })
          );
        case 'data-presentation':
          var usableData = data.json || this.state.data;
          return usableData ? _react2.default.createElement(_quinoaPresentationPlayer2.default, {
            presentation: usableData,
            template: options && options.template,
            onWheel: this.onWheel,
            onExit: onExit,
            style: {
              position: fixed ? 'fixed' : 'absolute',
              left: fixed ? dimensions.left : '0',
              top: fixed ? dimensions.top : '0',
              width: fixed ? dimensions.width : '',
              height: fixed ? dimensions.height : '',
              pointerEvents: allowInteractions ? 'all' : 'none'
            } }) : null;
        case 'embed':
          return _react2.default.createElement('div', {
            className: 'embed-container',
            dangerouslySetInnerHTML: {
              __html: data
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
  dimensions: _propTypes2.default.object
};

exports.default = BlockAssetPlayer;