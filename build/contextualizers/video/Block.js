'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPlayer = require('react-player');

var _reactPlayer2 = _interopRequireDefault(_reactPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VideoBlock = function VideoBlock(_ref) {
  var resource = _ref.resource;

  return _react2.default.createElement(
    'div',
    { className: 'quinoa-contextualization block video media-player-container' },
    _react2.default.createElement(_reactPlayer2.default, { url: resource.data.url })
  );
};
exports.default = VideoBlock;