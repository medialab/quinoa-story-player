'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _BlockAssetPlayer = require('./BlockAssetPlayer');

var _BlockAssetPlayer2 = _interopRequireDefault(_BlockAssetPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockAssetWrapper = function BlockAssetWrapper(_ref, context) {
  var data = _ref.data;

  var assetId = data.asset.id;
  var contextualization = context.story && context.story.contextualizations && context.story.contextualizations[assetId];
  if (!contextualization) {
    return null;
  }
  var asset = (0, _extends3.default)({}, contextualization, {
    contextualizer: context.story.contextualizers[contextualization.contextualizerId],
    resource: context.story.resources[contextualization.resourceId]
  });
  var dimensions = context.dimensions;
  var fixedPresentationId = context.fixedPresentationId;
  var onExit = context.onExit;
  var inNote = context.inNote;
  if (asset && asset.resource.data && !inNote) {
    var resource = asset.resource;
    var assetType = asset.contextualizer.type;

    var buildInfo = function buildInfo() {
      if (!(resource.metadata.description && resource.metadata.description.length) || !(resource.metadata.source && resource.metadata.source.length)) {
        return undefined;
      }
      var description = resource.metadata.description ? '\n        <div class="info-description">\n          ' + resource.metadata.description.replace('\n', '<br/>') + '\n        </div>\n      ' : '';
      var source = resource.metadata.source ? '\n        <div class="info-source">\n          <i>Source: ' + resource.metadata.source + '</i>\n        </div>\n      ' : '';

      return '\n      <div class="info-container">\n        ' + description + '\n        ' + source + '\n      </div>\n            ';
    };
    var info = buildInfo();
    return _react2.default.createElement(
      'figure',
      {
        className: 'content-figure ' + asset.contextualizer.type,
        style: {
          position: 'relative',
          minHeight: asset.contextualizer.type === 'data-presentation' && dimensions && dimensions.height || '10em'
        },
        id: assetId },
      _react2.default.createElement(_BlockAssetPlayer2.default, {
        type: assetType,
        data: resource.data,
        options: {
          template: 'scroller'
        },
        fixed: fixedPresentationId === assetId,
        allowInteractions: inNote || fixedPresentationId === assetId,
        onExit: onExit }),
      _react2.default.createElement(
        'figcaption',
        { className: 'figure-caption-container' },
        _react2.default.createElement(
          'div',
          { className: 'figure-caption-content' },
          resource.metadata.title && _react2.default.createElement(
            'h4',
            { className: 'figure-caption-title' },
            resource.metadata.title,
            info && _react2.default.createElement(_Info2.default, { message: info })
          )
        )
      )
    );
  } else {
    return null;
  }
};
BlockAssetWrapper.propTypes = {
  data: _propTypes2.default.shape({
    asset: _propTypes2.default.shape({
      id: _propTypes2.default.string
    })
  })
};
BlockAssetWrapper.contextTypes = {
  story: _propTypes2.default.object,
  dimensions: _propTypes2.default.object,
  fixedPresentationId: _propTypes2.default.string,
  inNote: _propTypes2.default.bool,
  onExit: _propTypes2.default.func
};

exports.default = BlockAssetWrapper;