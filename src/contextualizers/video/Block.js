import React, { Component } from 'react';

import Player from 'react-player';

import Measure from 'react-measure';

class VideoBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {}
    };
  }

  render = () => {
    const {
      props: {
        resource
      },
      state: {
        dimensions = {}
      }
    } = this;
    return (
      <Measure
        bounds
        onResize={(contentRect) => {
            this.setState({ dimensions: contentRect.bounds });
          }}>
        {
            ({ measureRef }) =>
              (<div ref={measureRef} className="quinoa-contextualization block video media-player-container">
                <Player width={dimensions.width} height={dimensions.height} url={resource.data.url} />
              </div>)
          }
      </Measure>
    );
  }
}

export default VideoBlock;
