"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TableOfContents = _interopRequireDefault(require("./TableOfContents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Nav = function Nav(_ref) {
  var indexOpen = _ref.indexOpen,
      inCover = _ref.inCover,
      coverImage = _ref.coverImage,
      onClickToggle = _ref.onClickToggle,
      onClickTitle = _ref.onClickTitle,
      metadata = _ref.metadata,
      toggleIndex = _ref.toggleIndex,
      scrollToElementId = _ref.scrollToElementId,
      toc = _ref.toc;
  var menuOpened = indexOpen || inCover;
  return _react.default.createElement("nav", {
    className: 'nav' + (indexOpen ? ' active' : '') + (inCover ? '' : ' fixed'),
    style: {
      position: inCover && coverImage ? 'absolut' : 'absolute',
      left: 0 // opacity: isDisplayed ? 1 : 0,
      // pointerEvents: isDisplayed ? undefined : 'none',
      // marginTop: (inCover && coverImage) || !inCover ? 0 : 0,
      // height: !(inCover && dimensions.width <= 700) ? dimensions && dimensions.height : 0,

    }
  }, _react.default.createElement("div", {
    className: "nav-content",
    style: {
      maxHeight: menuOpened ? '100%' : 0
    }
  }, _react.default.createElement("button", {
    className: 'index-toggle ' + (menuOpened ? 'active' : ''),
    style: {
      opacity: inCover ? 0 : 1
    },
    onClick: onClickToggle
  }, _react.default.createElement("span", {
    id: "burger-menu",
    className: menuOpened ? 'open' : ''
  }, _react.default.createElement("span", null), _react.default.createElement("span", null), _react.default.createElement("span", null), _react.default.createElement("span", null))), _react.default.createElement(_TableOfContents.default, {
    onClickTitle: onClickTitle,
    metadata: metadata,
    toggleIndex: toggleIndex,
    scrollToElementId: scrollToElementId,
    toc: toc
  })));
};

var _default = Nav;
exports.default = _default;