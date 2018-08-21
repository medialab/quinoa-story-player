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
        return _react2.default.createElement(_CitationContainer2.default, { data: data });
      case 'glossary':
        var onGlossaryClick = function onGlossaryClick() {
          if (typeof context.onGlossaryMentionClick === 'function') {
            context.onGlossaryMentionClick(assetId);
          }
        };
        return _react2.default.createElement(
          _GlossaryMention2.default,
          {
            onClick: onGlossaryClick,
            contextualization: contextualization,
            contextualizer: contextualizer,
            resource: resource },
          children
        );
      case 'webpage':
        return _react2.default.createElement(
          'a',
          {
            href: resource.data.url,
            target: '_blank',
            className: 'content-a',
            alt: 'href',
            rel: 'noopener' },
          children
        );
      default:
        return null;
    }
  }
  return null;
};

InlineAssetWrapper.propTypes = {
  data: _propTypes2.default.shape({
    asset: _propTypes2.default.shape({
      id: _propTypes2.default.string
    })
  })
};
InlineAssetWrapper.contextTypes = {
  story: _propTypes2.default.object,
  onGlossaryMentionClick: _propTypes2.default.func
};

exports.default = InlineAssetWrapper;