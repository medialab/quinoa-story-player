'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CitationContainer = function CitationContainer(_ref, context) {
  var data = _ref.data;

  var citations = context.citations;
  var id = data.asset.id;
  if (citations) {
    var citation = citations[id];
    if (citation) {
      var CitComponent = citation.Component;
      return _react2.default.createElement(
        'cite',
        { className: 'quinoa-contextualization inline bib', id: id },
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
  citations: _propTypes2.default.object
};

exports.default = CitationContainer;