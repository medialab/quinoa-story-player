'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _quinoaPresentationPlayer = require('quinoa-presentation-player');

var _quinoaPresentationPlayer2 = _interopRequireDefault(_quinoaPresentationPlayer);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Table, _Component);

  function Table(props) {
    (0, _classCallCheck3.default)(this, Table);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      data: undefined,
      loading: false,
      columns: []
    };
    return _this;
  }

  (0, _createClass3.default)(Table, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateData(this.props);
    }
  }]);
  return Table;
}(_react.Component), _class.contextTypes = {
  getResourceDataUrl: _propTypes2.default.func
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.componentWillReceiveProps = function (nextProps) {
    if (_this2.props.resource !== nextProps.resource) {
      _this2.updateData(nextProps);
    }
  };

  this.updateData = function (props) {
    var getResourceDataUrl = _this2.context.getResourceDataUrl;
    var data = props.resource.data;

    if (data.filePath && typeof getResourceDataUrl === 'function') {
      _this2.setState({ loading: true });
      (0, _axios2.default)(getResourceDataUrl(data)).then(function (res) {
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
  };

  this.render = function () {
    var _props = _this2.props,
        _props$resource = _props.resource,
        resource = _props$resource === undefined ? {} : _props$resource,
        contextualizer = _props.contextualizer,
        onWheel = _props.onWheel,
        onExit = _props.onExit,
        style = _props.style,
        loading = _this2.state.loading;
    var data = resource.data;
    var options = contextualizer.options;

    var usableData = data.json || _this2.state.data;
    return usableData && !loading ? _react2.default.createElement(_quinoaPresentationPlayer2.default, {
      presentation: usableData,
      template: options && options.template,
      onWheel: onWheel,
      onExit: onExit,
      style: style }) : null;
  };
}, _temp);
exports.default = Table;