import React from 'react';
import Tooltip from './Tooltip';


const Info = ({
  message,
  place = 'right'
}) => {
  return (
    <span
      className="info-pill">
      <Tooltip html content={message} place={place}>
        i
      </Tooltip>
    </span>
  );
};

export default Info;
