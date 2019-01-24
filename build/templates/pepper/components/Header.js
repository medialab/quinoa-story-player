"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TableOfContents = _interopRequireDefault(require("./TableOfContents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref) {
  var scrollToContents = _ref.scrollToContents,
      coverImage = _ref.coverImage,
      getResourceDataUrl = _ref.getResourceDataUrl,
      bindRef = _ref.bindRef,
      metadata = _ref.metadata,
      _ref$locale = _ref.locale,
      locale = _ref$locale === void 0 ? {} : _ref$locale,
      toc = _ref.toc;
  return _react.default.createElement("header", {
    onClick: scrollToContents,
    className: "header-container ".concat(coverImage ? 'with-cover' : ''),
    ref: bindRef,
    style: {
      backgroundImage: coverImage ? "url(".concat(coverImage.filePath ? getResourceDataUrl(coverImage) : coverImage.base64) : undefined
    }
  }, _react.default.createElement("div", {
    className: "header-contents"
  }, _react.default.createElement("div", {
    className: "story-global-info-container"
  }, _react.default.createElement("h1", {
    className: "header-story-title"
  }, _react.default.createElement("span", {
    className: "header-story-title--modifier"
  }, metadata.title || 'Quinoa story')), metadata.subtitle && _react.default.createElement("h2", {
    className: "header-story-subtitle"
  }, _react.default.createElement("span", {
    className: "header-story-subtitle--modifier"
  }, metadata.subtitle)), metadata.authors && metadata.authors.length ? _react.default.createElement("div", {
    className: "header-story-authors"
  }, _react.default.createElement("span", {
    className: "header-authors--modifier"
  }, metadata.authors.map(function (author) {
    return author;
  }).join(', '))) : null, metadata.abstract && metadata.abstract.length ? _react.default.createElement("blockquote", {
    className: "header-story-abstract"
  }, metadata.abstract) : null), _react.default.createElement("div", {
    className: "header-toc-container"
  }, _react.default.createElement("h2", {
    className: "toc-title"
  }, locale['Table of contents'] || 'Table of contents'), _react.default.createElement(_TableOfContents.default, {
    toc: toc
  }))));
};

var _default = Header;
exports.default = _default;