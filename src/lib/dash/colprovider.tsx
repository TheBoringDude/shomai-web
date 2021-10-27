import { createContext, ReactNode, useContext } from 'react';

interface ColProviderProps {
  children: ReactNode;
  collection: string;
}

interface ColContextProps {
  collection?: string;
}

const ColContext = createContext<ColContextProps>({});

const ColProvider = ({ children, collection }: ColProviderProps) => {
  return <ColContext.Provider value={{ collection }}>{children}</ColContext.Provider>;
};

const useCollection = () => {
  const context = useContext(ColContext);
  if (context === undefined) {
    throw new Error('Need to wrap component to <ColProvider></ColProvider>');
  }

  return context;
};

export default ColProvider;
export { ColContext, useCollection };
