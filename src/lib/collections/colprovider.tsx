import { ICollection } from 'atomicassets/build/API/Explorer/Objects';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import EmptyComponent from '../../components/empty-component';
import { APIRequest, SERVICELIST_PROPS } from '../../typings/api';
import { AtomicRequest } from '../../typings/atomicrequest';
import { fetcher } from '../fetcher';

interface ColProviderProps {
  children: ReactNode;
  collection: string;
}

interface ColContextProps {
  collection: string;
  coldata?: ICollection;
  servicelist?: SERVICELIST_PROPS;
}

const ColContext = createContext<ColContextProps>({
  collection: '',
  servicelist: { whitelists: [], blacklists: [] }
});

const ColProvider = ({ children, collection }: ColProviderProps) => {
  // state collection data
  const [coldata, setColdata] = useState<ICollection | undefined>(undefined);
  const [servicelist, setServicelist] = useState<SERVICELIST_PROPS | undefined>(undefined);

  // request for collection for global data use
  const { data } = useSWR<AtomicRequest<ICollection>>(
    collection
      ? `${process.env.NEXT_PUBLIC_ATOMICASSETS_API}/atomicassets/v1/collections/${collection}`
      : null,
    fetcher
  );

  const { data: _servicelist } = useSWR<APIRequest<SERVICELIST_PROPS>>(
    process.env.NEXT_PUBLIC_SHOMAI_API + '/servicelist',
    fetcher
  );

  // collection data
  useEffect(() => {
    if (!data) return;
    if (coldata) return;

    if (!data.success) return;

    setColdata(data.data);
  }, [coldata, data]);

  // service list data
  useEffect(() => {
    if (!_servicelist) return;
    if (servicelist) return;

    if (_servicelist.error) return;

    setServicelist(_servicelist.data);
  }, [servicelist, _servicelist]);

  if (!collection || !servicelist || !coldata) return <EmptyComponent />;

  return (
    <ColContext.Provider value={{ collection, coldata, servicelist }}>
      {children}
    </ColContext.Provider>
  );
};

// useCollection hook
const useCollection = () => {
  const context = useContext(ColContext);
  if (context === undefined) {
    throw new Error('Need to wrap component to <ColProvider></ColProvider>');
  }

  return context;
};

export default ColProvider;
export { ColContext, useCollection };
