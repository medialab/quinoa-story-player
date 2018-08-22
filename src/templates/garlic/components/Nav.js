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
  return (
    <nav
      className={'nav' + (indexOpen ? ' active' : '') + (inCover ? '' : ' fixed')}
      style={{
                    position: inCover && coverImage ? 'relative' : 'absolute',
                    left: 0,
                    opacity: isDisplayed ? 1 : 0,
                    pointerEvents: isDisplayed ? 'all': 'none',
                    marginTop: (inCover && coverImage) || !inCover ? 0 : '3rem',
                    height: dimensions && dimensions.height,
                  }}>
      <div
        className="nav-content"
        style={{
                        maxHeight: (indexOpen || inCover) ? '100%' : 0
                      }}>
        <button
          className={'index-toggle ' + ((indexOpen || inCover) ? 'active' : '')}
          style={{
                        opacity: inCover ? 0 : 1
                      }}
          onClick={onClickToggle}>
          <span id="burger-menu" className={(indexOpen || inCover) ? 'open' : ''}>
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
