'use strict';

var _chai = require('chai');

var _misc = require('./misc');

describe('misc utils', function () {
  describe('capitalize', function () {
    it('should capitalize a string', function () {
      var input = 'coucou';
      var output = 'Coucou';
      (0, _chai.expect)((0, _misc.capitalize)(input)).to.equal(output);
    });
    it('should render empty string', function () {
      var emptyStr = '';
      (0, _chai.expect)((0, _misc.capitalize)(emptyStr)).to.equal('');
    });
  });
  describe('buildCitations', function () {
    it('should return empty if given a story with no resources', function () {
      var story = {
        contextualizations: {},
        contextualizers: {},
        resources: {},
        settings: {}
      };
      var citations = (0, _misc.buildCitations)(story);
      (0, _chai.expect)(citations.citationData).to.eql([]);
      (0, _chai.expect)(citations.citationItems).to.eql({});
    });
  });
  describe('buildGlossary', function () {
    it('should return empty if given a story with no resources', function () {
      var story = {
        contextualizations: {},
        contextualizers: {},
        resources: {},
        settings: {}
      };
      var glossary = (0, _misc.buildGlossary)(story);
      (0, _chai.expect)(glossary).to.eql([]);
    });
  });
});