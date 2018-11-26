'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffset = exports.buildTOC = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _misc = require('../../utils/misc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildTOC = exports.buildTOC = function buildTOC(story, scrollTop, _ref) {
  var citations = _ref.citations,
      glossary = _ref.glossary,
      _ref$locale = _ref.locale,
      locale = _ref$locale === undefined ? {} : _ref$locale;
  var jsElements = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var usedDocument = jsElements.usedDocument;
  var usedWindow = jsElements.usedWindow;
  var toc = story.sectionsOrder.map(function (sectionId, sectionIndex) {
    var section = story.sections[sectionId];
    var sectionLevel = section.metadata.level + 1;

    var sectionActive = void 0;
    var nextTitleOffsetTop = void 0;
    var title = usedDocument.getElementById(section.id);
    if (!title) {
      return undefined;
    }
    var titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
    if (sectionIndex < story.sectionsOrder.length - 1) {
      var next = story.sectionsOrder[sectionIndex + 1];
      var nextTitle = usedDocument.getElementById(next);
      if (nextTitle) {
        nextTitleOffsetTop = nextTitle.offsetTop + title.offsetParent.offsetParent.offsetTop;
      }
    }
    if (titleOffsetTop <= scrollTop + usedWindow.innerHeight / 2 && (nextTitleOffsetTop === undefined || nextTitleOffsetTop >= scrollTop)) {
      sectionActive = true;
    }
    var sectionHeader = {
      level: sectionLevel,
      text: section.metadata.title || '',
      key: section.id,
      active: sectionActive
    };
    return [sectionHeader];
  }
  ).filter(function (el) {
    return el !== undefined;
  })
  .reduce(function (result, ar) {
    return [].concat((0, _toConsumableArray3.default)(result), (0, _toConsumableArray3.default)(ar));
  }, []);

  var hasReferences = (0, _keys2.default)(citations.citationItems).length > 0;
  var hasGlossary = glossary.length > 0;
  var notesPosition = story.settings.options && story.settings.options.notesPosition || 'foot';
  var hasNotes = story.sectionsOrder.find(function (key) {
    return story.sections[key].notesOrder.length > 0;
  }) !== undefined;
  if (notesPosition === 'foot' && hasNotes) {
    var notesActive = void 0;
    var nextTitleOffsetTop = void 0;
    var title = usedDocument.getElementById('notes');

    if (title) {
      var titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
      var nextTitleId = void 0;
      if (hasReferences) {
        nextTitleId = 'references';
      } else if (hasGlossary) {
        nextTitleId = 'glossary';
      }
      if (nextTitleId) {
        var nextTitle = usedDocument.getElementById(nextTitleId);
        if (nextTitle) {
          nextTitleOffsetTop = nextTitle.offsetTop + title.offsetParent.offsetParent.offsetTop;
        }
      }
      if (titleOffsetTop <= scrollTop + window.innerHeight / 2 && (nextTitleOffsetTop === undefined || nextTitleOffsetTop >= scrollTop)) {
        notesActive = true;
      }
      toc.push({
        level: 0,
        text: (0, _misc.capitalize)(locale.notes || 'notes'),
        key: 'notes',
        active: notesActive
      });
    }
  }

  if (hasReferences) {
    var referencesActive = void 0;
    var _nextTitleOffsetTop = void 0;
    var _title = usedDocument.getElementById('references');
    if (_title) {
      var _titleOffsetTop = _title.offsetTop + _title.offsetParent.offsetParent.offsetTop;
      var _nextTitle = usedDocument.getElementById('glossary');
      if (_nextTitle) {
        _nextTitleOffsetTop = _nextTitle.offsetTop + _title.offsetParent.offsetParent.offsetTop;
      }
      if (_titleOffsetTop <= scrollTop + window.innerHeight / 2 && (_nextTitleOffsetTop === undefined || _nextTitleOffsetTop >= scrollTop)) {
        referencesActive = true;
      }
      toc.push({
        level: 0,
        text: (0, _misc.capitalize)(locale.references || 'references'),
        key: 'references',
        active: referencesActive
      });
    }
  }

  if (hasGlossary) {
    var glossaryActive = void 0;
    var _nextTitleOffsetTop2 = void 0;
    var _title2 = usedDocument.getElementById('glossary');
    if (_title2) {
      var _titleOffsetTop2 = _title2.offsetTop + _title2.offsetParent.offsetParent.offsetTop;
      if (_titleOffsetTop2 <= scrollTop + usedWindow.innerHeight / 2 && (_nextTitleOffsetTop2 === undefined || _nextTitleOffsetTop2 >= scrollTop)) {
        glossaryActive = true;
      }
      toc.push({
        level: 0,
        text: (0, _misc.capitalize)(locale.glossary || 'glossary'),
        key: 'glossary',
        active: glossaryActive
      });
    }
  }
  return toc;
};

var getOffset = exports.getOffset = function getOffset(el) {
  var _x = 0;
  var _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft; 
    _y += el.offsetTop; 
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
};