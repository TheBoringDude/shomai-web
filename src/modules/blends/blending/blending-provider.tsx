import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../../lib/fetcher';
import { APIRequest } from '../../../typings/api';
import {
  BlendConfigProps,
  BlendStatsProps,
  BlendUserStatsProps
} from '../../../typings/blends/config';

interface BlendingProviderProps {
  collection: string;
  blend: string;
  id: number;
  children: ReactNode;
}

type BlendingContextProps = {
  collection: string;
  blend: string;
  id: number;
  ignoreAssets: number[];
  setIgnoreAssets: Dispatch<SetStateAction<number[]>>;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  config?: BlendConfigProps | null;
  stats?: BlendStatsProps | null;
  userstats?: BlendUserStatsProps | null;
};

const BlendingContext = createContext<BlendingContextProps>({
  collection: '',
  blend: '',
  id: 0,
  ignoreAssets: [],
  setIgnoreAssets: () => {},
  disabled: true,
  setDisabled: () => undefined
});

const BlendingProvider = (props: BlendingProviderProps) => {
  const { user, isLoggedIn } = useWaxUser();
  const [ignoreAssets, setIgnoreAssets] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(isLoggedIn ? false : true);

  const { data } = useSWR<APIRequest<BlendConfigProps | null>>(
    props.id !== 0
      ? process.env.NEXT_PUBLIC_SHOMAI_API +
          `/blendconfig?blenderid=${props.id}&collection=${props.collection}`
      : null,
    fetcher
  );
  const { data: blendstats } = useSWR<APIRequest<BlendStatsProps | null>>(
    props.id !== 0
      ? process.env.NEXT_PUBLIC_SHOMAI_API +
          `/blendstats?blenderid=${props.id}&collection=${props.collection}`
      : null,
    fetcher
  );
  const { data: userstats } = useSWR<APIRequest<BlendUserStatsProps | null>>(
    props.id !== 0 && user
      ? process.env.NEXT_PUBLIC_SHOMAI_API +
          `/blenduseruses?blenderid=${props.id}&user=${user.wallet}`
      : null,
    fetcher
  );

  return (
    <BlendingContext.Provider
      value={{
        ...props,
        ignoreAssets,
        setIgnoreAssets,
        disabled,
        setDisabled,
        config: data?.data,
        stats: blendstats?.data,
        userstats: userstats?.data
      }}
    >
      {props.children}
    </BlendingContext.Provider>
  );
};

const useBlending = () => {
  const context = useContext(BlendingContext);
  if (context === undefined) {
    throw new Error('<BlendingProvider></BlendingProvider>');
  }

  return context;
};

export default BlendingProvider;
export { useBlending, BlendingContext };
