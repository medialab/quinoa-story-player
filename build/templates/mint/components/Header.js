"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref, _ref2) {
  var scrollToContents = _ref.scrollToContents,
      coverImage = _ref.coverImage,
      getResourceDataUrl = _ref.getResourceDataUrl,
      bindRef = _ref.bindRef,
      metadata = _ref.metadata,
      _ref$locale = _ref.locale,
      locale = _ref$locale === void 0 ? {} : _ref$locale,
      _ref$toc = _ref.toc,
      toc = _ref$toc === void 0 ? [] : _ref$toc;
  var InternalLinkProvider = _ref2.InternalLinkProvider;
  var firstItem = toc.length ? toc[0] : undefined;
  return _react.default.createElement("header", {
    onClick: scrollToContents,
    className: "header-container ".concat(coverImage ? 'with-cover' : ''),
    ref: bindRef,
    style: {
      backgroundImage: coverImage ? "url(".concat(coverImage.filePath && typeof getResourceDataUrl === 'function' ? getResourceDataUrl(coverImage) : coverImage.base64 || coverImage.src) : undefined
    }
  }, _react.default.createElement("div", {
    className: "header-contents"
  }, _react.default.createElement("div", {
    className: "story-global-info-container"
  }, _react.default.createElement("h1", {
    className: "header-story-title"
  }, _react.default.createElement(InternalLinkProvider, {
    to: {
      viewType: firstItem.viewType,
      viewParams: firstItem.viewParams
    }
  }, _react.default.createElement("span", {
    className: "header-story-title--modifier"
  }, metadata.title || 'Quinoa story'))), metadata.subtitle && _react.default.createElement("h2", {
    className: "header-story-subtitle"
  }, _react.default.createElement("span", {
    className: "header-story-subtitle--modifier"
  }, metadata.subtitle)), metadata.authors && metadata.authors.length ? _react.default.createElement("div", {
    className: "header-story-authors header-item-color--modifier"
  }, _react.default.createElement("span", {
    className: "header-authors--modifier"
  }, metadata.authors.map(function (author) {
    return author;
  }).join(', '))) : null, metadata.edition && _react.default.createElement("h3", {
    className: "header-story-edition"
  }, _react.default.createElement("span", {
    className: "header-story-subtitle--modifier"
  }, metadata.edition)), metadata.abstract && metadata.abstract.length ? _react.default.createElement("div", {
    className: "header-item-color--modifier"
  }, _react.default.createElement("blockquote", {
    className: "header-story-abstract"
  }, metadata.abstract)) : null, firstItem && _react.default.createElement("h2", {
    className: "first-item-link header-item-color--modifier"
  }, _react.default.createElement(InternalLinkProvider, {
    to: {
      viewType: firstItem.viewType,
      viewParams: firstItem.viewParams
    }
  }, _react.default.createElement("span", {
    className: "link-content"
  }, locale['Begin exploration'] || 'Begin exploration'))))));
};

Header.contextTypes = {
  InternalLinkProvider: _propTypes.default.func
};
var _default = Header;
exports.default = _default;