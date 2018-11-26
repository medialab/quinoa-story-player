'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  return _react2.default.createElement(
    'a',
    {
      id: 'glossary-mention-' + contextualization.id,
      href: '#glossary-entry-' + resource.id,
      onClick: handleClick,
      className: 'quinoa-contextualization inline glossary glossary-mention',
      'data-for': 'tooltip',
      'data-tip': resource.data.description ? resource.data.description : undefined },
    _react2.default.createElement(
      'span',
      { className: 'link-content' },
      children
    )
  );
};
GlossaryMention.propTypes = {
  resource: _propTypes2.default.object,
  contextualizer: _propTypes2.default.object,
  contextualization: _propTypes2.default.object
};

exports.default = GlossaryMention;