'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _glossary = require('../contextualizers/glossary');

var _bib = require('../contextualizers/bib');

var _webpage = require('../contextualizers/webpage');

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
        return _react2.default.createElement(_bib.Inline, { data: data });
      case 'glossary':
        var onGlossaryClick = function onGlossaryClick() {
          if (typeof context.onGlossaryMentionClick === 'function') {
            context.onGlossaryMentionClick(assetId);
          }
        };
        return _react2.default.createElement(
          _glossary.Inline,
          {
            onClick: onGlossaryClick,
            contextualization: contextualization,
            contextualizer: contextualizer,
            resource: resource },
          children
        );
      case 'webpage':
        return _react2.default.createElement(
          _webpage.Inline,
          { resource: resource },
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