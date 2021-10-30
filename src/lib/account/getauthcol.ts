const GET_AUTHORIZED_COLLECTIONS_API = (wallet: string) => {
  return `${process.env.NEXT_PUBLIC_ATOMICASSETS_API}/atomicassets/v1/collections?authorized_account=${wallet}&page=1&limit=100&order=desc&sort=created`;
};

const GET_COLLECTION_SCHEMAS = (wallet: string, collection: string) => {
  return `${process.env.NEXT_PUBLIC_ATOMICASSETS_API}/atomicassets/v1/schemas?collection_name=${collection}&authorized_account=${wallet}&page=1&limit=100&order=desc&sort=created`;
};

const GET_COLLECTION_TEMPLATES = (collection: string, schema: string) => {
  return `${process.env.NEXT_PUBLIC_ATOMICASSETS_API}/atomicassets/v1/templates?collection_name=${collection}&schema_name=${schema}&page=1&limit=1000&order=desc&sort=created`;
};

export { GET_AUTHORIZED_COLLECTIONS_API, GET_COLLECTION_SCHEMAS, GET_COLLECTION_TEMPLATES };
