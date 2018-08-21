/**
 * This module exports a stateless reusable glossary mention component
 * ============
 * @module quinoa-story-player/components/GlossaryMention
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';


const WORDS_LIMIT = 30;

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
  let descriptionText = resource.metadata.description;
  if (descriptionText && descriptionText.length && descriptionText.split(' ').length > WORDS_LIMIT) {
    descriptionText = descriptionText.split(' ').slice(0, WORDS_LIMIT).join(' ') + '...';
  }
  return (<a
    id={'glossary-mention-' + contextualization.id}
    href={'#glossary-entry-' + resource.id}
    onClick={handleClick}
    className="glossary-mention">
    <span className="link-content" data-tip={descriptionText}>{children}</span>
    {
      descriptionText
      && descriptionText.length
      && <ReactTooltip place="right" className="tooltip-content" />}
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
