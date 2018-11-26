'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _misc = require('../../../utils/misc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Glossary = function Glossary(_ref) {
  var locale = _ref.locale,
      glossary = _ref.glossary,
      scrollToElementId = _ref.scrollToElementId;

  return _react2.default.createElement(
    'div',
    { className: 'glossary-container' },
    _react2.default.createElement(
      'h2',
      { className: 'glossary-title', id: 'glossary' },
      (0, _misc.capitalize)(locale.glossary || 'glossary')
    ),
    _react2.default.createElement(
      'ul',
      { className: 'glossary-mentions-container' },
      glossary.sort(function (a, b) {
        if (a.resource.data.name > b.resource.data.name) {
          return 1;
        }
        return -1;
      }).map(function (entry, index) {
        var entryName = entry.resource.data.name;
        return _react2.default.createElement(
          'li',
          { className: 'glossary-entry', key: index, id: 'glossary-entry-' + entry.resource.id },
          _react2.default.createElement(
            'h3',
            { className: 'glossary-entry-title' },
            entryName,
            ' ',
            _react2.default.createElement(
              'i',
              null,
              '(',
              entry.mentions.map(function (mention, count) {
                var target = 'glossary-mention-' + mention.id;
                var onClick = function onClick(e) {
                  e.preventDefault();
                  scrollToElementId(target);
                };
                return _react2.default.createElement(
                  'a',
                  {
                    key: mention.id,
                    onClick: onClick,
                    className: 'glossary-mention-backlink',
                    id: 'glossary-mention-backlink-' + mention.id,
                    href: '#' + target },
                  _react2.default.createElement(
                    'span',
                    { className: 'link-content' },
                    count + 1
                  )
                );
              }).reduce(function (prev, curr) {
                return [prev, ', ', curr];
              }),
              ')'
            )
          ),
          entry.resource.data.description && _react2.default.createElement(
            'p',
            null,
            entry.resource.data.description
          )
        );
      })
    )
  );
};

exports.default = Glossary;