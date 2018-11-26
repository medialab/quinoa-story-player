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
          {metadata.title || 'Quinoa story'}
        </h1>
        {
          metadata.subtitle &&
            <h2 className="header-story-subtitle">
              {metadata.subtitle}
            </h2>
        }
        {
          metadata.authors && metadata.authors.length ?
            <div className="header-authors">
              {
              metadata.authors.map(author => author).join(', ')
            }
            </div>
          :
            null
        }
      </div>
    </header>
  );
};

export default Header;
