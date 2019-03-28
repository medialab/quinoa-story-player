"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module exports a stateless reusable internal link component
 * ============
 * @module quinoa-story-player/components/InternalLink
 */

/**
 * Renders a block asset wrapper as a pure component
 * @param {object} props
 * @param {object} props.data - the data initially embedded in a draft-js entity
 * @param {object} context - the context data passed to the component
 * @return {ReactElement} component - the component
 */
var InternalLink = function InternalLink(_ref, _ref2) {
  var data = _ref.data,
      children = _ref.children;
  var onInternalLinkClick = _ref2.onInternalLinkClick,
      InternalLinkProvider = _ref2.InternalLinkProvider;

  var handleClick = function handleClick() {
    onInternalLinkClick(data.sectionId);
  };

  if (typeof InternalLinkProvider === 'function') {
    return _react.default.createElement(InternalLinkProvider, {
      to: {
        viewType: 'section',
        viewParams: data
      }
    }, children);
  }

  return _react.default.createElement("span", {
    onClick: handleClick,
    className: "internal-link"
  }, children);
};
/**
 * Component's properties types
 */


InternalLink.propTypes = {
  /**
   * Corresponds to the data initially embedded in a draft-js entity
   */
  data: _propTypes.default.shape({
    sectionId: _propTypes.default.string
  })
};
/**
 * Component's context used properties
 */

InternalLink.contextTypes = {
  story: _propTypes.default.object,

  /**
   * Callbacks when a glossary mention is clicked
   */
  onInternalLinkClick: _propTypes.default.func,
  InternalLinkProvider: _propTypes.default.func
};
var _default = InternalLink;
exports.default = _default;