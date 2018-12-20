"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _glossary = require("../contextualizers/glossary");

var _bib = require("../contextualizers/bib");

var _webpage = require("../contextualizers/webpage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module exports a stateless reusable inline asset wrapper component
 * It handles the connection to context's data and builds proper data to render the asset
 * ============
 * @module quinoa-story-player/components/InlineAssetWrapper
 */
// import CitationContainer from './CitationContainer';
// import GlossaryMention from './GlossaryMention';

/**
 * Renders an inline asset wrapper as a pure component
 * @param {object} props
 * @param {object} props.data - the data initially embedded in a draft-js entity
 * @param {object} context - the context data passed to the component
 * @return {ReactElement} component - the component
 */
var InlineAssetWrapper = function InlineAssetWrapper(_ref, context) {
  var data = _ref.data,
      children = _ref.children;
  var story = context.story;
  var assetId = data.asset && data.asset.id;

  if (!assetId || !story) {
    return null;
  }

  var contextualization = story.contextualizations[assetId];

  if (!contextualization) {
    return null;
  }

  var contextualizer = story.contextualizers[contextualization.contextualizerId];

  if (contextualizer) {
    var contextualizerType = contextualizer.type;
    var resource = story.resources[contextualization.resourceId];

    switch (contextualizerType) {
      case 'bib':
        return _react.default.createElement(_bib.Inline, {
          resource: resource,
          data: data
        });

      case 'glossary':
        var onGlossaryClick = function onGlossaryClick() {
          if (typeof context.onGlossaryMentionClick === 'function') {
            context.onGlossaryMentionClick(assetId);
          }
        };

        return _react.default.createElement(_glossary.Inline, {
          onClick: onGlossaryClick,
          contextualization: contextualization,
          contextualizer: contextualizer,
          resource: resource
        }, children);

      case 'webpage':
        // const text = contextualizer.alias || resource.metadata.title || '*';
        return _react.default.createElement(_webpage.Inline, {
          resource: resource
        }, children);

      default:
        return null;
    }
  }

  return null;
};
/**
 * Component's properties types
 */


InlineAssetWrapper.propTypes = {
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

InlineAssetWrapper.contextTypes = {
  story: _propTypes.default.object,

  /**
   * Callbacks when a glossary mention is clicked
   */
  onGlossaryMentionClick: _propTypes.default.func
};
var _default = InlineAssetWrapper;
exports.default = _default;