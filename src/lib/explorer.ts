import { ExplorerApi } from 'atomicassets';

const explorer = new ExplorerApi(process.env.NEXT_PUBLIC_ATOMICASSETS_API, 'atomicassets', {
  fetch
});

export { explorer };
