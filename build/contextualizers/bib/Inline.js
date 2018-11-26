'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactCiteproc = require('react-citeproc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CitationContainer = function CitationContainer(_ref, context) {
  var data = _ref.data,
      resource = _ref.resource;
  var citations = context.citations,
      citationStyle = context.citationStyle,
      citationLocale = context.citationLocale;

  var id = data.asset.id;
  if (citations) {
    var citation = citations[id];
    if (citation) {
      var CitComponent = citation.Component;
      var minCit = (0, _defineProperty3.default)({}, resource.data[0].id, resource.data[0]);
      var Bib = _react2.default.createElement(_reactCiteproc.Bibliography, { items: minCit, style: citationStyle, locale: citationLocale });
      return _react2.default.createElement(
        'cite',
        {
          className: 'quinoa-contextualization inline bib',
          'data-for': 'tooltip',
          'data-html': true,
          'data-tip': (0, _server.renderToStaticMarkup)(Bib),
          id: id },
        CitComponent
      );
    }
    return null;
  }
  return null;
};
CitationContainer.propTypes = {
  data: _propTypes2.default.shape({
    asset: _propTypes2.default.shape({
      id: _propTypes2.default.string
    })
  })
};
CitationContainer.contextTypes = {
  citations: _propTypes2.default.object,

  citationStyle: _propTypes2.default.string,
  citationLocale: _propTypes2.default.string
};

exports.default = CitationContainer;