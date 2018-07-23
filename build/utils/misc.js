'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildGlossary = exports.buildCitations = exports.buildCoverImage = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _resourceToCSLJSON = require('./resourceToCSLJSON');

var _resourceToCSLJSON2 = _interopRequireDefault(_resourceToCSLJSON);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildCoverImage = exports.buildCoverImage = function buildCoverImage(story) {
  var resources = story.resources,
      metadata = story.metadata;

  if (metadata.coverImage && metadata.coverImage.resourceId) {
    if (resources[metadata.coverImage.resourceId]) return resources[metadata.coverImage.resourceId].data;else return null;
  } else return null;
};
var buildCitations = exports.buildCitations = function buildCitations(story) {
  var contextualizations = story.contextualizations,
      contextualizers = story.contextualizers,
      resources = story.resources,
      _story$settings = story.settings,
      settings = _story$settings === undefined ? {} : _story$settings;

  var referenceStatus = settings.options && settings.options.referenceStatus || 'cited';
  var referenceTypes = settings.options && settings.options.referenceTypes || ['bib'];
  var citedResources = (0, _keys2.default)(resources).map(function (resourceId) {
    return resources[resourceId];
  }).filter(function (resource) {
    if (referenceTypes.length) {
      return referenceTypes.indexOf(resource.metadata.type) > -1;
    }
    return true;
  }).filter(function (resource) {
    if (referenceStatus === 'cited') {
      return (0, _keys2.default)(contextualizations).filter(function (contextualizationId) {
        return contextualizations[contextualizationId].resourceId === resource.id;
      }).length > 0;
    }
    return true;
  });
  var enrichedCitedResources = citedResources.map(function (resource) {
    var citations = resource.metadata.type === 'bib' ? resource.data : (0, _resourceToCSLJSON2.default)(resource);
    return (0, _extends5.default)({}, resource, {
      citations: citations,
      citationId: citations[0].id
    });
  });
  var citationItems = enrichedCitedResources.reduce(function (finalCitations1, resource) {

    var newCitations = resource.citations.reduce(function (final2, citation) {
      return (0, _extends5.default)({}, final2, (0, _defineProperty3.default)({}, citation.id, citation));
    }, {});
    return (0, _extends5.default)({}, finalCitations1, newCitations);
  }, {});
  var noteIndex = 0;
  var citationInstances = enrichedCitedResources.filter(function (resource) {
    return resource.metadata.type === 'bib';
  }).reduce(function (result1, resource) {
    var theseContextualizations = (0, _keys2.default)(contextualizations).filter(function (contextualizationId) {
      return contextualizations[contextualizationId].resourceId === resource.id;
    }).map(function (contextualizationId) {
      return contextualizations[contextualizationId];
    });
    return [].concat((0, _toConsumableArray3.default)(result1), (0, _toConsumableArray3.default)(theseContextualizations.reduce(function (result2, contextualization) {
      var contextualizer = contextualizers[contextualization.contextualizerId];
      noteIndex++;
      return [].concat((0, _toConsumableArray3.default)(result2), [{
        citationID: contextualization.id,
        citationItems: resource.citations.map(function () {
          return {
            locator: contextualizer.locator,
            prefix: contextualizer.prefix,
            suffix: contextualizer.suffix,
            id: resource.data[0].id
          };
        }),
        properties: {
          noteIndex: noteIndex
        }
      }]);
    }, [])));
  }, []).filter(function (c) {
    return c;
  });
  var citationData = citationInstances.map(function (instance, index) {
    return [instance,
    citationInstances.slice(0, index === 0 ? 0 : index).map(function (oCitation) {
      return [oCitation.citationID, oCitation.properties.noteIndex];
    }), []
    ];
  });
  return {
    citationData: citationData,
    citationItems: citationItems
  };
};

var buildGlossary = exports.buildGlossary = function buildGlossary(story) {
  var contextualizations = story.contextualizations,
      contextualizers = story.contextualizers,
      resources = story.resources;

  var glossaryMentions = (0, _keys2.default)(contextualizations).filter(function (contextualizationId) {
    var contextualizerId = contextualizations[contextualizationId].contextualizerId;
    var contextualizer = contextualizers[contextualizerId];
    return contextualizer && contextualizer.type === 'glossary';
  }).map(function (contextualizationId) {
    return (0, _extends5.default)({}, contextualizations[contextualizationId], {
      contextualizer: contextualizers[contextualizations[contextualizationId].contextualizerId],
      resource: resources[contextualizations[contextualizationId].resourceId]
    });
  }).reduce(function (entries, contextualization) {
    return (0, _extends5.default)({}, entries, (0, _defineProperty3.default)({}, contextualization.resourceId, {
      resource: contextualization.resource,
      mentions: entries[contextualization.resourceId] ? entries[contextualization.resourceId].mentions.concat(contextualization) : [contextualization]
    }));
  }, {});

  glossaryMentions = (0, _keys2.default)(glossaryMentions).map(function (id) {
    return glossaryMentions[id];
  }).sort(function (a, b) {
    if (a.resource.data.name > b.resource.data.name) {
      return -1;
    } else {
      return 1;
    }
  });

  return glossaryMentions;
};