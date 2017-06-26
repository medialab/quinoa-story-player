/* eslint react/no-danger : 0 */
import React from 'react';
import {Media, Player} from 'react-media-player';
import QuinoaPresentationPlayer from 'quinoa-presentation-player';

import './AssetPreview.scss';

const AssetPreview = ({
  type,
  resource,
  options,
  fixed,
  allowInteractions,
  onExit
}) => {
  switch (type) {
    case 'image':
      // future-proofing possible externally linked images
      const src = resource.data.base64 || resource.data.src || resource.data.url;
      return <img src={src} />;
    case 'video':
      return (
        <Media>
          <Player src={resource.data.url} />
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
          presentation={resource.data}
          template={(options && options.template)}
          onWheel={onWheel}
          onExit={onExit}
          style={{
            position: fixed ? 'fixed' : 'absolute',
            pointerEvents: allowInteractions ? 'all' : 'none'
          }} />
      );
    case 'embed':
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: resource.data
          }} />
      );
    default:
      return null;
  }
};

export default AssetPreview;
