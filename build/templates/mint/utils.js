"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nestSummary = exports.getTocAdjacentNavItems = exports.stylesVariablesToCss = exports.getOffset = exports.buildTOC = void 0;

var _misc = require("../../utils/misc");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var offsetMax = function offsetMax(el) {
  try {
    return el.offsetParent.offsetParent.offsetTop;
  } catch (error) {// The HTML inside the iframe has not fully rendered yet.
  }

  return 0;
};
/**
 * Builds component-consumable table of contents data
 * @param {object} story - the story to process
 * @param {number} scrollTop - the position of the scroll to use for decidinng which TOC item is active
 * @return {array} tocElements - the toc elements to use for rendering the TOC
 */


var buildTOC = function buildTOC(story, scrollTop, _ref) {
  var citations = _ref.citations,
      glossary = _ref.glossary,
      _ref$locale = _ref.locale,
      locale = _ref$locale === void 0 ? {} : _ref$locale;
  var jsElements = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var usedDocument = jsElements.usedDocument;
  var usedWindow = jsElements.usedWindow;
  var toc = story.sectionsOrder.map(function (sectionId, sectionIndex) {
    var section = story.sections[sectionId];
    var sectionLevel = section.metadata.level + 1; // const content = section.contents;
    // we retrieve all the 'header-#' blocks
    // in the draft-js raw representation of each section
    // const headers = content && content.blocks && content.blocks
    // .filter(block => block.type.indexOf('header') === 0);

    var sectionActive = false; // title of the section

    var title = usedDocument.getElementById(section.id);

    if (title && title.offsetTop) {
      var nextTitleOffsetTop; // we will check if scroll is in this section's part of the page height

      var titleOffsetTop = title.offsetTop + offsetMax(title); // to do that we need the offset of the next element

      if (sectionIndex < story.sectionsOrder.length - 1) {
        var next = story.sectionsOrder[sectionIndex + 1];
        var nextTitle = usedDocument.getElementById(next);

        if (nextTitle) {
          nextTitleOffsetTop = nextTitle.offsetTop + offsetMax(title);
        }
      }

      if (titleOffsetTop <= scrollTop + usedWindow.innerHeight / 2 && (nextTitleOffsetTop === undefined || nextTitleOffsetTop >= scrollTop)) {
        sectionActive = true;
      }
    } // eventually we format the headers for display


    return {
      level: sectionLevel,
      title: section.metadata.title || '',
      viewParams: {
        sectionId: section.id
      },
      viewType: 'section',
      id: section.id,
      active: sectionActive
    };
  }); // adding special items to table of contents

  var hasReferences = Object.keys(citations.citationItems).length > 0;
  var hasGlossary = glossary.length > 0;

  if (hasReferences) {
    toc.push({
      level: 1,
      title: (0, _misc.capitalize)(locale.references || 'references'),
      viewType: 'references',
      id: 'references',
      viewParams: {}
    });
  }

  if (hasGlossary) {
    toc.push({
      level: 1,
      title: (0, _misc.capitalize)(locale.glossary || 'glossary'),
      viewType: 'glossary',
      id: 'glossary',
      viewParams: {}
    });
  }

  return toc;
};
/**
 * Retrieves the absolute offset of an element
 * (this avoids to use an additionnal lib such as jquery to handle the operation)
 * (todo: this should be stored in a separate utils file)
 * @param {DOMElement} el - the element to inspect
 * @return {object} offset - the absolute offset of the element
 */


exports.buildTOC = buildTOC;

var getOffset = function getOffset(el) {
  var _x = 0;
  var _y = 0;

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft; // - el.scrollLeft;

    _y += el.offsetTop; // - el.scrollTop;

    el = el.offsetParent;
  }

  return {
    top: _y,
    left: _x
  };
};

exports.getOffset = getOffset;
var stylesRatios = {
  smaller: 0.6,
  small: 0.8,
  normal: 1,
  big: 1.2,
  bigger: 1.4
};

var classToSize = function classToSize(klass) {
  return stylesRatios[klass];
};

