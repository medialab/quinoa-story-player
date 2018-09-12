import React from 'react';
import PropTypes from 'prop-types';


const ImageBlock = ({
  resource
}, {
  getResourceDataUrl
}) => {
  const { data } = resource;
  let src;
  if (typeof getResourceDataUrl === 'function' && data.filePath) {
    src = getResourceDataUrl(data);
  }
  else {
    src = data.base64 || data.src;
  }
  return (
    <div className="quinoa-contextualization block image content-image">
      <img src={src} />
    </div>
  );
};

ImageBlock.contextTypes = {
  getResourceDataUrl: PropTypes.func
};

export default ImageBlock;
