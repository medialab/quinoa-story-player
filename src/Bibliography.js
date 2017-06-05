import React from 'react';
import PropTypes from 'prop-types';


const Bib = ({

}, {
  bibliography,
}) => {
  return (
    <section className="references">
      <h2>References</h2>
      <div>{bibliography}</div>
    </section>
  );
};

Bib.contextTypes = {
  bibliography: PropTypes.object,
};

export default Bib;
