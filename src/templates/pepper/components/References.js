import React from 'react';

import NavFooter from './NavFooter';
import Bibliography from '../../../components/Bibliography';


const References = ({
  prevItem,
  nextItem,
  title,
  ...props
}) => (
  <div className="glossary-container">
    <h1 className="section-title">
      <span className="section-title--modifier">
        {title}
      </span>
    </h1>
    <Bibliography {...props} />
    <NavFooter
      prevItem={prevItem}
      nextItem={nextItem}
      title={title} />
  </div>
);

export default References;
