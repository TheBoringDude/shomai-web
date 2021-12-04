import { createContext, ReactNode, useContext } from 'react';
import useSWR from 'swr';
import { chainrequest } from '../../lib/chain';
import { useCollection } from '../../lib/collections/colprovider';
import { fetcher } from '../../lib/fetcher';
import { endpoint } from '../../lib/waxnet';
import { APIRequest, ChainRequestProps } from '../../typings/api';
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

  const { data: rammarket } = useSWR<ChainRequestProps<RamMarketProps>>(
    endpoint + '/v1/chain/get_table_rows',
    (url) =>
      chainrequest(url, {
        json: true,
        code: 'eosio',
        scope: 'eosio',
        table: 'rammarket',
        lower_bound: '',
        upper_bound: '',
        index_position: 1,
        key_type: '',
        limit: 10,
        reverse: false,
        show_payer: false
      })
  );

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
