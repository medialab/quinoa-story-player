import React from 'react';
import PropTypes from 'prop-types';

const TocItem = ({
  item,
  InternalLinkProvider,
  toggleIndex
}) => {
  return (
    <li
      className={'table-of-contents-item level-' + (item.level || 0) + (item.active ? ' active' : '')}>
      <div className="table-of-contents-item-contents background-color--modifier" onClick={() => toggleIndex(false)}>
        <InternalLinkProvider
          className={'table-of-contents-link'}
          to={{
            viewType: item.viewType,
            viewParams: item.viewParams
          }}>
          <span className={'section-title-color--modifier'}><span className="link-content">{item.title || 'Untitled section'}</span></span>
        </InternalLinkProvider>
      </div>
      {
        item.children ?
          <ul className="toc-children-container">
            {
            item.children.map((item2, index) => (
              <TocItem
                toggleIndex={toggleIndex}
                key={index}
                InternalLinkProvider={InternalLinkProvider}
                item={item2} />
            ))
          }
          </ul>
        : null
      }
    </li>
  );
};

const TableOfContents = ({
  // onClickTitle,
  metadata,
  // inHeader = false,
  toggleIndex,
  // scrollToElementId,
  toc
}, { InternalLinkProvider }) => {
  return (
    <ul
      className="table-of-contents background-color--modifier"
      style={{
                // marginTop: inCover ? 0 : '2em'
              }}>
      {
        metadata &&
        <li className="table-of-contents-title-container">
          <h2
            className={'table-of-contents-title'}>
            <InternalLinkProvider
              to={{
                viewId: 'home'
              }}>
              <span className="section-title-color--modifier">{metadata.title || 'Quinoa story'}</span>
            </InternalLinkProvider>
          </h2>
        </li>
      }
      {
        toc && toc.map((item, index) => {
          return (
            <TocItem
              key={index} toggleIndex={toggleIndex} InternalLinkProvider={InternalLinkProvider}
              item={item} />
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
