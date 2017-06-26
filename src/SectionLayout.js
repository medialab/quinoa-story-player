import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Renderer from './Renderer';

class SectionLayout extends Component {

  constructor(props) {
    super(props);

  }

  getChildContext = () => {
    return {
      notes: this.props.section && this.props.section.notes
    };
  }
  render() {
    const {
      section = {}
    } = this.props;
    const {
      contents,
      metadata,
    } = section;
    return (
      <section className="section">
        <div className="section-header">
          {
            metadata && metadata.title &&
            <h2 id={section.id}>{metadata.title}</h2>
          }
          {
            metadata &&
            metadata.authors &&
            metadata.authors.length > 0 &&
            metadata.authors.map((author) => author)
          }
        </div>
        <div className="section-body">
          <Renderer raw={contents} />
        </div>
      </section>
    );
  }
}

SectionLayout.childContextTypes = {
  notes: PropTypes.object,
};
export default SectionLayout;
