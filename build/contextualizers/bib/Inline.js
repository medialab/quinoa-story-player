"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactCiteproc = require("react-citeproc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders a citation container as a pure component
 * @param {object} props
 * @param {object} props.data - the data initially embedded in a draft-js entity
 * @param {object} context - the context data passed to the component
 * @return {ReactElement} component - the component
 */
var CitationContainer = function CitationContainer(_ref, context) {
  var data = _ref.data,
      resource = _ref.resource;
  var citations = context.citations,
      citationStyle = context.citationStyle,
      citationLocale = context.citationLocale;
  var id = data.asset.id;

  if (citations) {
    var citation = citations[id];

    if (citation) {
      var CitComponent = citation.Component;

      var minCit = _defineProperty({}, resource.data[0].id, resource.data[0]);

      var Bib = _react.default.createElement(_reactCiteproc.Bibliography, {
        items: minCit,
        style: citationStyle,
        locale: citationLocale
      });

      return _react.default.createElement("cite", {
        className: "quinoa-contextualization inline bib",
        "data-for": "tooltip",
        "data-html": true,
        "data-tip": (0, _server.renderToStaticMarkup)(Bib),
        id: id
      }, CitComponent);
    }

    return null;
  }

  return null;
};
/**
 * Component's properties types
 */


CitationContainer.propTypes = {
  /**
   * Corresponds to the data initially embedded in a draft-js entity
   */
  data: _propTypes.default.shape({
    asset: _propTypes.default.shape({
      id: _propTypes.default.string
    })
  })
};
/**
 * Component's context used properties
 */

CitationContainer.contextTypes = {
  /**
   * Map of citations built upstream
   * (each citation features the following keys: 'Component', 'html' and 'order')
   */
  citations: _propTypes.default.object,
  citationStyle: _propTypes.default.string,
  citationLocale: _propTypes.default.string
};
var _default = CitationContainer;
exports.default = _default;