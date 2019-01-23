/**
 * This module exports a stateless reusable internal link component
 * ============
 * @module quinoa-story-player/components/InternalLink
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a block asset wrapper as a pure component
 * @param {object} props
 * @param {object} props.data - the data initially embedded in a draft-js entity
 * @param {object} context - the context data passed to the component
 * @return {ReactElement} component - the component
 */
const InternalLink = ({
  data,
  children
}, {
  onInternalLinkClick,
  InternalLinkProvider,
}) => {
  const handleClick = () => {
    onInternalLinkClick(data.sectionId);
  };
  if (typeof InternalLinkProvider === 'function') {
    return (
      <InternalLinkProvider
        to={data}>
        {children}
      </InternalLinkProvider>
    );
  }
  return (
    <span
      onClick={handleClick}
      className="internal-link">
      {children}
    </span>
  );
};

/**
 * Component's properties types
 */
InternalLink.propTypes = {
  /**
   * Corresponds to the data initially embedded in a draft-js entity
   */
  data: PropTypes.shape({
    sectionId: PropTypes.string
  }),
};
/**
 * Component's context used properties
 */
InternalLink.contextTypes = {
  story: PropTypes.object,
  /**
   * Callbacks when a glossary mention is clicked
   */
  onInternalLinkClick: PropTypes.func,
  InternalLinkProvider: PropTypes.func,
};

export default InternalLink;
