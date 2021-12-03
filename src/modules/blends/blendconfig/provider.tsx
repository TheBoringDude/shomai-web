import { createContext, ReactNode, useContext } from 'react';
import useSWR from 'swr';
import { useCollection } from '../../../lib/collections/colprovider';
import { fetcher } from '../../../lib/fetcher';
import { APIRequest } from '../../../typings/api';
import { BlendConfigProps } from '../../../typings/blends/config';

type BlendConfigProviderProps = {
  children: ReactNode;
  blenderid: number;
};

type BlendConfigContextProps = {
  blenderid: number;
  config?: BlendConfigProps | null;
};

const BlendConfigContext = createContext<BlendConfigContextProps>({ blenderid: 0 });

const BlendConfigProvider = ({ children, blenderid }: BlendConfigProviderProps) => {
  const { collection } = useCollection();
  const { data } = useSWR<APIRequest<BlendConfigProps | null>>(
    blenderid !== 0
      ? process.env.NEXT_PUBLIC_SHOMAI_API +
          `/blendconfig?blenderid=${blenderid}&collection=${collection}`
      : null,
    fetcher
  );

  return (
    <BlendConfigContext.Provider value={{ blenderid, config: data?.data }}>
      {children}
    </BlendConfigContext.Provider>
  );
};

const useBlendConfig = () => {
  const context = useContext(BlendConfigContext);
  if (context === undefined) throw new Error('<BlendConfigProvider></BlendConfigProvider>');

  return context;
};

export default BlendConfigProvider;
export { useBlendConfig };
