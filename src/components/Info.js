import React from 'react';


const Info = ({
  message,
  place = 'right'
}) => {
  return (
    <span
      className="info-pill"
      data-for="tooltip"
      data-html={true}
      data-tip={message}
      data-effect={'float'}
      data-place={place}
    >
      i
    </span>
  )
}

export default Info;