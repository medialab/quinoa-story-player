import { expect } from 'chai';

import { capitalize, buildCitations, buildGlossary } from './misc';

describe('misc utils', () => {
  describe('capitalize', () => {
    it('should capitalize a string', () => {
      const input = 'coucou';
      const output = 'Coucou';
      expect(capitalize(input)).to.equal(output);
    });
    it('should render empty string', () => {
      const emptyStr = '';
      expect(capitalize(emptyStr)).to.equal('');
    });
  });
  describe('buildCitations', () => {
    it('should return empty if given a story with no resources', () => {
      const story = {
        contextualizations: {},
        contextualizers: {},
        resources: {},
        settings: {},
      };
      const citations = buildCitations(story);
      expect(citations.citationData).to.eql([]);
      expect(citations.citationItems).to.eql({});
    });
  });
  describe('buildGlossary', () => {
    it('should return empty if given a story with no resources', () => {
      const story = {
        contextualizations: {},
        contextualizers: {},
        resources: {},
        settings: {},
      };
      const glossary = buildGlossary(story);
      expect(glossary).to.eql([]);
    });
  });
});
