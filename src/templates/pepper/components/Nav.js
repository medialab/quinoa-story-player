import React from 'react';

import TableOfContents from './TableOfContents';

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
  coverImage,
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
  if (currentView === 'home') {
    return null;
  }
  const menuOpened = (indexOpen || inCover);
  return (
    <nav
      className={'nav' + (indexOpen ? ' active' : '') + (inCover ? '' : ' fixed')}
      style={{
        position: inCover && coverImage ? 'absolute' : 'absolute',
        left: 0,
        // opacity: isDisplayed ? 1 : 0,
        // pointerEvents: isDisplayed ? undefined : 'none',
        // marginTop: (inCover && coverImage) || !inCover ? 0 : 0,
        // height: !(inCover && dimensions.width <= 700) ? dimensions && dimensions.height : 0,
      }}>
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
          toc={toc} />
      </div>
    </nav>
  );
};

export default Nav;
