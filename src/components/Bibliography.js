/**
 * This module exports a stateless reusable bibliography wrapper component
 * ============
 * @module quinoa-story-player/components/BlockAssetPlayer
 */

import React from 'react';
import PropTypes from 'prop-types';


/**
 * Renders a block asset player as a pure component
 * @param {object} props
 * @param {object} context
 * @param {array} context.bibliography - an array of strings & react elements representing each reference
 * @return {ReactElement} component - the component
 */
const BibliographyWrapper = (unusedProps, {
  bibliography,
}) => {
  return (
    <section className="references">
      <h2>References</h2>
      <div>{bibliography}</div>
    </section>
  );
};
/**
 * Component's properties types
 */
BibliographyWrapper.propTypes = {};
/**
 * Component's context used properties
 */
BibliographyWrapper.contextTypes = {
  /**
   * Array of strings and react elements
   */
  bibliography: PropTypes.array,
};

export default BibliographyWrapper;
