import React from 'react';

export default ({
  resource
}) => (
  <div
    className="quinoa-contextualization block embed embed-container"
    dangerouslySetInnerHTML={{
      __html: resource.data.html /* eslint react/no-danger : 0 */
    }} />
);
