/**
 * This module exports a stateless reusable link component
 * ============
 * @module quinoa-story-player/components/Link
 */
import React from 'react';

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
}) => (
  <a
    href={resource.data.url}
    target="_blank"
    className="quinoa-contextualization inline webpage content-a"
    alt="href"
    rel="noopener"

    data-for="tooltip"
    data-tip={`${resource.metadata.title} (${resource.data.url})`}>
    {children}
  </a>
);

export default Link;
