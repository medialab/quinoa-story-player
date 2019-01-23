"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _InternalLinkProvider = _interopRequireDefault(require("./InternalLinkProvider"));

var _misc = require("../../../utils/misc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavFooter = function NavFooter(_ref) {
  var prevItem = _ref.prevItem,
      nextItem = _ref.nextItem,
      title = _ref.title;
  return _react.default.createElement("ul", {
    className: "nav-footer"
  }, _react.default.createElement("li", {
    className: "prev-container"
  }, prevItem && _react.default.createElement(_InternalLinkProvider.default, {
    to: prevItem
  }, "\u2190 ", (0, _misc.abbrevString)(prevItem.title))), _react.default.createElement("li", {
    className: "current-title"
  }, _react.default.createElement("h5", null, title || '')), _react.default.createElement("li", {
    className: "next-container"
  }, nextItem && _react.default.createElement(_InternalLinkProvider.default, {
    to: nextItem
  }, (0, _misc.abbrevString)(nextItem.title), " \u2192")));
};

var _default = NavFooter;
exports.default = _default;