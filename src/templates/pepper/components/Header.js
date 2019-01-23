import React from 'react';


const Header = ({
  scrollToContents,
  coverImage,
  getResourceDataUrl,
  bindRef,
  metadata,
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
            <div className="header-authors">
              <span className="header-authors--modifier">{metadata.authors.map(author => author).join(', ')}</span>
            </div>
          :
            null
        }
      </div>
    </header>
  );
};

export default Header;
