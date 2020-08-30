"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Info = _interopRequireDefault(require("./Info"));

var _BlockAssetPlayer = _interopRequireDefault(require("./BlockAssetPlayer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders a block asset wrapper as a pure component
 * @param {object} props
 * @param {object} props.data - the data initially embedded in a draft-js entity
 * @param {object} context - the context data passed to the component
 * @return {ReactElement} component - the component
 */
var BlockAssetWrapper = function BlockAssetWrapper(_ref, context) {
  var data = _ref.data;
  var assetId = data.asset.id;
  var contextualization = context.story && context.story.contextualizations && context.story.contextualizations[assetId];

  if (!contextualization) {
    return null;
  }

  var asset = _objectSpread({}, contextualization, {
    contextualizer: context.story.contextualizers[contextualization.contextualizerId],
    resource: context.story.resources[contextualization.resourceId]
  });

  var activeBlockId = context.activeBlockId;
  var inNote = context.inNote;

  if (asset && asset.resource.data && !inNote) {
    var resource = asset.resource,
        contextualizer = asset.contextualizer; // const resource = asset.resource;
    // const contextualizer = asset.contextualizer;

    var assetType = contextualizer.type;

    var buildInfo = function buildInfo() {
      if (!(resource.metadata.description && resource.metadata.description.length) || !(resource.metadata.source && resource.metadata.source.length)) {
        return undefined;
      }

      var description = resource.metadata.description ? "\n        <div class=\"info-description\">\n          ".concat(resource.metadata.description.replace('\n', '<br/>'), "\n        </div>\n      ") : '';
      var source = resource.metadata.source ? "\n        <div class=\"info-source\">\n          <i>Source: ".concat(resource.metadata.source, "</i>\n        </div>\n      ") : '';
      return "\n      <div class=\"info-container\">\n        ".concat(description, "\n        ").concat(source, "\n      </div>\n            ");
    };

    var info = buildInfo();
    var isActive;

    if (activeBlockId === assetId) {
      isActive = true;
    } // todo: we could later on embed more data coming
    // from the contextualization (and not just the resource)
    // involved in displaying the embed


    return _react.default.createElement("figure", {
      className: "content-figure ".concat(asset.contextualizer.type, " ").concat(isActive ? 'is-active' : ''),
      id: assetId
    }, _react.default.createElement(_BlockAssetPlayer.default, {
      type: assetType,
      data: resource.data,
      resource: resource,
      contextualizer: contextualizer,
      contextualization: contextualization,
      options: {
        template: 'scroller'
      }
    }), _react.default.createElement("figcaption", {
      className: "figure-caption-container"
    }, _react.default.createElement("div", {
      className: "figure-caption-content"
    }, resource.metadata.title && _react.default.createElement("h4", {
      className: "figure-caption-title"
    }, resource.metadata.title, info && _react.default.createElement(_Info.default, {
      message: info
    })))));
  } else {
    return null;
  }
};
/**
 * Component's properties types
 */


BlockAssetWrapper.propTypes = {
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

BlockAssetWrapper.contextTypes = {
  /**
   * The active story data
   */
  story: _propTypes.default.object,

  /**
   * Whether the block asset is displayed in a note (and not in main content)
   */
  inNote: _propTypes.default.bool,

  /**
   * Active element when relevant
   */
  activeBlockId: _propTypes.default.string
};
var _default = BlockAssetWrapper;
exports.default = _default;