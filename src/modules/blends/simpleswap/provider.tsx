import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { SimpleIngredients } from '../../../typings/blends/ingredients';

type SimpleSwapProviderProps = {
  children: ReactNode;
};

type SimpleSwapContextProps = {
  ingredient?: SimpleIngredients;
  setIngredient: Dispatch<SetStateAction<SimpleIngredients>>;
  target?: SimpleIngredients;
  setTarget: Dispatch<SetStateAction<SimpleIngredients>>;
};

const SimpleSwapContext = createContext<SimpleSwapContextProps>({
  setIngredient: () => {},
  setTarget: () => {}
});

const SimpleSwapProvider = ({ children }: SimpleSwapProviderProps) => {
  const [ingredient, setIngredient] = useState<SimpleIngredients>(undefined);
  const [target, setTarget] = useState<SimpleIngredients>(undefined);

  return (
    <SimpleSwapContext.Provider value={{ ingredient, setIngredient, target, setTarget }}>
      {children}
    </SimpleSwapContext.Provider>
  );
};

const useSimpleSwap = () => {
  const context = useContext(SimpleSwapContext);
  if (context === undefined) {
    throw new Error('<SimpleSwapProvider></SimpleSwapProvider>');
  }

  return context;
};

export default SimpleSwapProvider;
export { useSimpleSwap, SimpleSwapContext };
