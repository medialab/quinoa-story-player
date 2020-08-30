"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TableOfContents = _interopRequireDefault(require("./TableOfContents"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCurrentView = function getCurrentView(location) {
  if (location.includes('section')) {
    return 'section';
  } else if (location.includes('glossary')) {
    return 'glossary';
  } else if (location.includes('references')) {
    return 'references';
  } else return 'home';
};

var Nav = function Nav(_ref) {
  var indexOpen = _ref.indexOpen,
      inCover = _ref.inCover,
      placeholder = _ref.placeholder,
      onClickToggle = _ref.onClickToggle,
      onClickTitle = _ref.onClickTitle,
      metadata = _ref.metadata,
      toggleIndex = _ref.toggleIndex,
      scrollToElementId = _ref.scrollToElementId,
      toc = _ref.toc,
      viewType = _ref.viewType,
      location = _ref.location;
  var currentView = location ? getCurrentView(location.pathname) : viewType;
  var summary = (0, _utils.nestSummary)(toc);

  if (currentView === 'home') {
    return null;
  }

  var menuOpened = indexOpen || inCover;
  return _react.default.createElement("nav", {
    className: 'nav' + (indexOpen ? ' active' : '') + (placeholder ? ' placeholder' : '')
  }, _react.default.createElement("div", {
    className: "nav-content",
    style: {
      maxHeight: menuOpened ? '100%' : 0
    }
  }, _react.default.createElement("button", {
    className: 'index-toggle ' + (indexOpen ? 'active' : ''),
    onClick: onClickToggle
  }, _react.default.createElement("span", {
    id: "burger-menu",
    className: indexOpen ? 'open' : ''
  }, _react.default.createElement("span", null), _react.default.createElement("span", null), _react.default.createElement("span", null), _react.default.createElement("span", null))), _react.default.createElement(_TableOfContents.default, {
    onClickTitle: onClickTitle,
    metadata: metadata,
    toggleIndex: toggleIndex,
    scrollToElementId: scrollToElementId,
    toc: summary
  })));
};

var _default = Nav;
exports.default = _default;