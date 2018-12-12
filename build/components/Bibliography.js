"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module exports a stateless reusable bibliography wrapper component
 * ============
 * @module quinoa-story-player/components/BlockAssetPlayer
 */

/**
 * Renders a block asset player as a pure component
 * @param {object} props
 * @param {object} context
 * @param {array} context.bibliography - an array of strings & react elements representing each reference
 * @return {ReactElement} component - the component
 */
var BibliographyWrapper = function BibliographyWrapper(_ref, _ref2) {
  var id = _ref.id,
      title = _ref.title;
  var bibliography = _ref2.bibliography;
  return _react.default.createElement("section", {
    className: "references"
  }, _react.default.createElement("h2", {
    id: id
  }, title), _react.default.createElement("div", null, bibliography));
};
/**
 * Component's properties types
 */


BibliographyWrapper.propTypes = {};
/**
 * Component's context used properties
 */

BibliographyWrapper.contextTypes = {
  /**
   * Array of strings and react elements
   */
  bibliography: _propTypes.default.array
};
var _default = BibliographyWrapper;
exports.default = _default;