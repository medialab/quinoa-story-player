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
          ← {abbrevString(prevItem.title)}
        </InternalLinkProvider>}
    </li>
    <li className="current-title">
      <h5>{title || ''}</h5>
    </li>
    <li className="next-container">
      {nextItem &&
      <InternalLinkProvider
        to={nextItem}>
        {abbrevString(nextItem.title)} →
      </InternalLinkProvider>
        }
    </li>
  </ul>
);

export default NavFooter;
