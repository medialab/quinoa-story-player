import React from 'react';

import {
  capitalize
} from '../../../utils/misc';

const Glossary = ({
  locale,
  glossary,
  scrollToElementId,
}) => {
  return (
    <div className="glossary-container">
      <h2 className="glossary-title" id="glossary">{capitalize(locale.glossary || 'glossary')}</h2>
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
                    const target = 'glossary-mention-' + mention.id;
                    const onClick = e => {
                      e.preventDefault();
                      scrollToElementId(target);
                    };
                    return (
                      <a
                        key={mention.id}
                        onClick={onClick}
                        className="glossary-mention-backlink"
                        id={'glossary-mention-backlink-' + mention.id}
                        href={'#' + target}>
                        <span className="link-content">{count + 1}</span>
                      </a>
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
    </div>
  );
};

export default Glossary;
