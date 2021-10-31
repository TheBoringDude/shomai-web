import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

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
};

const BlendingContext = createContext<BlendingContextProps>({
  collection: '',
  blend: '',
  id: 0,
  ignoreAssets: [],
  setIgnoreAssets: () => {}
});

const BlendingProvider = (props: BlendingProviderProps) => {
  const [ignoreAssets, setIgnoreAssets] = useState<number[]>([]);

  return (
    <BlendingContext.Provider value={{ ...props, ignoreAssets, setIgnoreAssets }}>
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
