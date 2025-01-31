"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref) {
  var scrollToContents = _ref.scrollToContents,
      coverImage = _ref.coverImage,
      getResourceDataUrl = _ref.getResourceDataUrl,
      bindRef = _ref.bindRef,
      metadata = _ref.metadata;
  return _react.default.createElement("header", {
    onClick: scrollToContents,
    className: "header-container ".concat(coverImage ? 'with-cover' : ''),
    ref: bindRef,
    style: {
      backgroundImage: coverImage ? "url(".concat(coverImage.filePath && typeof getResourceDataUrl === 'function' ? getResourceDataUrl(coverImage) : coverImage.base64 || coverImage.src) : undefined
    }
  }, _react.default.createElement("div", {
    className: "header-contents"
  }, _react.default.createElement("h1", {
    className: "header-story-title"
  }, _react.default.createElement("span", {
    className: "header-story-title--modifier"
  }, metadata.title || 'Quinoa story')), metadata.subtitle && _react.default.createElement("h2", {
    className: "header-story-subtitle"
  }, _react.default.createElement("span", {
    className: "header-story-subtitle--modifier"
  }, metadata.subtitle)), metadata.authors && metadata.authors.length ? _react.default.createElement("div", {
    className: "header-authors"
  }, _react.default.createElement("span", {
    className: "header-authors--modifier"
  }, metadata.authors.map(function (author) {
    return author;
  }).join(', '))) : null, metadata.edition && _react.default.createElement("h3", {
    className: "header-story-edition"
  }, _react.default.createElement("span", {
    className: "header-story-subtitle--modifier"
  }, metadata.edition))));
};

var _default = Header;
exports.default = _default;