export interface RamMarketProps {
  supply: string;
  base: {
    balance: string;
    weight: string;
  };
  quote: {
    balance: string;
    weight: string;
  };
}

export interface RamBalanceProps {
  collection: string;
  bytes: number;
}
