export default function resourceToCslJSON (resource) {
  if (!resource || !resource.metadata) {
    return [];
  }
  const type = resource.metadata.type;
  let cslType;
  if (type === 'bib') {
    return resource.data;
  }
  switch (type) {
    case 'video':
      cslType = 'broadcast';
      break;
    case 'data-presentation':
      cslType = 'dataset';
      break;
    case 'webpage':
      cslType = 'webpage';
      break;
    case 'embed':
      cslType = 'misc';
      break;
    case 'table':
      cslType = 'dataset';
      break;
    case 'image':
      cslType = 'graphic';
      break;
    default:
      cslType = 'misc';
      break;
  }
  const cslData = {
    type: cslType,
    title: resource.metadata.title,
    id: resource.id,
    URL: (resource.data && resource.data.url) || resource.metadata.url,
    abstract: resource.metadata.description,
    issued: resource.metadata.date && {raw: resource.metadata.date},
    author: (
              resource.metadata.authors &&
              Array.isArray(resource.metadata.authors) &&
              resource.metadata.authors.map(author => {
                if (typeof author === 'string') {
                  return {family: author};
                }
                return author;
              })
            ) || []
  };
  return [cslData];
}
