import React from 'react';

import Renderer from './Renderer';

const SectionLayout = ({
  section = {}
}) => {
  const {
    contents,
    metadata,
  } = section;
  return (
    <section className="section">
      <div className="section-header">
        {
          metadata && metadata.title &&
          <h2 id={section.id}>{metadata.title}</h2>
        }
        {
          metadata &&
          metadata.authors &&
          metadata.authors.length > 0 &&
          metadata.authors.map((author) => author)
        }
      </div>
      <div className="section-body">
        <Renderer raw={contents} />
      </div>
    </section>
  );
};

export default SectionLayout;
