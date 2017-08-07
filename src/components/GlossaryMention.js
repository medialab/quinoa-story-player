/**
 * This module exports a stateless reusable glossary mention component
 * ============
 * @module quinoa-story-player/components/GlossaryMention
 */
import React from 'react';
import PropTypes from 'prop-types';

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
  contextualizer,
  contextualization,
  onClick
}) => {
  const name = contextualizer.alias || resource.data && resource.data.name;
  const handleClick = e => {
    e.preventDefault();
    if (typeof onClick === 'function') {
      onClick();
    }
  };
  return (<a
    id={'glossary-mention-' + contextualization.id}
    href={'#glossary-entry-' + resource.id}
    onClick={handleClick}
    className="glossary-mention">
    <span className="link-content">{name}</span>
  </a>);
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
