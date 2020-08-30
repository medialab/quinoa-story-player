/**
 * This module exports a stateless reusable glossary mention component
 * ============
 * @module quinoa-story-player/components/GlossaryMention
 */
import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../../components/Tooltip';


/**
 * Renders a block asset wrapper as a pure component
 * @param {object} props - properties provided by parent
 * @param {object} props.resource - initial glossary resource
 * @param {object} props.contextualizer - contextualizing information such as alias to use for the mention
 * @param {object} props.contextualization - the contextualization to consume for identifying this specific mention
 * @return {ReactElement} component - the component
 */
const GlossaryMention = ({
  resource,
  // contextualizer,
  contextualization,
  onClick,
  children
}) => {
  // const name = contextualizer.alias || resource.data && resource.data.name;
  const handleClick = e => {
    e.preventDefault();
    if (typeof onClick === 'function') {
      onClick();
    }
  };
  // let descriptionText = resource.data.description;
  // if (descriptionText && descriptionText.length && descriptionText.split(' ').length > WORDS_LIMIT) {
  //   descriptionText = descriptionText.split(' ').slice(0, WORDS_LIMIT).join(' ') + '...';
  // }

  return (
    <a
      id={'glossary-mention-' + contextualization.id}
      href={'#glossary-entry-' + resource.id}
      onClick={handleClick}
      className="quinoa-contextualization inline glossary glossary-mention">
      {
          resource.data.description ?
            <Tooltip content={resource.data.description ? resource.data.description : undefined}>
              <span className="link-content">{children}</span>
            </Tooltip>
          :
            <span className="link-content">{children}</span>
        }
    </a>
  );
};
/**
 * Component's properties types
 */
GlossaryMention.propTypes = {
  /**
   * initial glossary resource
   */
  resource: PropTypes.object,
  /**
   * contextualizing information such as alias to use for the mention
   */
  contextualizer: PropTypes.object,
  /**
   * the contextualization to consume for identifying this specific mention
   */
  contextualization: PropTypes.object,
};

export default GlossaryMention;
