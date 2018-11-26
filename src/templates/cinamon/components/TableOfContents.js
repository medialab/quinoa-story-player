import React from 'react';

const TableOfContents = ({
  onClickTitle,
  metadata,
  toggleIndex,
  scrollToElementId,
  toc
}) => {
  return (
    <ul
      className="table-of-contents"
      style={{
                // marginTop: inCover ? 0 : '2em'
              }}>
      <li className="table-of-contents-title-container">
        <h2
          className="table-of-contents-title"
          onClick={onClickTitle}>{metadata.title || 'Quinoa story'}</h2>
      </li>
      {
                    toc && toc.map((item, index) => {
                      const onClick = (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        scrollToElementId(item.key);
                        toggleIndex();
                      };
                      return (
                        <li
                          key={index}
                          className={'table-of-contents-item level-' + item.level + (item.active ? ' active' : '')}>
                          <a
                            className="table-of-contents-link"
                            href={'#' + item.key}
                            onClick={onClick}>
                            <span className="link-content">{item.text || 'Untitled section'}</span>
                          </a>
                        </li>
                      );
                    })
                  }
    </ul>
  );
};

export default TableOfContents;
