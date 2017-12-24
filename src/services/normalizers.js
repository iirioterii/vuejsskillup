export function getEntitiesDataFromJsonApi(data) {
  if (!Array.isArray(data)) {
    throw new Error('Data must be an array');
  }
  return data.map((item) => {
    const attrWithId = item.attributes;
    attrWithId.id = item.id;
    return attrWithId;
  });
}

export function getEntityDataFromJsonApiResponse(data) {
  return Object.assign({}, data.data.attributes, { id: data.data.id });
}
