"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = exports.buildGlossary = exports.buildCitations = exports.buildCoverImage = void 0;

var _quinoaSchemas = require("quinoa-schemas");

var _resourceToCSLJSON = _interopRequireDefault(require("./resourceToCSLJSON"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var buildCoverImage = function buildCoverImage(story) {
  var resources = story.resources,
      metadata = story.metadata;

  if (metadata.coverImage && metadata.coverImage.resourceId) {
    if (resources[metadata.coverImage.resourceId]) return resources[metadata.coverImage.resourceId].data;else return null;
  } else return null;
};
/**
 * Builds component-consumable data to represent
 * the citations of "bib" resources being mentionned in the story
 * @param {object} story - the story to process
 * @return {object} citationData - the citation data to input in the reference manager
 */


exports.buildCoverImage = buildCoverImage;

var buildCitations = function buildCitations(story) {
  var contextualizations = story.contextualizations,
      contextualizers = story.contextualizers,
      resources = story.resources;
  /*
   * Citations preparation
   */

  var _getStyles = (0, _quinoaSchemas.getStyles)(story),
      options = _getStyles.options;

  var referenceStatus = options && options.referenceStatus || 'cited';
  var referenceTypes = options && options.referenceTypes || ['bib'];
  var citedResources = Object.keys(resources).map(function (resourceId) {
    return resources[resourceId];
  }).filter(function (resource) {
    if (referenceTypes.length) {
      return referenceTypes.indexOf(resource.metadata.type) > -1;
    }

    return true;
  }).filter(function (resource) {
    if (referenceStatus === 'cited') {
      return Object.keys(contextualizations).filter(function (contextualizationId) {
        return contextualizations[contextualizationId].resourceId === resource.id;
      }).length > 0;
    }

    return true;
  }); // build citations items data

  var enrichedCitedResources = citedResources.map(function (resource) {
    var citations = resource.metadata.type === 'bib' ? resource.data : (0, _resourceToCSLJSON.default)(resource);
    return _objectSpread({}, resource, {
      citations: citations,
      citationId: citations[0].id
    });
  });
  var citationItems = enrichedCitedResources.reduce(function (finalCitations1, resource) {
    var newCitations = resource.citations.reduce(function (final2, citation) {
      return _objectSpread({}, final2, _defineProperty({}, citation.id, citation));
    }, {});
    return _objectSpread({}, finalCitations1, newCitations);
  }, {});
  var noteIndex = 0; // build citations's citations data

  var citationInstances = enrichedCitedResources.filter(function (resource) {
    return resource.metadata.type === 'bib';
  }).reduce(function (result1, resource) {
    var theseContextualizations = Object.keys(contextualizations).filter(function (contextualizationId) {
      return contextualizations[contextualizationId].resourceId === resource.id;
    }).map(function (contextualizationId) {
      return contextualizations[contextualizationId];
    });
    return [].concat(_toConsumableArray(result1), _toConsumableArray(theseContextualizations.reduce(function (result2, contextualization) {
      var contextualizer = contextualizers[contextualization.contextualizerId];
      noteIndex++;
      return [].concat(_toConsumableArray(result2), [{
        citationID: contextualization.id,
        // citationID: resource.citationId,
        citationItems: resource.citations.map(function () {
          return {
            locator: contextualizer.locator,
            prefix: contextualizer.prefix,
            suffix: contextualizer.suffix,
            // ...contextualizer,
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
  }); // map them to the clumsy formatting needed by citeProc

  var citationData = citationInstances.map(function (instance, index) {
    return [instance, // citations before
    citationInstances.slice(0, index === 0 ? 0 : index).map(function (oCitation) {
      return [oCitation.citationID, oCitation.properties.noteIndex];
    }), [] // citations after the current citation
    // this is claimed to be needed by citeproc.js
    // but it works without it so ¯\_(ツ)_/¯
    // citationInstances.slice(index)
    //   .map((oCitation) => [
    //       oCitation.citationID,
    //       oCitation.properties.noteIndex
    //     ]
    //   ),
    ];
  });
  return {
    citationData: citationData,
    citationItems: citationItems
  };
};
/**
 * Builds component-consumable data to represent
 * the glossary of "entities" resources being mentionned in the story
 * @param {object} story - the story to process
 * @return {array} glossaryMentions - all the glossary entries properly formatted for rendering
 */


exports.buildCitations = buildCitations;

var buildGlossary = function buildGlossary(story) {
  var contextualizations = story.contextualizations,
      contextualizers = story.contextualizers,
      resources = story.resources;
  var glossaryMentions = Object.keys(contextualizations).filter(function (contextualizationId) {
    var contextualizerId = contextualizations[contextualizationId].contextualizerId;
    var contextualizer = contextualizers[contextualizerId];
    return contextualizer && contextualizer.type === 'glossary';
  }).map(function (contextualizationId) {
    return _objectSpread({}, contextualizations[contextualizationId], {
      contextualizer: contextualizers[contextualizations[contextualizationId].contextualizerId],
      resource: resources[contextualizations[contextualizationId].resourceId]
    });
  }).reduce(function (entries, contextualization) {
    return _objectSpread({}, entries, _defineProperty({}, contextualization.resourceId, {
      resource: contextualization.resource,
      mentions: entries[contextualization.resourceId] ? entries[contextualization.resourceId].mentions.concat(contextualization) : [contextualization]
    }));
  }, {});
  glossaryMentions = Object.keys(glossaryMentions).map(function (id) {
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

exports.buildGlossary = buildGlossary;

var capitalize = function capitalize(lower) {
  return lower.charAt(0).toUpperCase() + lower.substr(1);
};

exports.capitalize = capitalize;