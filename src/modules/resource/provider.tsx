import { useGetTableRows } from '@cryptopuppie/useeoschain';
import { createContext, ReactNode, useContext } from 'react';
import useSWR from 'swr';
import { useCollection } from '../../lib/collections/colprovider';
import { fetcher } from '../../lib/fetcher';
import { APIRequest } from '../../typings/api';
import { RamBalanceProps, RamMarketProps } from '../../typings/ram';

type ResourceProviderProps = {
  children: ReactNode;
};

type ResourceContextProps = {
  market?: RamMarketProps | null;
  balance?: RamBalanceProps | null;
};

const ResourceContext = createContext<ResourceContextProps>({});

const ResourceProvider = ({ children }: ResourceProviderProps) => {
  const { collection } = useCollection();
  const rammarket = useGetTableRows<RamMarketProps>({
    code: 'eosio',
    scope: 'eosio',
    table: 'rammarket'
  });

  const { data } = useSWR<APIRequest<RamBalanceProps>>(
    collection
      ? process.env.NEXT_PUBLIC_SHOMAI_API + `/rambalances?collection=${collection}`
      : null,
    fetcher
  );

  return (
    <ResourceContext.Provider value={{ market: rammarket?.rows[0], balance: data?.data }}>
      {children}
    </ResourceContext.Provider>
  );
};

const useResources = () => {
  const context = useContext(ResourceContext);
  if (context === undefined) throw new Error('<ResourceProvider></ResourceProvider>');

  return context;
};

export default ResourceProvider;
export { useResources };
