import { createContext, ReactNode, useContext } from 'react';

type BlendConfigProviderProps = {
  children: ReactNode;
  blenderid: number;
};

type BlendConfigContextProps = {
  blenderid: number;
};

const BlendConfigContext = createContext<BlendConfigContextProps>({ blenderid: 0 });

const BlendConfigProvider = ({ children, blenderid }: BlendConfigProviderProps) => {
  // TODO: fetch the data in here

  return (
    <BlendConfigContext.Provider value={{ blenderid }}>{children}</BlendConfigContext.Provider>
  );
};

const useBlendConfig = () => {
  const context = useContext(BlendConfigContext);
  if (context === undefined) throw new Error('<BlendConfigProvider></BlendConfigProvider>');

  return context;
};

export default BlendConfigProvider;
export { useBlendConfig };
