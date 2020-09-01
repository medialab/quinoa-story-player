import React from 'react';
import InternalLinkProvider from './InternalLinkProvider';
import { abbrevString } from '../../../utils/misc';
const NavFooter = ({
  prevItem,
  nextItem,
  title
}) => (
  <ul className="nav-footer">
    <li className="prev-container">
      {prevItem &&
        <InternalLinkProvider
          to={prevItem}>
          <span className="nav-footer-item is-left">
            <span className="nav-footer-item-part part-arrow">←</span>
            <span className="nav-footer-item-part part-content">{abbrevString(prevItem.title, 50)}</span>
          </span>
        </InternalLinkProvider>}
    </li>
    <li className="current-title">
      <h5>{title ? abbrevString(title, 80) : ''}</h5>
    </li>
    <li className="next-container">
      {nextItem &&
      <InternalLinkProvider
        to={nextItem}>
        <span className="nav-footer-item is-right">
          <span className="nav-footer-item-part part-content">{abbrevString(nextItem.title, 50)}</span>
          <span className="nav-footer-item-part part-arrow">→</span>
        </span>
      </InternalLinkProvider>
        }
    </li>
  </ul>
);

export default NavFooter;
