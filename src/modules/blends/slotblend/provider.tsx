import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import { SlotIngredients } from '../../../typings/blends/ingredients';
import { SlotBlendTargets } from '../../../typings/blends/targets';
import SlotBlendIngredientsReducer, {
  SlotBlendIngredientsReducerActions
} from './reducer-ingredients';
import SlotBlendTargetsReducer, { SlotBlendTargetsReducerActions } from './reducer-targets';

type SlotBlendProviderProps = {
  children: ReactNode;
};

type SlotBlendContextProps = {
  ingredients: SlotIngredients[];
  dispatchIngredients: Dispatch<SlotBlendIngredientsReducerActions>;
  targets: SlotBlendTargets[];
  dispatchTargets: Dispatch<SlotBlendTargetsReducerActions>;
};

const SlotBlendContext = createContext<SlotBlendContextProps>({
  ingredients: [],
  dispatchIngredients: () => {},
  targets: [],
  dispatchTargets: () => {}
});

const SlotBlendProvider = ({ children }: SlotBlendProviderProps) => {
  const [ingredients, dispatchIngredients] = useReducer(SlotBlendIngredientsReducer, []);
  const [targets, dispatchTargets] = useReducer(SlotBlendTargetsReducer, []);

  return (
    <SlotBlendContext.Provider
      value={{ ingredients, dispatchIngredients, targets, dispatchTargets }}
    >
      {children}
    </SlotBlendContext.Provider>
  );
};

const useSlotBlend = () => {
  const context = useContext(SlotBlendContext);
  if (context === undefined) {
    throw new Error('<SlotBlendProvider></SlotBlendProvider>');
  }

  return context;
};

export default SlotBlendProvider;
export { SlotBlendContext, useSlotBlend };
