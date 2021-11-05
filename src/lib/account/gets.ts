const GET_COLLECTION_SCHEMA = (collection: string, schema: string) => {
  return `${process.env.NEXT_PUBLIC_ATOMICASSETS_API}/atomicassets/v1/schemas/${collection}/${schema}`;
};

export { GET_COLLECTION_SCHEMA };
