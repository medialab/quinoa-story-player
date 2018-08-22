'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TableOfContents = require('./TableOfContents');

var _TableOfContents2 = _interopRequireDefault(_TableOfContents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Nav = function Nav(_ref) {
  var indexOpen = _ref.indexOpen,
      inCover = _ref.inCover,
      coverImage = _ref.coverImage,
      dimensions = _ref.dimensions,
      onClickToggle = _ref.onClickToggle,
      onClickTitle = _ref.onClickTitle,
      metadata = _ref.metadata,
      isDisplayed = _ref.isDisplayed,
      toc = _ref.toc;

  var menuOpened = indexOpen || inCover;
  return _react2.default.createElement(
    'nav',
    {
      className: 'nav' + (indexOpen ? ' active' : '') + (inCover ? '' : ' fixed'),
      style: {
        position: inCover && coverImage ? 'relative' : 'absolute',
        left: 0,
        opacity: isDisplayed ? 1 : 0,
        pointerEvents: isDisplayed ? undefined : 'none',
        marginTop: inCover && coverImage || !inCover ? 0 : '3rem',
        height: dimensions && dimensions.height
      } },
    _react2.default.createElement(
      'div',
      {
        className: 'nav-content',
        style: {
          maxHeight: menuOpened ? '100%' : 0
        } },
      _react2.default.createElement(
        'button',
        {
          className: 'index-toggle ' + (menuOpened ? 'active' : ''),
          style: {
            opacity: inCover ? 0 : 1
          },
          onClick: onClickToggle },
        _react2.default.createElement(
          'span',
          { id: 'burger-menu', className: menuOpened ? 'open' : '' },
          _react2.default.createElement('span', null),
          _react2.default.createElement('span', null),
          _react2.default.createElement('span', null),
          _react2.default.createElement('span', null)
        )
      ),
      _react2.default.createElement(_TableOfContents2.default, {
        onClickTitle: onClickTitle,
        metadata: metadata,
        toc: toc })
    )
  );
};

exports.default = Nav;