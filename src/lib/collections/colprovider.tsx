import { ICollection } from 'atomicassets/build/API/Explorer/Objects';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import EmptyComponent from '../../components/empty-component';
import { AtomicRequest } from '../../typings/atomicrequest';
import { fetcher } from '../fetcher';

interface ColProviderProps {
  children: ReactNode;
  collection: string;
}

interface ColContextProps {
  collection: string;
  coldata?: ICollection;
}

const ColContext = createContext<ColContextProps>({ collection: '' });

const ColProvider = ({ children, collection }: ColProviderProps) => {
  // state collection data
  const [coldata, setColdata] = useState<ICollection | undefined>(undefined);

  // request for collection for global data use
  const { data } = useSWR<AtomicRequest<ICollection>>(
    collection
      ? `${process.env.NEXT_PUBLIC_ATOMICASSETS_API}/atomicassets/v1/collections/${collection}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (!data) return;
    if (coldata) return;

    if (!data.success) return;

    setColdata(data.data);
  }, [coldata, data]);

  if (!collection) return <EmptyComponent />;

  return <ColContext.Provider value={{ collection, coldata }}>{children}</ColContext.Provider>;
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
