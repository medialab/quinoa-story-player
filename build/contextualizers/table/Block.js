"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTable = _interopRequireDefault(require("react-table"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

// import tableStyles from '!raw-loader!sass-loader!react-table/react-table.css'
// import tableStyles from '!raw-loader!sass-loader!react-table/react-table.css'
var Table =
/*#__PURE__*/
function (_Component) {
  _inherits(Table, _Component);

  function Table(_props) {
    var _this;

    _classCallCheck(this, Table);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Table).call(this, _props));

    _this.componentWillReceiveProps = function (nextProps) {
      if (_this.props.resource !== nextProps.resource) {
        _this.updateData(nextProps);
      }
    };

    _this.updateData = function (props) {
      var getResourceDataUrl = _this.context.getResourceDataUrl;
      var data = props.resource.data;

      if (data.filePath && typeof getResourceDataUrl === 'function') {
        _this.setState({
          loading: true
        });

        (0, _axios.default)(getResourceDataUrl(data)).then(function (res) {
          var columns = Object.keys(res.data[0]).map(function (key) {
            return {
              Header: key,
              accessor: key
            };
          });

          _this.setState({
            loading: false,
            data: res.data,
            columns: columns
          });
        });
      }
    };

    _this.render = function () {
      var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this)),
          _assertThisInitialize2 = _assertThisInitialize.props.resource,
          resource = _assertThisInitialize2 === void 0 ? {} : _assertThisInitialize2,
          loading = _assertThisInitialize.state.loading;

      var data = resource.data;
      var columns;

      if (data.json) {
        columns = Object.keys(data.json[0]).map(function (key) {
          return {
            Header: key,
            accessor: key
          };
        });
      }

      return [_react.default.createElement(_reactTable.default, {
        key: 1,
        className: "quinoa-contextualization block table",
        data: data.json || _this.state.data,
        columns: columns || _this.state.columns,
        loading: loading
      })];
    };

    _this.state = {
      data: undefined,
      loading: false,
      columns: []
    };
    return _this;
  }

  _createClass(Table, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateData(this.props);
    }
  }]);

  return Table;
}(_react.Component);

exports.default = Table;
Table.contextTypes = {
  getResourceDataUrl: _propTypes.default.func
};