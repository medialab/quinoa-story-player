import React from 'react';

import {
  capitalize
} from '../../../utils/misc';
import NavFooter from './NavFooter';
import InternalLinkProvider from './InternalLinkProvider';

const Glossary = ({
  locale,
  glossary,
  prevItem,
  nextItem,
}) => {
  const title = capitalize(locale.glossary || 'glossary');
  return (
    <div className="glossary-container">
      <h1 className="glossary-title section-title" id="glossary">
        <span className="section-title--modifier">
          {title}
        </span>
      </h1>
      <ul className="glossary-mentions-container">
        {
      glossary
      .sort((a, b) => {
        if (a.resource.data.name > b.resource.data.name) {
          return 1;
        }
        return -1;
      })
      .map((entry, index) => {
        const entryName = entry.resource.data.name;
        return (
          <li className="glossary-entry" key={index} id={'glossary-entry-' + entry.resource.id}>
            <h3 className="glossary-entry-title">{entryName} <i>({
                  entry.mentions.map((mention, count) => {
                    return (
                      <InternalLinkProvider
                        key={mention.id}
                        className="glossary-mention-backlink"
                        id={'glossary-mention-backlink-' + mention.id}
                        to={{
                          viewType: 'section',
                          viewParams: {
                            sectionId: mention.sectionId,
                            focusOnId: `glossary-mention-${mention.id}`
                          }
                        }}>
                        {count + 1}
                      </InternalLinkProvider>
                    );
                  })
                  .reduce((prev, curr) => [prev, ', ', curr])
                })</i>
            </h3>
            {entry.resource.data.description && <p>
              {entry.resource.data.description}
            </p>}
          </li>
        );
      })
     }
      </ul>
      <NavFooter
        prevItem={prevItem}
        nextItem={nextItem}
        title={title} />
    </div>
  );
};

export default Glossary;
