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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redraft = require('redraft');

var _redraft2 = _interopRequireDefault(_redraft);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  You can use inline styles or classNames inside your callbacks
 */
/* eslint react/jsx-key : 0 */
var styles = {
  code: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  },
  codeBlock: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 20
  }
};

// just a helper to add a <br /> after a block
var addBreaklines = function addBreaklines(children) {
  return children.map(function (child) {
    return [child, _react2.default.createElement('br', null)];
  });
};

/**
 * Define the renderers
 */
var renderers = {
  /**
   * Those callbacks will be called recursively to render a nested structure
   */
  inline: {
    // The key passed here is just an index based on rendering order inside a block
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
        { key: key, style: styles.code },
        children
      );
    }
  },
  /**
   * Blocks receive children and depth
   * Note that children are an array of blocks with same styling,
   */
  blocks: {
    'unstyled': function unstyled(children) {
      return children.map(function (child) {
        return _react2.default.createElement(
          'p',
          null,
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
          { id: keys[index] },
          child
        );
      });
    },
    'header-two': function headerTwo(children, _ref6) {
      var keys = _ref6.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h2',
          { id: keys[index] },
          child
        );
      });
    },
    'header-three': function headerThree(children, _ref7) {
      var keys = _ref7.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h3',
          { id: keys[index] },
          child
        );
      });
    },
    'header-four': function headerFour(children, _ref8) {
      var keys = _ref8.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h4',
          { id: keys[index] },
          child
        );
      });
    },
    'header-five': function headerFive(children, _ref9) {
      var keys = _ref9.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h5',
          { id: keys[index] },
          child
        );
      });
    },
    'header-six': function headerSix(children, _ref10) {
      var keys = _ref10.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h6',
          { id: keys[index] },
          child
        );
      });
    },
    // You can also access the original keys of the blocks
    'code-block': function codeBlock(children, _ref11) {
      var keys = _ref11.keys;
      return _react2.default.createElement(
        'pre',
        { style: styles.codeBlock, key: keys[0] },
        addBreaklines(children)
      );
    },
    // or depth for nested lists
    'unordered-list-item': function unorderedListItem(children, _ref12) {
      var depth = _ref12.depth,
          keys = _ref12.keys;
      return _react2.default.createElement(
        'ul',
        { key: keys[keys.length - 1], className: 'ul-level-' + depth },
        children.map(function (child) {
          return _react2.default.createElement(
            'li',
            null,
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
    }
  },
  // /**
  //  * Entities receive children and the entity data
  //  */
  entities: {
    // key is the entity key value from raw
    // LINK: (children, data, { key }) => <Link key={key} to={data.url}>{children}<Link/>,
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
        'Nothing to render.'
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
      // redraft returns a null if there's nothing to render
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
  // raw: PropTypes.object
};

exports.default = Renderer;