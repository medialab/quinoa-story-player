import React, { Component } from 'react';

class EmbedContainer extends Component {

  shouldComponentUpdate = nextProps => {
    return this.props.resource && nextProps.resource && this.props.resource.data.html !== nextProps.resource.data.html;
  }
  render = () => {
    const {
      resource
    } = this.props;
    return (
      <div
        className="quinoa-contextualization block embed embed-container"
        dangerouslySetInnerHTML={{
          __html: resource.data.html /* eslint react/no-danger : 0 */
        }} />
    );
  }
}

export default EmbedContainer;
