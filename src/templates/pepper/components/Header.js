import React from 'react';
import TableOfContents from './TableOfContents';

const Header = ({
  scrollToContents,
  coverImage,
  getResourceDataUrl,
  bindRef,
  metadata,
  locale = {},
  toc,
}) => {
  return (
    <header
      onClick={scrollToContents}
      className={`header-container ${coverImage ? 'with-cover' : ''}`}
      ref={bindRef}
      style={{
      backgroundImage: coverImage ?
        `url(${coverImage.filePath ?
            getResourceDataUrl(coverImage)
          :
            coverImage.base64}`
        :
         undefined,
    }}>
      <div
        className="header-contents">
        <div className="story-global-info-container">
          <h1 className="header-story-title">
            <span className="header-story-title--modifier">{metadata.title || 'Quinoa story'}</span>
          </h1>
          {
          metadata.subtitle &&
            <h2 className="header-story-subtitle">
              <span className="header-story-subtitle--modifier">{metadata.subtitle}</span>
            </h2>
        }
          {
          metadata.authors && metadata.authors.length ?
            <div className="header-story-authors">
              <span className="header-authors--modifier">{metadata.authors.map(author => author).join(', ')}</span>
            </div>
          :
            null
        }
          {
          metadata.abstract && metadata.abstract.length ?
            <blockquote className="header-story-abstract">
              {metadata.abstract}
            </blockquote>
          :
            null
        }
        </div>
        <div className="header-toc-container">
          <h2 className="toc-title">
            {locale['Table of contents'] || 'Table of contents'}
          </h2>
          <TableOfContents
            toc={toc} />
        </div>
      </div>
    </header>
  );
};

export default Header;
