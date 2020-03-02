import React from 'react';

const Tooltip = ({
  children,
  content,
  html,
  // place
}) => (
  <div className="tooltip">
    {children}
    <div className="top">
      {html ?
        <div
          dangerouslySetInnerHTML={{ /* eslint react/no-danger: 0 */
           __html: content
        }} />
        : content
      }
      <i />
    </div>
  </div>
);

export default Tooltip;
