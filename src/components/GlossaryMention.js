import React from 'react';
import PropTypes from 'prop-types';

const GlossaryMention = ({
  resource,
  contextualizer,
  contextualization,
}) => {
  const name = contextualizer.alias || resource.data.name;
  return <a 
          id={'glossary-mention-' + contextualization.id} 
          href={"#glossary-entry-" + resource.id}
          className="glossary-mention"
        >
          <b>{name}</b>
        </a>
};
export default GlossaryMention;
