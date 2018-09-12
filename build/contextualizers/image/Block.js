'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageBlock = function ImageBlock(_ref, _ref2) {
  var resource = _ref.resource;
  var getResourceDataUrl = _ref2.getResourceDataUrl;
  var data = resource.data;

  var src = void 0;
  if (typeof getResourceDataUrl === 'function' && data.filePath) {
    src = getResourceDataUrl(data);
  } else {
    src = data.base64 || data.src;
  }
  return _react2.default.createElement(
    'div',
    { className: 'quinoa-contextualization block image content-image' },
    _react2.default.createElement('img', { src: src })
  );
};

ImageBlock.contextTypes = {
  getResourceDataUrl: _propTypes2.default.func
};

exports.default = ImageBlock;