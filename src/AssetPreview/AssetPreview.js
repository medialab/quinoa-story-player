/* eslint react/no-danger : 0 */
import React from 'react';
import {Media, Player} from 'react-media-player';
import QuinoaPresentationPlayer from 'quinoa-presentation-player';

import './AssetPreview.scss';

const AssetPreview = ({
  type,
  data,
  options,
  fixed,
  onExit
}) => {
  switch (type) {
    case 'image':
      return <img src={data} />;
    case 'video':
      return (
        <Media>
          <Player src={data} />
        </Media>
      );
    case 'data-presentation':
      const onWheel = e => {
        if (fixed) {
          e.stopPropagation();
          e.preventDefault();
        }
      };
      return (
        <QuinoaPresentationPlayer
          presentation={data}
          template={(options && options.template)}
          onWheel={onWheel}
          onExit={onExit}
          style={{
            position: fixed ? 'fixed' : 'absolute',
            pointerEvents: fixed ? 'all' : 'none'
          }} />
      );
    case 'embed':
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: data
          }} />
      );
    default:
      return null;
  }
};

export default AssetPreview;
