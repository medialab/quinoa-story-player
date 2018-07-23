import resourceToCSLJSON from './resourceToCSLJSON';

export const buildCoverImage = (story) => {
    const {
      resources,
      metadata
    } = story;
    if (metadata.coverImage && metadata.coverImage.resourceId) {
      if (resources[metadata.coverImage.resourceId])
        return resources[metadata.coverImage.resourceId].data;
      else return null;
    }
    else return null;
  };
  /**
   * Builds component-consumable data to represent
   * the citations of "bib" resources being mentionned in the story
   * @param {object} story - the story to process
   * @return {object} citationData - the citation data to input in the reference manager
   */
export const buildCitations = (story) => {
    const {
      contextualizations,
      contextualizers,
      resources,
      settings = {},
    } = story;
    /*
     * Citations preparation
     */
    const referenceStatus = (settings.options && settings.options.referenceStatus) || 'cited';
    const referenceTypes = (settings.options && settings.options.referenceTypes) || ['bib'];
    const citedResources = Object.keys(resources)
    .map(resourceId => resources[resourceId])
    .filter(resource => {
      if (referenceTypes.length) {
        return referenceTypes.indexOf(resource.metadata.type) > -1;
      }
      return true;
    })
    .filter(resource => {
      if (referenceStatus === 'cited') {
        return Object.keys(contextualizations)
          .filter(contextualizationId => contextualizations[contextualizationId].resourceId === resource.id)
          .length > 0;
      }
      return true;
    });
    // build citations items data
    const enrichedCitedResources = citedResources.map(resource => {
      const citations = resource.metadata.type === 'bib' ?
          resource.data : resourceToCSLJSON(resource);
      return {
        ...resource,
        citations,
        citationId: citations[0].id
      };
    });
    const citationItems = enrichedCitedResources
      .reduce((finalCitations1, resource) => {

        const newCitations = resource.citations.reduce((final2, citation) => {
          return {
            ...final2,
            [citation.id]: citation
          };
        }, {});
        return {
          ...finalCitations1,
          ...newCitations,
        };
      }, {});
    let noteIndex = 0;
    // build citations's citations data
    const citationInstances = enrichedCitedResources
      .filter(resource => resource.metadata.type === 'bib')
      .reduce((result1, resource) => {
        const theseContextualizations = Object.keys(contextualizations)
          .filter(contextualizationId => contextualizations[contextualizationId].resourceId === resource.id)
          .map(contextualizationId => contextualizations[contextualizationId]);
        return [
          ...result1,
          ...theseContextualizations.reduce((result2, contextualization) => {
              const contextualizer = contextualizers[contextualization.contextualizerId];
              noteIndex++;
              return [
                ...result2,
                {
                  citationID: contextualization.id,
                  // citationID: resource.citationId,
                  citationItems: resource.citations.map(() => ({
                    locator: contextualizer.locator,
                    prefix: contextualizer.prefix,
                    suffix: contextualizer.suffix,
                    // ...contextualizer,
                    id: resource.data[0].id,
                  })),
                  properties: {
                    noteIndex
                  }
                }
              ];
            }, [])
          ];
        }, []).filter(c => c);
    // map them to the clumsy formatting needed by citeProc
    const citationData = citationInstances.map((instance, index) => [
      instance,
      // citations before
      citationInstances.slice(0, (index === 0 ? 0 : index))
        .map((oCitation) => [
            oCitation.citationID,
            oCitation.properties.noteIndex
          ]
        ),
      []
      // citations after the current citation
      // this is claimed to be needed by citeproc.js
      // but it works without it so ¯\_(ツ)_/¯
      // citationInstances.slice(index)
      //   .map((oCitation) => [
      //       oCitation.citationID,
      //       oCitation.properties.noteIndex
      //     ]
      //   ),
    ]);
    return {
      citationData,
      citationItems
    };
  };

  /**
   * Builds component-consumable data to represent
   * the glossary of "entities" resources being mentionned in the story
   * @param {object} story - the story to process
   * @return {array} glossaryMentions - all the glossary entries properly formatted for rendering
   */
export const buildGlossary = (story) => {
    const {
      contextualizations,
      contextualizers,
      resources
    } = story;
    let glossaryMentions = Object.keys(contextualizations)
      .filter(contextualizationId => {
        const contextualizerId = contextualizations[contextualizationId].contextualizerId;
        const contextualizer = contextualizers[contextualizerId];
        return contextualizer && contextualizer.type === 'glossary';
      })
      .map(contextualizationId => ({
        ...contextualizations[contextualizationId],
        contextualizer: contextualizers[contextualizations[contextualizationId].contextualizerId],
        resource: resources[contextualizations[contextualizationId].resourceId]
      }))
      .reduce((entries, contextualization) => {
        return {
          ...entries,
          [contextualization.resourceId]: {
            resource: contextualization.resource,
            mentions: entries[contextualization.resourceId] ?
                        entries[contextualization.resourceId].mentions.concat(contextualization)
                        : [contextualization]
          }
        };
      }, {});

    glossaryMentions = Object.keys(glossaryMentions)
                        .map(id => glossaryMentions[id])
                        .sort((a, b) => {
                          if (a.resource.data.name > b.resource.data.name) {
                            return -1;
                          }
                          else {
                            return 1;
                          }
                        });

    return glossaryMentions;
  };

export const capitalize = lower => lower.charAt(0).toUpperCase() + lower.substr(1);