var stylesVariablesToCss = function stylesVariablesToCss() {
  var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var compiledStyles = '';

  if (styles.titles) {
    compiledStyles = compiledStyles + "\n    .content-title .content-title--modifier, .section-title .section-title--modifier {\n      color: ".concat(styles.titles.color, ";\n      font-size: ").concat(classToSize(styles.titles.sizeClass), "em;\n    }\n    .section-title-color--modifier {\n      color: ").concat(styles.titles.color, ";\n    }\n    /*.table-of-contents .link-content {\n      color: ").concat(styles.titles.color, ";\n    }*/\n    ");
  }

  if (styles.background) {
    compiledStyles = compiledStyles + "\n    .quinoa-story-player, .quinoa-story-player .nav,\n    .quinoa-story-player .background-color--modifier,\n    .quinoa-story-player .background-color--modifier,\n    .quinoa-story-player .content-figure .quinoa-contextualization,\n    .quinoa-story-player .content-figure .figure-caption-container.background-color--modifier,\n    .quinoa-story-player .table-of-contents-item .table-of-contents-item-contents.background-color--modifier {\n      background: ".concat(styles.background.color, ";\n    }");
  }

  if (styles.blockquotes) {
    compiledStyles = compiledStyles + "\n    .content-blockquote .content-blockquote--modifier {\n      color: ".concat(styles.blockquotes.color, ";\n    }\n    body .quinoa-story-player .content-blockquote .content-blockquote--modifier {\n      font-size: ").concat(classToSize(styles.blockquotes.sizeClass), "em;\n    }");
  }

  if (styles.corpus) {
    compiledStyles = compiledStyles + "\n    .quinoa-story-player {\n      color: ".concat(styles.corpus.color, ";\n    }\n    .content-p .content-p--modifier, .content-li .content-li--modifier {\n      font-size: ").concat(classToSize(styles.corpus.sizeClass), "em;\n    }");
  }

  if (styles.coverText) {
    compiledStyles = compiledStyles + "\n    .header-story-title--modifier, .header-story-subtitle--modifier, .header-authors--modifier {\n      color: ".concat(styles.coverText.color, ";\n      font-size: ").concat(classToSize(styles.coverText.sizeClass), "em;\n    }\n    .header-item-color--modifier {\n      color: ").concat(styles.coverText.color, ";\n    }\n    body .quinoa-story-player .header-container.with-cover .header-contents {\n      background-color: rgba(0, 0, 0, ").concat(styles.coverText.opacity, ");\n    }");
  }

  if (styles.links) {
    compiledStyles = compiledStyles + "\n    .quinoa-story-player .contents-wrapper .content-a, .quinoa-story-player .glossary-mention, .quinoa-story-player .glossary-mention-backlink, .quinoa-story-player .csl-entry a, .quinoa-story-player .contents-wrapper .internal-link {\n      border-bottom-color: ".concat(styles.links.color, ";\n    }\n    body .quinoa-story-player .contents-wrapper .content-a:not(.bib):hover,\n    body .quinoa-story-player .contents-wrapper .internal-link:not(.bib):hover,\n    body .quinoa-story-player .glossary-mention:not(.bib):hover,\n    body .quinoa-story-player .glossary-mention-backlink:not(.bib):hover,\n    body .quinoa-story-player .quinoa-contextualization.bib:not(.bib):hover,\n    body .quinoa-story-player .csl-entry a:not(.bib):hover\n    {\n      background: ").concat(styles.links.color, ";\n    }");
  }

  return compiledStyles;
};

exports.stylesVariablesToCss = stylesVariablesToCss;

var getTocAdjacentNavItems = function getTocAdjacentNavItems(toc, testFn) {
  var tocIndex;
  toc.some(function (item, itemIndex) {
    if (testFn(item)) {
      tocIndex = itemIndex;
      return true;
    }
  });
  var prevItem;
  var nextItem;

  if (tocIndex > 0) {
    prevItem = toc[tocIndex - 1];
  }

  if (tocIndex < toc.length - 1) {
    nextItem = toc[tocIndex + 1];
  }

  return {
    prevItem: prevItem,
    nextItem: nextItem
  };
};

exports.getTocAdjacentNavItems = getTocAdjacentNavItems;

var findChildren = function findChildren(item, arr) {
  var children = arr.filter(function (thatItem) {
    return thatItem.parentId === item.id;
  });

  if (children && children.length) {
    return _objectSpread({}, item, {
      children: children.map(function (item2) {
        return findChildren(item2, arr);
      })
    });
  }

  return _objectSpread({}, item);
};

var nestSummary = function nestSummary(toc) {
  var summary = toc.reduce(function (res, block, blockIndex) {
    var parentId;

    if (blockIndex > 0) {
      var prev = res[blockIndex - 1];

      if (prev.level < block.level) {
        parentId = prev.id;
      } else if (prev.level === block.level && prev.parentId) {
        parentId = prev.parentId;
      }
    }

    return [].concat(_toConsumableArray(res), [_objectSpread({}, block, {
      parentId: parentId
    })]);
  }, []);
  return summary.reduce(function (res, item) {
    if (!item.parentId) {
      var newItem = findChildren(item, summary);
      return [].concat(_toConsumableArray(res), [newItem]);
    }

    return res;
  }, []);
};

exports.nestSummary = nestSummary;