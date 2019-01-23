import React from 'react';
import PropTypes from 'prop-types';

const TableOfContents = ({
  // onClickTitle,
  metadata,
  // toggleIndex,
  // scrollToElementId,
  toc
}, { InternalLinkProvider }) => {
  return (
    <ul
      className="table-of-contents"
      style={{
                // marginTop: inCover ? 0 : '2em'
              }}>
      <li className="table-of-contents-title-container">
        <h2
          className="table-of-contents-title">
          <InternalLinkProvider
            to={{
              viewId: 'home'
            }}>
            {metadata.title || 'Quinoa story'}
          </InternalLinkProvider>
        </h2>
      </li>
      {
        toc && toc.map((item, index) => {
          return (
            <li
              key={index}
              className={'table-of-contents-item level-' + (item.level || 0) + (item.active ? ' active' : '')}>
              <InternalLinkProvider
                className="table-of-contents-link"
                to={{
                  viewType: item.viewType,
                  viewParams: item.viewParams
                }}>
                <span className="link-content">{item.title || 'Untitled section'}</span>
              </InternalLinkProvider>
              {/*<a
                className="table-of-contents-link"
                href={'#' + item.key}
                onClick={onClick}>
              </a>*/}
            </li>
          );
        })
      }
    </ul>
  );
};

TableOfContents.contextTypes = {
  InternalLinkProvider: PropTypes.func,
};

export default TableOfContents;
