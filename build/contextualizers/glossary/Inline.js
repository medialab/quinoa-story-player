"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module exports a stateless reusable glossary mention component
 * ============
 * @module quinoa-story-player/components/GlossaryMention
 */

/**
 * Renders a block asset wrapper as a pure component
 * @param {object} props - properties provided by parent
 * @param {object} props.resource - initial glossary resource
 * @param {object} props.contextualizer - contextualizing information such as alias to use for the mention
 * @param {object} props.contextualization - the contextualization to consume for identifying this specific mention
 * @return {ReactElement} component - the component
 */
var GlossaryMention = function GlossaryMention(_ref) {
  var resource = _ref.resource,
      contextualization = _ref.contextualization,
      onClick = _ref.onClick,
      children = _ref.children;

  // const name = contextualizer.alias || resource.data && resource.data.name;
  var handleClick = function handleClick(e) {
    e.preventDefault();

    if (typeof onClick === 'function') {
      onClick();
    }
  }; // let descriptionText = resource.data.description;
  // if (descriptionText && descriptionText.length && descriptionText.split(' ').length > WORDS_LIMIT) {
  //   descriptionText = descriptionText.split(' ').slice(0, WORDS_LIMIT).join(' ') + '...';
  // }


  return _react.default.createElement("a", {
    id: 'glossary-mention-' + contextualization.id,
    href: '#glossary-entry-' + resource.id,
    onClick: handleClick,
    className: "quinoa-contextualization inline glossary glossary-mention",
    "data-for": "tooltip",
    "data-tip": resource.data.description ? resource.data.description : undefined
  }, _react.default.createElement("span", {
    className: "link-content"
  }, children), _react.default.createElement("div", {
    className: "tooltip"
  }, "Hover Me to Preview", _react.default.createElement("div", {
    className: "top"
  }, _react.default.createElement("h3", null, "Lorem Ipsum"), _react.default.createElement("p", null, "Dolor sit amet, consectetur adipiscing elit."), _react.default.createElement("i", null))));
};
/**
 * Component's properties types
 */


GlossaryMention.propTypes = {
  /**
   * initial glossary resource
   */
  resource: _propTypes.default.object,

  /**
   * contextualizing information such as alias to use for the mention
   */
  contextualizer: _propTypes.default.object,

  /**
   * the contextualization to consume for identifying this specific mention
   */
  contextualization: _propTypes.default.object
};
var _default = GlossaryMention;
exports.default = _default;