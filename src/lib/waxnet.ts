const chainId = process.env.NEXT_PUBLIC_WAXCHAIN ?? '';
const endpoint = process.env.NEXT_PUBLIC_WAXNET ?? '';
const dapp = process.env.NEXT_PUBLIC_CONTRACTNAME ?? '';

// throw errors if they are blank / empty
if (!chainId) {
  throw new Error('No ChainID set in environment variables!');
}
if (!endpoint) {
  throw new Error('No Wax Endpoint set in environment variables!');
}
if (!dapp) {
  throw new Error('No dApp name (contract name) set in environment variables!');
}

export { chainId, endpoint, dapp };
