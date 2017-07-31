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

var _reactDisqusThread = require('react-disqus-thread');

var _reactDisqusThread2 = _interopRequireDefault(_reactDisqusThread);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactDisqusWrapper = function (_Component) {
  (0, _inherits3.default)(ReactDisqusWrapper, _Component);

  function ReactDisqusWrapper() {
    (0, _classCallCheck3.default)(this, ReactDisqusWrapper);
    return (0, _possibleConstructorReturn3.default)(this, (ReactDisqusWrapper.__proto__ || (0, _getPrototypeOf2.default)(ReactDisqusWrapper)).apply(this, arguments));
  }

  (0, _createClass3.default)(ReactDisqusWrapper, [{
    key: 'shouldComponentUpdate',


    value: function shouldComponentUpdate() {
      return false;
    }


  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          shortname = _props.shortname,
          identifier = _props.identifier,
          title = _props.title,
          url = _props.url,
          onNewComment = _props.onNewComment;


      var handleNewComment = function handleNewComment(comment) {
        if (onNewComment && typeof onNewComment === 'function') {
          onNewComment(comment);
        }
      };

      return _react2.default.createElement(_reactDisqusThread2.default, {
        shortname: shortname,
        identifier: identifier,
        title: title,
        url: url,
        onNewComment: handleNewComment });
    }
  }]);
  return ReactDisqusWrapper;
}(_react.Component);



ReactDisqusWrapper.propTypes = {
  shortname: _propTypes2.default.string,
  identifier: _propTypes2.default.string,
  title: _propTypes2.default.string,
  url: _propTypes2.default.string,
  onNewComment: _propTypes2.default.func
};

exports.default = ReactDisqusWrapper;