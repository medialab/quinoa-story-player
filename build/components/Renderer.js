'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redraft = require('redraft');

var _redraft2 = _interopRequireDefault(_redraft);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _BlockAssetWrapper = require('./BlockAssetWrapper');

var _BlockAssetWrapper2 = _interopRequireDefault(_BlockAssetWrapper);

var _InlineAssetWrapper = require('./InlineAssetWrapper');

var _InlineAssetWrapper2 = _interopRequireDefault(_InlineAssetWrapper);

var _NotePointer = require('./NotePointer');

var _NotePointer2 = _interopRequireDefault(_NotePointer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addBreaklines = function addBreaklines(children) {
  return children.map(function (child) {
    return [child, _react2.default.createElement('br', null)];
  });
};

var renderers = {
  inline: {
    BOLD: function BOLD(children, _ref) {
      var key = _ref.key;
      return _react2.default.createElement(
        'strong',
        { key: key },
        children
      );
    },
    ITALIC: function ITALIC(children, _ref2) {
      var key = _ref2.key;
      return _react2.default.createElement(
        'em',
        { key: key },
        children
      );
    },
    UNDERLINE: function UNDERLINE(children, _ref3) {
      var key = _ref3.key;
      return _react2.default.createElement(
        'u',
        { key: key },
        children
      );
    },
    CODE: function CODE(children, _ref4) {
      var key = _ref4.key;
      return _react2.default.createElement(
        'span',
        { key: key },
        children
      );
    }
  },
  blocks: {
    'unstyled': function unstyled(children) {
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'p',
          { className: 'unstyled', key: index },
          child
        );
      });
    },
    'blockquote': function blockquote(children) {
      return _react2.default.createElement(
        'blockquote',
        null,
        addBreaklines(children)
      );
    },
    'header-one': function headerOne(children, _ref5) {
      var keys = _ref5.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h1',
          { key: index, id: keys[index] },
          child
        );
      });
    },
    'header-two': function headerTwo(children, _ref6) {
      var keys = _ref6.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h2',
          { key: index, id: keys[index] },
          child
        );
      });
    },
    'header-three': function headerThree(children, _ref7) {
      var keys = _ref7.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h3',
          { key: index, id: keys[index] },
          child
        );
      });
    },
    'header-four': function headerFour(children, _ref8) {
      var keys = _ref8.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h4',
          { key: index, id: keys[index] },
          child
        );
      });
    },
    'header-five': function headerFive(children, _ref9) {
      var keys = _ref9.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h5',
          { key: index, id: keys[index] },
          child
        );
      });
    },
    'header-six': function headerSix(children, _ref10) {
      var keys = _ref10.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h6',
          { key: index, id: keys[index] },
          child
        );
      });
    },

    'code-block': function codeBlock(children, _ref11) {
      var keys = _ref11.keys;
      return _react2.default.createElement(
        'pre',
        { key: keys[0] },
        addBreaklines(children)
      );
    },
    'unordered-list-item': function unorderedListItem(children, _ref12) {
      var depth = _ref12.depth,
          keys = _ref12.keys;
      return _react2.default.createElement(
        'ul',
        { key: keys[keys.length - 1], className: 'ul-level-' + depth },
        children.map(function (child, index) {
          return _react2.default.createElement(
            'li',
            { key: index },
            child
          );
        })
      );
    },
    'ordered-list-item': function orderedListItem(children, _ref13) {
      var depth = _ref13.depth,
          keys = _ref13.keys;
      return _react2.default.createElement(
        'ol',
        { key: keys.join('|'), className: 'ol-level-' + depth },
        children.map(function (child, index) {
          return _react2.default.createElement(
            'li',
            { key: keys[index] },
            child
          );
        })
      );
    },
    'atomic': function atomic(children, _ref14) {
      var keys = _ref14.keys,
          data = _ref14.data;
      return children.map(function (child, i) {
        return _react2.default.createElement(
          'div',
          (0, _extends3.default)({ className: 'atomic-container', key: keys[i] }, data[i]),
          child
        );
      });
    }
  },
  entities: {
    LINK: function LINK(children, data, _ref15) {
      var key = _ref15.key;
      return _react2.default.createElement(
        _Link2.default,
        { key: key, to: data.url },
        children
      );
    },
    BLOCK_ASSET: function BLOCK_ASSET(children, data, _ref16) {
      var key = _ref16.key;

      return _react2.default.createElement(_BlockAssetWrapper2.default, { key: key, data: data });
    },
    INLINE_ASSET: function INLINE_ASSET(children, data, _ref17) {
      var key = _ref17.key;

      return _react2.default.createElement(_InlineAssetWrapper2.default, { data: data, key: key });
    },
    NOTE_POINTER: function NOTE_POINTER(children, data, _ref18) {
      var key = _ref18.key;

      return _react2.default.createElement(_NotePointer2.default, { key: key, children: children, noteId: data.noteId });
    }
  }
};


var Renderer = function (_Component) {
  (0, _inherits3.default)(Renderer, _Component);

  function Renderer(props) {
    (0, _classCallCheck3.default)(this, Renderer);
    return (0, _possibleConstructorReturn3.default)(this, (Renderer.__proto__ || (0, _getPrototypeOf2.default)(Renderer)).call(this, props));
  }



  (0, _createClass3.default)(Renderer, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return true; 
    }


  }, {
    key: 'renderWarning',
    value: function renderWarning() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'p',
          null,
          'Nothing to render.'
        )
      );
    }


  }, {
    key: 'render',
    value: function render() {
      var raw = this.props.raw;

      if (!raw) {
        return this.renderWarning();
      }
      var rendered = (0, _redraft2.default)(raw, renderers);
      if (!rendered) {
        return this.renderWarning();
      }
      return _react2.default.createElement(
        'div',
        null,
        rendered
      );
    }
  }]);
  return Renderer;
}(_react.Component);



Renderer.propTypes = {
  raw: _propTypes2.default.object
};

exports.default = Renderer;