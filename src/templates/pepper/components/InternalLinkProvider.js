import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const InternalLinkProvider = ({
  children,
  className = '',
  to = {
    viewParams: {}
  }
}, {
  previewMode,
  navigateTo,
  activeView = {
    viewType: 'home',
    viewParams: {}
  },
}) => {
  const {
    viewParams = {},
    viewType = 'home',
  } = to;
  if (previewMode) {
    const handleClick = () => {
      navigateTo(to);
    };
    const isActive = activeView.viewType === viewType &&
      Object.keys(viewParams).filter(paramKey => viewParams[paramKey] !== activeView.viewParams[paramKey]).length === 0;
    return (
      <span
        onClick={handleClick}
        className={`internal-link ${className} ${isActive ? 'active' : ''}`}>
        {children}
      </span>
    );
  }
  let target;
  switch (viewType) {
    case 'section':
      target = `/sections/${viewParams.sectionId}${viewParams.focusOnId ? `?focusOnId=${viewParams.focusOnId}` : ''}`;
      break;

    case 'notes':
    case 'references':
    case 'glossary':
    case 'home':
    default:
      target = `/${viewType}/`;
      break;
  }
  return (
    <NavLink
      to={target}
      activeClassName="active"
      className={className}>
      {children}
    </NavLink>
  );
};

InternalLinkProvider.contextTypes = {
  navigateTo: PropTypes.func,
  previewMode: PropTypes.bool,
  activeView: PropTypes.object,
};

export default InternalLinkProvider;
