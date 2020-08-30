"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stylesVariablesToCss = exports.getOffset = exports.getActiveTocElementKey = exports.buildTOC = void 0;

var _misc = require("../../utils/misc");

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
  var toc = story.sectionsOrder.map(function (sectionId, sectionIndex) {
    var section = story.sections[sectionId];
    var sectionLevel = section.metadata.level + 1; // const content = section.contents;
    // we retrieve all the 'header-#' blocks
    // in the draft-js raw representation of each section
    // const headers = content && content.blocks && content.blocks
    // .filter(block => block.type.indexOf('header') === 0);
    // title of the section

    var title = usedDocument.getElementById(section.id);
    var nextTitleOffsetTop;
    var titleOffsetTop;

    if (title && title.offsetTop) {
      // we will check if scroll is in this section's part of the page height
      titleOffsetTop = title.offsetTop + offsetMax(title); // to do that we need the offset of the next element

      if (sectionIndex < story.sectionsOrder.length - 1) {
        var next = story.sectionsOrder[sectionIndex + 1];
        var nextTitle = usedDocument.getElementById(next);

        if (nextTitle) {
          nextTitleOffsetTop = nextTitle.offsetTop + offsetMax(title);
        }
      }
    } // eventually we format the headers for display


    return {
      level: sectionLevel,
      text: section.metadata.title || '',
      key: section.id,
      range: [titleOffsetTop, nextTitleOffsetTop]
    };
  }); // adding special items to table of contents

  var hasReferences = Object.keys(citations.citationItems).length > 0;
  var hasGlossary = glossary.length > 0;
  var notesPosition = story.settings.options && story.settings.options.notesPosition || 'foot';
  var hasNotes = story.sectionsOrder.find(function (key) {
    return story.sections[key].notesOrder.length > 0;
  }) !== undefined;

  if (notesPosition === 'foot' && hasNotes) {
    var nextTitleOffsetTop;
    var titleOffsetTop; // title of the section

    var title = usedDocument.getElementById('notes');

    if (title) {
      // we will check if scroll is after glossary title
      titleOffsetTop = title.offsetTop + offsetMax(title);
      var nextTitleId;

      if (hasReferences) {
        nextTitleId = 'references';
      } else if (hasGlossary) {
        nextTitleId = 'glossary';
      }

      if (nextTitleId) {
        var nextTitle = usedDocument.getElementById(nextTitleId);

        if (nextTitle) {
          nextTitleOffsetTop = nextTitle.offsetTop + offsetMax(title);
        }
      }

      toc.push({
        level: 0,
        text: (0, _misc.capitalize)(locale.notes || 'notes'),
        key: 'notes',
        range: [titleOffsetTop, nextTitleOffsetTop]
      });
    }
  }

  if (hasReferences) {
    var _nextTitleOffsetTop;

    var _titleOffsetTop; // title of the section


    var _title = usedDocument.getElementById('references');

    if (_title) {
      // we will check if scroll is after glossary title
      _titleOffsetTop = _title.offsetTop + offsetMax(_title);

      var _nextTitle = usedDocument.getElementById('glossary');

      if (_nextTitle) {
        _nextTitleOffsetTop = _nextTitle.offsetTop + offsetMax(_title);
      }

      toc.push({
        level: 0,
        text: (0, _misc.capitalize)(locale.references || 'references'),
        key: 'references',
        range: [_titleOffsetTop, _nextTitleOffsetTop]
      });
    }
  }

  if (hasGlossary) {
    var _titleOffsetTop2; // title of the section


    var _title2 = usedDocument.getElementById('glossary');

    if (_title2) {
      // we will check if scroll is after glossary title
      _titleOffsetTop2 = _title2.offsetTop + offsetMax(_title2);
      toc.push({
        level: 0,
        text: (0, _misc.capitalize)(locale.glossary || 'glossary'),
        key: 'glossary',
        range: [_titleOffsetTop2, undefined]
      });
    }
  }

  return toc;
};

exports.buildTOC = buildTOC;

var getActiveTocElementKey = function getActiveTocElementKey(scrollTop, toc, displacement) {
  var activeElement = toc.find(function (element, index) {
    return element.range && element.range[0] < scrollTop + displacement && (index === toc.length - 1 || element.range[1] > scrollTop + displacement);
  });

  if (activeElement) {
    return activeElement.key;
  }
};
/**
 * Retrieves the absolute offset of an element
 * (this avoids to use an additionnal lib such as jquery to handle the operation)
 * (todo: this should be stored in a separate utils file)
 * @param {DOMElement} el - the element to inspect
 * @return {object} offset - the absolute offset of the element
 */


exports.getActiveTocElementKey = getActiveTocElementKey;

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
    compiledStyles = compiledStyles + "\n    .content-title .content-title--modifier, .section-title .section-title--modifier {\n      color: ".concat(styles.titles.color, ";\n      font-size: ").concat(classToSize(styles.titles.sizeClass), "em;\n    }\n    .table-of-contents .link-content {\n      color: ").concat(styles.titles.color, ";\n    }\n    ");
  }

  if (styles.background) {
    compiledStyles = compiledStyles + "\n    .quinoa-story-player, .quinoa-story-player .nav {\n      background: ".concat(styles.background.color, ";\n    }");
  }

  if (styles.blockquotes) {
    compiledStyles = compiledStyles + "\n    .content-blockquote .content-blockquote--modifier {\n      color: ".concat(styles.blockquotes.color, ";\n    }\n    body .quinoa-story-player .content-blockquote .content-blockquote--modifier {\n      font-size: ").concat(classToSize(styles.blockquotes.sizeClass), "em;\n    }");
  }

  if (styles.corpus) {
    compiledStyles = compiledStyles + "\n    .quinoa-story-player {\n      color: ".concat(styles.corpus.color, ";\n    }\n    .content-p .content-p--modifier, .content-li .content-li--modifier {\n      font-size: ").concat(classToSize(styles.corpus.sizeClass), "em;\n    }");
  }

  if (styles.coverText) {
    compiledStyles = compiledStyles + "\n    .header-story-title--modifier, .header-story-subtitle--modifier, .header-authors--modifier {\n      color: ".concat(styles.coverText.color, ";\n      font-size: ").concat(classToSize(styles.coverText.sizeClass), "em;\n    }\n    body .quinoa-story-player .header-container.with-cover .header-contents {\n      background-color: rgba(0, 0, 0, ").concat(styles.coverText.opacity, ");\n    }");
  }

  if (styles.links) {
    compiledStyles = compiledStyles + "\n    .quinoa-story-player .contents-wrapper .content-a, .quinoa-story-player .glossary-mention, .quinoa-story-player .glossary-mention-backlink, .quinoa-story-player .csl-entry a, .quinoa-story-player .contents-wrapper .internal-link {\n      border-bottom-color: ".concat(styles.links.color, ";\n    }\n    body .quinoa-story-player .contents-wrapper .content-a:not(.bib):hover,\n    body .quinoa-story-player .contents-wrapper .internal-link:not(.bib):hover,\n    body .quinoa-story-player .glossary-mention:not(.bib):hover,\n    body .quinoa-story-player .glossary-mention-backlink:not(.bib):hover,\n    body .quinoa-story-player .quinoa-contextualization.bib:not(.bib):hover,\n    body .quinoa-story-player .csl-entry a:not(.bib):hover\n    {\n      background: ").concat(styles.links.color, ";\n    }");
  }

  return compiledStyles;
};

exports.stylesVariablesToCss = stylesVariablesToCss;