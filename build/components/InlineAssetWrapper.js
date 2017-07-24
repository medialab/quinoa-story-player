'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CitationContainer = require('./CitationContainer');

var _CitationContainer2 = _interopRequireDefault(_CitationContainer);

var _GlossaryMention = require('./GlossaryMention');

var _GlossaryMention2 = _interopRequireDefault(_GlossaryMention);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InlineAssetWrapper = function InlineAssetWrapper(_ref, context) {
  var data = _ref.data;
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
        return _react2.default.createElement(_CitationContainer2.default, { data: data });
      case 'glossary':
        return _react2.default.createElement(_GlossaryMention2.default, { contextualization: contextualization, contextualizer: contextualizer, resource: resource });
      default:
        return null;
    }
  }
  return null;
};

InlineAssetWrapper.contextTypes = {
  story: _propTypes2.default.object
};

exports.default = InlineAssetWrapper;