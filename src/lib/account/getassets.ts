const GET_TEMPLATE_ASSETS = (collection: string, template: string | number, owner: string) => {
  return `${process.env.NEXT_PUBLIC_ATOMICASSETS_API}/atomicassets/v1/assets?collection_name=${collection}&template_id=${template}&page=1&limit=100&order=desc&sort=asset_id&owner=${owner}`;
};

const GET_USER_ASSETS = (collection: string, owner: string) => {
  return `${process.env.NEXT_PUBLIC_ATOMICASSETS_API}/atomicassets/v1/assets?collection_name=${collection}&page=1&limit=1000&order=desc&sort=asset_id&owner=${owner}`;
};

export { GET_TEMPLATE_ASSETS, GET_USER_ASSETS };
