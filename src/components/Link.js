/**
 * This module exports a stateless reusable link component
 * ============
 * @module quinoa-story-player/components/Link
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a link as a pure component
 * @param {object} props
 * @param {string} props.to - the url to point to
 * @param {array} props.children - children elements of the component
 * @return {ReactElement} component - the component
 */
const Link = ({
  to,
  children
}) => (<a href={to} target="blank">
  <span className="link-placeholder">{children}</span>
  <span className="link-content">{children}</span>
</a>);

/**
 * Component's properties types
 */
Link.propTypes = {
  /**
   * url to point to
   */
  to: PropTypes.string,
  /**
   * children react elements
   */
  children: PropTypes.array
};

export default Link;
