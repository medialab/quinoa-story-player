"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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
  var to = _ref.to,
      children = _ref.children;
  return _react.default.createElement("a", {
    href: to,
    target: "blank"
  }, _react.default.createElement("span", {
    className: "link-content"
  }, children));
};
/**
 * Component's properties types
 */


Link.propTypes = {
  /**
   * url to point to
   */
  to: _propTypes.default.string,

  /**
   * children react elements
   */
  children: _propTypes.default.array
};
var _default = Link;
exports.default = _default;