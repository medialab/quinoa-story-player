import React from 'react';

import Player from 'react-player';


const VideoBlock = ({
  resource
}) => {
  return (
    <div className="quinoa-contextualization block video media-player-container">
      <Player url={resource.data.url} />
    </div>
  );
};
export default VideoBlock;
