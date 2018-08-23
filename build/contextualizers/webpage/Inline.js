"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = function Link(_ref) {
  var resource = _ref.resource,
      children = _ref.children;
  return _react2.default.createElement(
    "a",
    {
      href: resource.data.url,
      target: "_blank",
      className: "quinoa-contextualization inline webpage content-a",
      alt: "href",
      rel: "noopener" },
    children
  );
}; 
exports.default = Link;