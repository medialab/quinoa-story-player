"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _redraft = _interopRequireDefault(require("redraft"));

var _Link = _interopRequireDefault(require("./Link"));

var _desantagleEntityRanges = _interopRequireDefault(require("../utils/desantagleEntityRanges"));

var _BlockAssetWrapper = _interopRequireDefault(require("./BlockAssetWrapper"));

var _InlineAssetWrapper = _interopRequireDefault(require("./InlineAssetWrapper"));

var _NotePointer = _interopRequireDefault(require("./NotePointer"));

var _InternalLink = _interopRequireDefault(require("./InternalLink"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// just a helper to add a <br /> after each block
var addBreaklines = function addBreaklines(children) {
  return children.map(function (child, index) {
    return [child, _react.default.createElement("br", {
      key: index + 0.5
    })];
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
      return _react.default.createElement("strong", {
        key: key
      }, children);
    },
    ITALIC: function ITALIC(children, _ref2) {
      var key = _ref2.key;
      return _react.default.createElement("em", {
        key: key
      }, children);
    },
    UNDERLINE: function UNDERLINE(children, _ref3) {
      var key = _ref3.key;
      return _react.default.createElement("u", {
        key: key
      }, children);
    },
    CODE: function CODE(children, _ref4) {
      var key = _ref4.key;
      return _react.default.createElement("span", {
        key: key
      }, children);
    }
  },

  /**
   * Blocks receive children and depth
   * Note that children are an array of blocks with same styling,
   */
  blocks: {
    'unstyled': function unstyled(children) {
      return children.map(function (child, index) {
        return _react.default.createElement("div", {
          className: "content-p",
          key: index
        }, _react.default.createElement("span", {
          className: "content-p--modifier"
        }, child));
      });
    },
    'blockquote': function blockquote(children, _ref5) {
      var _ref5$keys = _slicedToArray(_ref5.keys, 1),
          key = _ref5$keys[0];

      return _react.default.createElement("blockquote", {
        key: key,
        className: "content-blockquote"
      }, _react.default.createElement("span", {
        className: "content-blockquote--modifier"
      }, addBreaklines(children)));
    },
    'header-one': function headerOne(children, _ref6) {
      var keys = _ref6.keys;
      return children.map(function (child, index) {
        return _react.default.createElement("h1", {
          className: "content-title content-h1",
          key: index,
          id: keys[index]
        }, _react.default.createElement("span", {
          className: "content-title--modifier"
        }, child));
      });
    },
    'header-two': function headerTwo(children, _ref7) {
      var keys = _ref7.keys;
      return children.map(function (child, index) {
        return _react.default.createElement("h2", {
          className: "content-title content-h2",
          key: index,
          id: keys[index]
        }, _react.default.createElement("span", {
          className: "content-title--modifier"
        }, child));
      });
    },
    'header-three': function headerThree(children, _ref8) {
      var keys = _ref8.keys;
      return children.map(function (child, index) {
        return _react.default.createElement("h3", {
          className: "content-title content-h3",
          key: index,
          id: keys[index]
        }, _react.default.createElement("span", {
          className: "content-title--modifier"
        }, child));
      });
    },
    'header-four': function headerFour(children, _ref9) {
      var keys = _ref9.keys;
      return children.map(function (child, index) {
        return _react.default.createElement("h4", {
          className: "content-title content-h4",
          key: index,
          id: keys[index]
        }, _react.default.createElement("span", {
          className: "content-title--modifier"
        }, child));
      });
    },
    'header-five': function headerFive(children, _ref10) {
      var keys = _ref10.keys;
      return children.map(function (child, index) {
        return _react.default.createElement("h5", {
          className: "content-title content-h5",
          key: index,
          id: keys[index]
        }, _react.default.createElement("span", {
          className: "content-title--modifier"
        }, child));
      });
    },
    'header-six': function headerSix(children, _ref11) {
      var keys = _ref11.keys;
      return children.map(function (child, index) {
        return _react.default.createElement("h6", {
          className: "content-title content-h6",
          key: index,
          id: keys[index]
        }, _react.default.createElement("span", {
          className: "content-title--modifier"
        }, child));
      });
    },
    // You can also access the original keys of the blocks
    'code-block': function codeBlock(children, _ref12) {
      var keys = _ref12.keys;
      return _react.default.createElement("pre", {
        className: "content-pre",
        key: keys[0]
      }, _react.default.createElement("span", {
        className: "content-pre--modifier"
      }, addBreaklines(children)));
    },
    // or depth for nested lists
    'unordered-list-item': function unorderedListItem(children, _ref13) {
      var depth = _ref13.depth,
          keys = _ref13.keys;
      return _react.default.createElement("ul", {
        key: "".concat(keys[keys.length - 1], "-").concat(depth),
        className: "content-ul ul-level-".concat(depth)
      }, children.map(function (child, index) {
        return _react.default.createElement("li", {
          key: "".concat(index, "-").concat(depth),
          className: "content-li"
        }, _react.default.createElement("span", {
          className: "content-li--modifier"
        }, child));
      }));
    },
    'ordered-list-item': function orderedListItem(children, _ref14) {
      var depth = _ref14.depth,
          keys = _ref14.keys;
      return _react.default.createElement("ol", {
        key: keys.join('|'),
        className: "content-ol ol-level-".concat(depth)
      }, children.map(function (child, index) {
        return _react.default.createElement("li", {
          className: "content-li",
          key: keys[index]
        }, _react.default.createElement("span", {
          className: "content-li--modifier"
        }, child));
      }));
    },
    'atomic': function atomic(children, _ref15) {
      var keys = _ref15.keys,
          data = _ref15.data;
      return children.map(function (child, i) {
        return _react.default.createElement("div", _extends({
          className: "content-atomic-container",
          key: keys[i]
        }, data[i]), child);
      });
    }
  },

  /**
   * Entities receive children and the entity data
   */
  entities: {
    //   // key is the entity key value from raw
    LINK: function LINK(children, data, _ref16) {
      var key = _ref16.key;
      return _react.default.createElement(_Link.default, {
        key: key,
        to: data.url
      }, children);
    },
    BLOCK_ASSET: function BLOCK_ASSET(children, data, _ref17) {
      var key = _ref17.key;
      return _react.default.createElement(_BlockAssetWrapper.default, {
        key: key,
        data: data
      });
    },
    INLINE_ASSET: function INLINE_ASSET(children, data, _ref18) {
      var key = _ref18.key;
      return _react.default.createElement(_InlineAssetWrapper.default, {
        data: data,
        key: "".concat(key, "-").concat(data.asset.id)
      }, children);
    },
    NOTE_POINTER: function NOTE_POINTER(children, data, _ref19) {
      var key = _ref19.key;
      return _react.default.createElement(_NotePointer.default, {
        key: key,
        children: children,
        noteId: data.noteId
      });
    },
    INTERNAL_LINK: function INTERNAL_LINK(children, data, _ref20) {
      var key = _ref20.key;
      return _react.default.createElement(_InternalLink.default, {
        key: key,
        data: data,
        children: children
      });
    }
  }
};
/**
 * Renderer class for building raw-to-react rendering react component instances
 */

var Renderer =
/*#__PURE__*/
function (_Component) {
  _inherits(Renderer, _Component);

  /**
   * constructor
   * @param {object} props - properties given to instance at instanciation
   */
  function Renderer(props) {
    _classCallCheck(this, Renderer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Renderer).call(this, props));
  }
  /**
   * Determines whether to update the component or not
   * @param {object} nextProps - the future properties of the component
   * @return {boolean} shouldUpdate - yes or no
   */


  _createClass(Renderer, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      return true; // todo: wisely optimize here
    }
    /**
     * Displays something when no suitable content state is provided to the renderer
     * @return {ReactElement} default message
     */

  }, {
    key: "renderWarning",
    value: function renderWarning() {
      return null;
      /*return <div><p>Nothing to render.</p></div>;*/
    }
    /**
     * Renders the component
     * @return {ReactElement} component - the component
     */

  }, {
    key: "render",
    value: function render() {
      var raw = this.props.raw;

      if (!raw) {
        return this.renderWarning();
      }

      var safeRaw = raw;
      /**
       * @todo investigate if this causes performance issues
       * see if https://github.com/medialab/fonio/issues/210 could not be fixed upstream
       */

      if (raw) {
        safeRaw = (0, _desantagleEntityRanges.default)(raw);
      }

      var rendered = (0, _redraft.default)(safeRaw, renderers); // redraft can return a null if there's nothing to render

      if (!rendered) {
        return this.renderWarning();
      }

      return _react.default.createElement("div", {
        className: "contents-container"
      }, rendered);
    }
  }]);

  return Renderer;
}(_react.Component);
/**
 * Component's properties types
 */


Renderer.propTypes = {
  /**
   * Draft-js raw representation of some contents
   * see https://draftjs.org/docs/api-reference-data-conversion.html
   */
  raw: _propTypes.default.object
};
var _default = Renderer;
exports.default = _default;