import { uniqBy } from 'lodash';

export default (raw = {}) => ({
      ...raw,
      blocks: raw.blocks ? raw.blocks.map(block => {
        return {
          ...block,
          entityRanges: uniqBy(block.entityRanges, e => e.key)
        };
      }) : []
    });
