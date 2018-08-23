'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WORDS_LIMIT = 30;

var GlossaryMention = function GlossaryMention(_ref) {
  var resource = _ref.resource,
      contextualization = _ref.contextualization,
      onClick = _ref.onClick,
      children = _ref.children;

  var handleClick = function handleClick(e) {
    e.preventDefault();
    if (typeof onClick === 'function') {
      onClick();
    }
  };
  var descriptionText = resource.metadata.description;
  if (descriptionText && descriptionText.length && descriptionText.split(' ').length > WORDS_LIMIT) {
    descriptionText = descriptionText.split(' ').slice(0, WORDS_LIMIT).join(' ') + '...';
  }
  return _react2.default.createElement(
    'a',
    {
      id: 'glossary-mention-' + contextualization.id,
      href: '#glossary-entry-' + resource.id,
      onClick: handleClick,
      className: 'quinoa-contextualization inline glossary glossary-mention' },
    _react2.default.createElement(
      'span',
      { className: 'link-content', 'data-tip': descriptionText },
      children
    ),
    descriptionText && descriptionText.length && _react2.default.createElement(_reactTooltip2.default, { place: 'right', className: 'tooltip-content' })
  );
};
GlossaryMention.propTypes = {
  resource: _propTypes2.default.object,
  contextualizer: _propTypes2.default.object,
  contextualization: _propTypes2.default.object
};

exports.default = GlossaryMention;