"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _NavFooter = _interopRequireDefault(require("./NavFooter"));

var _Bibliography = _interopRequireDefault(require("../../../components/Bibliography"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var References = function References(_ref) {
  var prevItem = _ref.prevItem,
      nextItem = _ref.nextItem,
      title = _ref.title,
      props = _objectWithoutProperties(_ref, ["prevItem", "nextItem", "title"]);

  return _react.default.createElement("div", {
    className: "references-container"
  }, _react.default.createElement("h1", {
    className: "section-title"
  }, _react.default.createElement("span", {
    className: "section-title--modifier"
  }, title)), _react.default.createElement(_Bibliography.default, props), _react.default.createElement("div", {
    className: "section-footer"
  }, _react.default.createElement(_NavFooter.default, {
    prevItem: prevItem,
    nextItem: nextItem,
    title: title
  })));
};

var _default = References;
exports.default = _default;