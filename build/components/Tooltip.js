"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tooltip = function Tooltip(_ref) {
  var children = _ref.children,
      content = _ref.content,
      html = _ref.html;
  return _react.default.createElement("div", {
    className: "tooltip"
  }, children, _react.default.createElement("div", {
    className: "top"
  }, html ? _react.default.createElement("div", {
    dangerouslySetInnerHTML: {
      /* eslint react/no-danger: 0 */
      __html: content
    }
  }) : content, _react.default.createElement("i", null)));
};

var _default = Tooltip;
exports.default = _default;