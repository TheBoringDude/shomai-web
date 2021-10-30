import { createContext, ReactNode, useContext } from 'react';

interface BlendingProviderProps extends BlendingContextProps {
  children: ReactNode;
}

type BlendingContextProps = {
  collection: string;
  blend: string;
  id: number;
};

const BlendingContext = createContext<BlendingContextProps>({ collection: '', blend: '', id: 0 });

const BlendingProvider = (props: BlendingProviderProps) => {
  return <BlendingContext.Provider value={{ ...props }}>{props.children}</BlendingContext.Provider>;
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
