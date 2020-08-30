import React from 'react';

import TableOfContents from './TableOfContents';

import { nestSummary } from '../utils';

const getCurrentView = location => {
  if (location.includes('section')) {
    return 'section';
  }
 else if (location.includes('glossary')) {
    return 'glossary';
  }
 else if (location.includes('references')) {
    return 'references';
  }
  else return 'home';
};

const Nav = ({
  indexOpen,
  inCover,
  placeholder,
  // dimensions,
  onClickToggle,
  onClickTitle,
  metadata,
  // isDisplayed,
  toggleIndex,
  scrollToElementId,
  toc,
  viewType,
  location,
}) => {
  const currentView = location ? getCurrentView(location.pathname) : viewType;
  const summary = nestSummary(toc);
  if (currentView === 'home') {
    return null;
  }
  const menuOpened = (indexOpen || inCover);
  return (
    <nav
      className={'nav' + (indexOpen ? ' active' : '') + (placeholder ? ' placeholder' : '')}>
      <div
        className="nav-content"
        style={{
          maxHeight: menuOpened ? '100%' : 0
        }}>
        <button
          className={'index-toggle ' + (indexOpen ? 'active' : '')}
          onClick={onClickToggle}>
          <span id="burger-menu" className={indexOpen ? 'open' : ''}>
            <span />
            <span />
            <span />
            <span />
          </span>
        </button>
        {
          /**
           * Table of contents
           */
        }
        <TableOfContents
          onClickTitle={onClickTitle}
          metadata={metadata}
          toggleIndex={toggleIndex}
          scrollToElementId={scrollToElementId}
          toc={summary} />
      </div>
    </nav>
  );
};

export default Nav;
