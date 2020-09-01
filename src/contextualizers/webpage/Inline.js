/**
 * This module exports a stateless reusable link component
 * ============
 * @module quinoa-story-player/components/Link
 */
import React from 'react';
import Tooltip from '../../components/Tooltip';

/**
 * Renders a link as a pure component
 * @param {object} props
 * @param {string} props.to - the url to point to
 * @param {array} props.children - children elements of the component
 * @return {ReactElement} component - the component
 */
const Link = ({
  resource,
  children
}) => {
  const tooltip = (!resource.metadata.title.length || resource.metadata.title === resource.data.url) ? resource.data.url : `${resource.metadata.title} (${resource.data.url})`;
  return (
    <a
      href={resource.data.url}
      target="_blank"
      className="quinoa-contextualization inline webpage content-a"
      alt="href"
      rel="noopener noreferrer">
      <Tooltip content={tooltip}>
        {children}
      </Tooltip>
    </a>
  );
};

export default Link;
