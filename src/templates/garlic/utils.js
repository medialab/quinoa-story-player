import {
  capitalize
} from '../../utils/misc';

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

    let sectionActive;
    let nextTitleOffsetTop;
    // title of the section
    const title = usedDocument.getElementById(section.id);
    if (!title) {
      return undefined;
    }
    // we will check if scroll is in this section's part of the page height
    const titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
    // to do that we need the offset of the next element
    if (sectionIndex < story.sectionsOrder.length - 1) {
      const next = story.sectionsOrder[sectionIndex + 1];
      const nextTitle = usedDocument.getElementById(next);
      if (nextTitle) {
        nextTitleOffsetTop = nextTitle.offsetTop + title.offsetParent.offsetParent.offsetTop;
      }
    }
    if (titleOffsetTop <= scrollTop + usedWindow.innerHeight / 2 &&
        (nextTitleOffsetTop === undefined ||
          nextTitleOffsetTop >= scrollTop
        )
      ) {
      sectionActive = true;
    }
    // eventually we format the headers for display
    const sectionHeader = {
      level: sectionLevel,
      text: section.metadata.title || '',
      key: section.id,
      active: sectionActive
    };
    return [
      sectionHeader,
      // ...headerItems
      ];
    })
    .filter(el => el !== undefined)
    // flatten mini-tocs
    .reduce((result, ar) => [...result, ...ar], []);

  // adding special items to table of contents
  const hasReferences = Object.keys(citations.citationItems).length > 0;
  const hasGlossary = glossary.length > 0;
  const notesPosition = (story.settings.options && story.settings.options.notesPosition) || 'foot';
  const hasNotes = story.sectionsOrder.find(key => story.sections[key].notesOrder.length > 0) !== undefined;
  if (notesPosition === 'foot' && hasNotes) {
    let notesActive;
    let nextTitleOffsetTop;
    // title of the section
    const title = usedDocument.getElementById('notes');

    if (title) {
      // we will check if scroll is after glossary title
      const titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
      let nextTitleId;
      if (hasReferences) {
        nextTitleId = 'references';
      }
      else if (hasGlossary) {
        nextTitleId = 'glossary';
      }
      if (nextTitleId) {
        const nextTitle = usedDocument.getElementById(nextTitleId);
        if (nextTitle) {
          nextTitleOffsetTop = nextTitle.offsetTop + title.offsetParent.offsetParent.offsetTop;
        }
      }
      if (titleOffsetTop <= scrollTop + window.innerHeight / 2 &&
          (nextTitleOffsetTop === undefined ||
            nextTitleOffsetTop >= scrollTop
          )
        ) {
        notesActive = true;
      }
      toc.push({
        level: 0,
        text: capitalize(locale.notes || 'notes'),
        key: 'notes',
        active: notesActive
      });
    }
  }


  if (hasReferences) {
    let referencesActive;
    let nextTitleOffsetTop;
    // title of the section
    const title = usedDocument.getElementById('references');
    if (title) {
      // we will check if scroll is after glossary title
      const titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
      const nextTitle = usedDocument.getElementById('glossary');
      if (nextTitle) {
        nextTitleOffsetTop = nextTitle.offsetTop + title.offsetParent.offsetParent.offsetTop;
      }
      if (titleOffsetTop <= scrollTop + window.innerHeight / 2 &&
          (nextTitleOffsetTop === undefined ||
            nextTitleOffsetTop >= scrollTop
          )
        ) {
        referencesActive = true;
      }
      toc.push({
        level: 0,
        text: capitalize(locale.references || 'references'),
        key: 'references',
        active: referencesActive
      });
    }
  }

  if (hasGlossary) {
    let glossaryActive;
    let nextTitleOffsetTop;
    // title of the section
    const title = usedDocument.getElementById('glossary');
    if (title) {
      // we will check if scroll is after glossary title
      const titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
      if (titleOffsetTop <= scrollTop + usedWindow.innerHeight / 2 &&
          (nextTitleOffsetTop === undefined ||
            nextTitleOffsetTop >= scrollTop
          )
        ) {
        glossaryActive = true;
      }
      toc.push({
        level: 0,
        text: capitalize(locale.glossary || 'glossary'),
        key: 'glossary',
        active: glossaryActive
      });
    }
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
