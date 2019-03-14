import {
  capitalize
} from '../../utils/misc';

const offsetMax = el => {
  try {
    return el.offsetParent.offsetParent.offsetTop;
  }
  catch (error) {
    // The HTML inside the iframe has not fully rendered yet.
  }
  return 0;
};

/**
 * Builds component-consumable table of contents data
 * @param {object} story - the story to process
 * @param {number} scrollTop - the position of the scroll to use for decidinng which TOC item is active
 * @return {array} tocElements - the toc elements to use for rendering the TOC
 */
export const buildTOC = (story, scrollTop, { citations, glossary, locale = {} }, jsElements = {}) => {
  const usedDocument = jsElements.usedDocument;
  const usedWindow = jsElements.usedWindow;
  const toc = story.sectionsOrder
  .map((sectionId, sectionIndex) => {
    const section = story.sections[sectionId];
    const sectionLevel = section.metadata.level + 1;
    // const content = section.contents;
    // we retrieve all the 'header-#' blocks
    // in the draft-js raw representation of each section
    // const headers = content && content.blocks && content.blocks
    // .filter(block => block.type.indexOf('header') === 0);

    let sectionActive = false;
    // title of the section
    const title = usedDocument.getElementById(section.id);
    if (title && title.offsetTop) {
      let nextTitleOffsetTop;
      // we will check if scroll is in this section's part of the page height
      const titleOffsetTop = title.offsetTop + offsetMax(title);
      // to do that we need the offset of the next element
      if (sectionIndex < story.sectionsOrder.length - 1) {
        const next = story.sectionsOrder[sectionIndex + 1];
        const nextTitle = usedDocument.getElementById(next);
        if (nextTitle) {
          nextTitleOffsetTop = nextTitle.offsetTop + offsetMax(title);
        }
      }
      if (titleOffsetTop <= scrollTop + usedWindow.innerHeight / 2 &&
          (nextTitleOffsetTop === undefined ||
            nextTitleOffsetTop >= scrollTop
          )
        ) {
        sectionActive = true;
      }
    }
    // eventually we format the headers for display
    return {
      level: sectionLevel,
      title: section.metadata.title || '',
      viewParams: {
        sectionId: section.id
      },
      viewType: 'section',
      active: sectionActive
    };
  });

  // adding special items to table of contents
  const hasReferences = Object.keys(citations.citationItems).length > 0;
  const hasGlossary = glossary.length > 0;

  if (hasReferences) {
    toc.push({
      level: 0,
      title: capitalize(locale.references || 'references'),
      viewType: 'references',
      viewParams: {},
    });
  }

  if (hasGlossary) {
    toc.push({
      level: 0,
      title: capitalize(locale.glossary || 'glossary'),
      viewType: 'glossary',
      viewParams: {},
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
export const getOffset = (el) => {
    let _x = 0;
    let _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft; // - el.scrollLeft;
        _y += el.offsetTop; // - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
};

const stylesRatios = {
  smaller: 0.6,
  small: 0.8,
  normal: 1,
  big: 1.2,
  bigger: 1.4,
};

const classToSize = klass => stylesRatios[klass];

export const stylesVariablesToCss = (styles = {}) => {
  let compiledStyles = '';
  if (styles.titles) {
    compiledStyles = compiledStyles + `
    .content-title .content-title--modifier, .section-title .section-title--modifier {
      color: ${styles.titles.color};
      font-size: ${classToSize(styles.titles.sizeClass)}em;
    }
    /*.table-of-contents .link-content {
      color: ${styles.titles.color};
    }*/
    `;
  }
  if (styles.background) {
    compiledStyles = compiledStyles + `
    .quinoa-story-player, .quinoa-story-player .nav {
      background: ${styles.background.color};
    }`;
  }
  if (styles.blockquotes) {
    compiledStyles = compiledStyles + `
    .content-blockquote .content-blockquote--modifier {
      color: ${styles.blockquotes.color};
    }
    body .quinoa-story-player .content-blockquote .content-blockquote--modifier {
      font-size: ${classToSize(styles.blockquotes.sizeClass)}em;
    }`;
  }
  if (styles.corpus) {
    compiledStyles = compiledStyles + `
    .quinoa-story-player {
      color: ${styles.corpus.color};
    }
    .content-p .content-p--modifier, .content-li .content-li--modifier {
      font-size: ${classToSize(styles.corpus.sizeClass)}em;
    }`;
  }
  if (styles.coverText) {
    compiledStyles = compiledStyles + `
    .header-story-title--modifier, .header-story-subtitle--modifier, .header-authors--modifier {
      color: ${styles.coverText.color};
      font-size: ${classToSize(styles.coverText.sizeClass)}em;
    }
    body .quinoa-story-player .header-container.with-cover .header-contents {
      background-color: rgba(0, 0, 0, ${styles.coverText.opacity});
    }`;
  }
  if (styles.links) {
    compiledStyles = compiledStyles + `
    .quinoa-story-player .contents-wrapper .content-a, .quinoa-story-player .glossary-mention, .quinoa-story-player .glossary-mention-backlink, .quinoa-story-player .csl-entry a, .quinoa-story-player .contents-wrapper .internal-link {
      border-bottom-color: ${styles.links.color};
    }
    body .quinoa-story-player .contents-wrapper .content-a:not(.bib):hover,
    body .quinoa-story-player .contents-wrapper .internal-link:not(.bib):hover,
    body .quinoa-story-player .glossary-mention:not(.bib):hover,
    body .quinoa-story-player .glossary-mention-backlink:not(.bib):hover,
    body .quinoa-story-player .quinoa-contextualization.bib:not(.bib):hover,
    body .quinoa-story-player .csl-entry a:not(.bib):hover
    {
      background: ${styles.links.color};
    }`;
  }
  return compiledStyles;
};


export const getTocAdjacentNavItems = (toc, testFn) => {
  let tocIndex;
  toc.some((item, itemIndex) => {
    if (testFn(item)) {
      tocIndex = itemIndex;
      return true;
    }
  });
  let prevItem;
  let nextItem;
  if (tocIndex > 0) {
    prevItem = toc[tocIndex - 1];
  }
  if (tocIndex < toc.length - 1) {
    nextItem = toc[tocIndex + 1];
  }
  return {
    prevItem,
    nextItem,
  };
};
