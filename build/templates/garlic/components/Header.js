'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref) {
  var scrollToContents = _ref.scrollToContents,
      coverImage = _ref.coverImage,
      getResourceDataUrl = _ref.getResourceDataUrl,
      bindRef = _ref.bindRef,
      metadata = _ref.metadata;

  return _react2.default.createElement(
    'header',
    {
      onClick: scrollToContents,
      className: 'header-container ' + (coverImage ? 'with-cover' : ''),
      ref: bindRef,
      style: {
        backgroundImage: coverImage ? 'url(' + (coverImage.filePath ? getResourceDataUrl(coverImage) : coverImage.base64) : undefined
      } },
    _react2.default.createElement(
      'div',
      {
        className: 'header-contents' },
      _react2.default.createElement(
        'h1',
        { className: 'header-story-title' },
        metadata.title || 'Quinoa story'
      ),
      metadata.subtitle && _react2.default.createElement(
        'h2',
        { className: 'header-story-subtitle' },
        metadata.subtitle
      ),
      metadata.authors && metadata.authors.length ? _react2.default.createElement(
        'div',
        { className: 'header-authors' },
        metadata.authors.map(function (author) {
          return author;
        }).join(', ')
      ) : null
    )
  );
};

exports.default = Header;