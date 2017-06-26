import React from 'react';

const Link = ({
  to,
  children
}) => <a href={to} target="blank">{children}</a>;

export default Link;
