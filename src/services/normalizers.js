export function getArticlesDataFromJsonApi(response) {
  const data = response.data;
  const included = response.included;

  if (!Array.isArray(response.data)) {
    throw new Error('Data must be an array');
  }

  const getUserById = id => included.find(user => id === user.id);

  return data.map((item) => {
    const dataWithIdAndUser = item.attributes;
    dataWithIdAndUser.id = item.id;
    dataWithIdAndUser.user = getUserById(item.relationships.user.data.id);

    return dataWithIdAndUser;
  });
}

export function getEntityDataFromJsonApiResponse(data) {
  return Object.assign({}, data.data.attributes, { id: data.data.id });
}
