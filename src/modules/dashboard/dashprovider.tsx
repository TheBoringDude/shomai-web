import { createContext, ReactNode, useContext } from 'react';
import useSWR from 'swr';
import { useCollection } from '../../lib/collections/colprovider';
import { fetcher } from '../../lib/fetcher';
import { APIRequest, COLLECTIONBLENDS_PROPS } from '../../typings/api';

type DashProviderProps = {
  children: ReactNode;
};

type DashContextProps = {
  blends?: COLLECTIONBLENDS_PROPS;
};

const DashContext = createContext<DashContextProps>({});

const DashProvider = ({ children }: DashProviderProps) => {
  const { collection } = useCollection();
  const { data } = useSWR<APIRequest<COLLECTIONBLENDS_PROPS>>(
    process.env.NEXT_PUBLIC_SHOMAI_API + `/blends/${collection}`,
    fetcher
  );

  return <DashContext.Provider value={{ blends: data?.data }}>{children}</DashContext.Provider>;
};

const useDashboard = () => {
  const context = useContext(DashContext);
  if (context === undefined) {
    throw new Error('<DashProvider></DashProvider>');
  }

  return context;
};

export default DashProvider;
export { useDashboard };
