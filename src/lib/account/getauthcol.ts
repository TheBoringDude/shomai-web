const GET_AUTHORIZED_COLLECTIONS_API = () => {
  return `https://wax.api.atomicassets.io/atomicassets/v1/collections?authorized_account=5g2vm.wam&page=1&limit=100&order=desc&sort=created`;
};

const GET_COLLECTION_SCHEMAS = (collection: string) => {
  return `https://wax.api.atomicassets.io/atomicassets/v1/schemas?collection_name=${collection}&authorized_account=5g2vm.wam&page=1&limit=100&order=desc&sort=created`;
};

const GET_COLLECTION_TEMPLATES = (collection: string, schema: string) => {
  return `https://wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=${collection}&schema_name=${schema}&page=1&limit=1000&order=desc&sort=created`;
};

export { GET_AUTHORIZED_COLLECTIONS_API, GET_COLLECTION_SCHEMAS, GET_COLLECTION_TEMPLATES };
