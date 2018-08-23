'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Info = function Info(_ref) {
  var message = _ref.message,
      _ref$place = _ref.place,
      place = _ref$place === undefined ? 'right' : _ref$place;

  return _react2.default.createElement(
    'span',
    {
      className: 'info-pill',
      'data-for': 'tooltip',
      'data-html': true,
      'data-tip': message,
      'data-effect': 'float',
      'data-place': place },
    'i'
  );
};

exports.default = Info;