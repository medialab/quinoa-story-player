"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Tooltip = _interopRequireDefault(require("../../components/Tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module exports a stateless reusable link component
 * ============
 * @module quinoa-story-player/components/Link
 */

/**
 * Renders a link as a pure component
 * @param {object} props
 * @param {string} props.to - the url to point to
 * @param {array} props.children - children elements of the component
 * @return {ReactElement} component - the component
 */
var Link = function Link(_ref) {
  var resource = _ref.resource,
      children = _ref.children;
  var tooltip = !resource.metadata.title.length || resource.metadata.title === resource.data.url ? resource.data.url : "".concat(resource.metadata.title, " (").concat(resource.data.url, ")");
  return _react.default.createElement("a", {
    href: resource.data.url,
    target: "_blank",
    className: "quinoa-contextualization inline webpage content-a",
    alt: "href",
    rel: "noopener noreferrer"
  }, _react.default.createElement(_Tooltip.default, {
    content: tooltip
  }, children));
};

var _default = Link;
exports.default = _default;