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

var _StoryLayout = require('./StoryLayout');

var _StoryLayout2 = _interopRequireDefault(_StoryLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('./Player.scss'); /* eslint react/no-did-mount-set-state : 0 */

var QuinoaStoryPlayer = function (_Component) {
  (0, _inherits3.default)(QuinoaStoryPlayer, _Component);

  function QuinoaStoryPlayer(props) {
    (0, _classCallCheck3.default)(this, QuinoaStoryPlayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (QuinoaStoryPlayer.__proto__ || (0, _getPrototypeOf2.default)(QuinoaStoryPlayer)).call(this, props));

    _this.renderComponent = _this.renderComponent.bind(_this);

    var initialState = {
      status: 'waiting'
    };

    if (props.story) {
      initialState.status = 'loaded';
      initialState.story = props.story;
    }

    _this.state = initialState;
    return _this;
  }

  (0, _createClass3.default)(QuinoaStoryPlayer, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return true;
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      if (this.state.story && this.state.status === 'loaded') {
        return _react2.default.createElement(_StoryLayout2.default, {
          story: this.state.story });
      } else if (this.status === 'error') {
        return _react2.default.createElement(
          'div',
          null,
          'Oups, that looks like an error'
        );
      } else {
        return _react2.default.createElement(
          'div',
          null,
          'No data yet'
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'quinoa-story-player' },
        this.renderComponent()
      );
    }
  }]);
  return QuinoaStoryPlayer;
}(_react.Component);

QuinoaStoryPlayer.propTypes = {
  // story: PropTypes.Object,
  options: _react.PropTypes.shape({
    allowViewExploration: _react.PropTypes.bool // whether users can pan/zoom/navigate inside view
  }),
  onSlideChange: _react.PropTypes.func };

exports.default = QuinoaStoryPlayer;