'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMediaPlayer = require('react-media-player');

var _quinoaPresentationPlayer = require('quinoa-presentation-player');

var _quinoaPresentationPlayer2 = _interopRequireDefault(_quinoaPresentationPlayer);

require('./AssetPreview.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint react/no-danger : 0 */
var AssetPreview = function AssetPreview(_ref) {
  var type = _ref.type,
      data = _ref.data;

  switch (type) {
    case 'image':
      return _react2.default.createElement('img', { src: data });
    case 'video':
      return _react2.default.createElement(
        _reactMediaPlayer.Media,
        null,
        _react2.default.createElement(_reactMediaPlayer.Player, { src: data })
      );
    case 'data-presentation':
      return _react2.default.createElement(_quinoaPresentationPlayer2.default, {
        presentation: data });
    case 'embed':
      return _react2.default.createElement('div', {
        dangerouslySetInnerHTML: {
          __html: data
        } });
    default:
      return null;
  }
};

exports.default = AssetPreview;