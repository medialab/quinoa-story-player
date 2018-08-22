import React from 'react';

import TableOfContents from './TableOfContents';

const Nav = ({
  indexOpen,
  inCover,
  coverImage,
  dimensions,
  onClickToggle,
  onClickTitle,
  metadata,
  isDisplayed,
  toc
}) => {
  const menuOpened = (indexOpen || inCover);
  return (
    <nav
      className={'nav' + (indexOpen ? ' active' : '') + (inCover ? '' : ' fixed')}
      style={{
                    position: inCover && coverImage ? 'relative' : 'absolute',
                    left: 0,
                    opacity: isDisplayed ? 1 : 0,
                    pointerEvents: isDisplayed ? undefined : 'none',
                    marginTop: (inCover && coverImage) || !inCover ? 0 : '3rem',
                    height: dimensions && dimensions.height,
                  }}>
      <div
        className="nav-content"
        style={{
                        maxHeight: menuOpened ? '100%' : 0
                      }}>
        <button
          className={'index-toggle ' + (menuOpened ? 'active' : '')}
          style={{
                        opacity: inCover ? 0 : 1
                      }}
          onClick={onClickToggle}>
          <span id="burger-menu" className={menuOpened ? 'open' : ''}>
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
          toc={toc} />
      </div>
    </nav>
  );
};

export default Nav;
