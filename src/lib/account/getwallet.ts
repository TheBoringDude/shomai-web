const GET_WALLET_BALANCE = () => {
  return `${process.env.NEXT_PUBLIC_WAXNET}/v1/chain/get_currency_balance`;
};

export { GET_WALLET_BALANCE };
