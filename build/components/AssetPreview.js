'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMediaPlayer = require('react-media-player');

var _quinoaPresentationPlayer = require('quinoa-presentation-player');

var _quinoaPresentationPlayer2 = _interopRequireDefault(_quinoaPresentationPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint react/no-danger : 0 */
var AssetPreview = function AssetPreview(_ref, context) {
  var type = _ref.type,
      resource = _ref.resource,
      options = _ref.options,
      fixed = _ref.fixed,
      allowInteractions = _ref.allowInteractions,
      onExit = _ref.onExit;

  var dimensions = context.dimensions;
  switch (type) {
    case 'image':
      // future-proofing possible externally linked images
      var src = resource.data.base64 || resource.data.src || resource.data.url;
      return _react2.default.createElement('img', { src: src });
    case 'video':
      return _react2.default.createElement(
        _reactMediaPlayer.Media,
        null,
        _react2.default.createElement(_reactMediaPlayer.Player, { src: resource.data.url })
      );
    case 'data-presentation':
      var onWheel = function onWheel(e) {
        if (fixed) {
          e.stopPropagation();
          e.preventDefault();
        }
      };
      return _react2.default.createElement(_quinoaPresentationPlayer2.default, {
        presentation: resource.data,
        template: options && options.template,
        onWheel: onWheel,
        onExit: onExit,
        style: {
          position: fixed ? 'fixed' : 'absolute',
          left: fixed ? dimensions.left : '0',
          top: fixed ? dimensions.top : '0',
          width: fixed ? dimensions.width : '',
          height: fixed ? dimensions.height : '',
          pointerEvents: allowInteractions ? 'all' : 'none'
        } });
    case 'embed':
      return _react2.default.createElement('div', {
        dangerouslySetInnerHTML: {
          __html: resource.data
        } });
    default:
      return null;
  }
};

AssetPreview.contextTypes = {
  dimensions: _propTypes2.default.object
};

exports.default = AssetPreview;