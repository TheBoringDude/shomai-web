import { useCollection } from './colprovider';

/**
 * Checks if collection is whitelisted or not.
 *
 * @param collection
 * @returns
 */
const useIsWhitelisted = (collection: string) => {
  const { servicelist } = useCollection();

  return servicelist?.whitelists.includes(collection);
};

/**
 * Checks if collection is blacklisted or not.
 *
 * @param collection
 * @returns
 */
const useIsBlacklisted = (collection: string) => {
  const { servicelist } = useCollection();

  return servicelist?.whitelists.includes(collection);
};

export { useIsWhitelisted, useIsBlacklisted };
