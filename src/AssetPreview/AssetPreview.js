/* eslint react/no-danger : 0 */
import React from 'react';
import {Media, Player} from 'react-media-player';
import QuinoaPresentationPlayer from 'quinoa-presentation-player';

import './AssetPreview.scss';

const AssetPreview = ({
  type,
  data
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
      return (
        <QuinoaPresentationPlayer
          presentation={data} />
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
