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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMeasure = require('react-measure');

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _Layout = require('./templates/garlic/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _Layout3 = require('./templates/cinamon/Layout');

var _Layout4 = _interopRequireDefault(_Layout3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuinoaStoryPlayer = function (_Component) {
  (0, _inherits3.default)(QuinoaStoryPlayer, _Component);

  function QuinoaStoryPlayer(props) {
    (0, _classCallCheck3.default)(this, QuinoaStoryPlayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (QuinoaStoryPlayer.__proto__ || (0, _getPrototypeOf2.default)(QuinoaStoryPlayer)).call(this, props));

    _this.renderComponent = _this.renderComponent.bind(_this);
    var initialState = {
      status: 'waiting',
      story: undefined,

      dimensions: {
        width: -1,
        height: -1
      }
    };

    if (props.story) {
      initialState.status = 'loaded';
      initialState.story = props.story;
    }

    _this.state = initialState;
    return _this;
  }


  (0, _createClass3.default)(QuinoaStoryPlayer, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        story: this.state.story,
        dimensions: this.state.dimensions
      };
    }

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.story !== nextProps.story) {
        this.setState({
          story: nextProps.story
        });
      }
    }

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.story !== nextProps.story || this.state.dimensions !== nextState.dimensions;
    }

  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      var template = this.state.story && this.state.story.settings && this.state.story.settings.template || 'garlic';
      if (this.state.story && this.state.status === 'loaded') {
        switch (template) {
          case 'garlic':
            return _react2.default.createElement(_Layout2.default, {
              locale: this.props.locale,
              story: this.state.story,
              usedDocument: this.props.usedDocument || document,
              usedWindow: this.props.usedWindow || window });
          case 'cinamon':
            return _react2.default.createElement(_Layout4.default, {
              locale: this.props.locale,
              story: this.state.story,
              previewMode: this.props.previewMode || true,
              usedDocument: this.props.usedDocument || document,
              usedWindow: this.props.usedWindow || window });
          default:
            return null;
        }
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
      var _this2 = this;

      var onMeasure = function onMeasure(contentRect) {
        _this2.setState({ dimensions: contentRect.bounds });
      };
      return _react2.default.createElement(
        _reactMeasure2.default,
        {
          bounds: true,
          onResize: onMeasure },
        function (_ref) {
          var measureRef = _ref.measureRef;
          return _react2.default.createElement(
            'div',
            { ref: measureRef, className: 'quinoa-story-player' },
            _this2.renderComponent()
          );
        }
      );
    }
  }]);
  return QuinoaStoryPlayer;
}(_react.Component);


QuinoaStoryPlayer.propTypes = {
  story: _propTypes2.default.object
};

QuinoaStoryPlayer.childContextTypes = {
  story: _propTypes2.default.object,
  dimensions: _propTypes2.default.object
};

exports.default = QuinoaStoryPlayer;