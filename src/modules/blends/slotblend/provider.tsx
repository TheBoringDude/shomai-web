import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react';
import { SlotIngredients } from '../../../typings/blends/ingredients';
import { SlotBlendTargetProps } from '../../../typings/blends/targets';
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
  targets: SlotBlendTargetProps[];
  dispatchTargets: Dispatch<SlotBlendTargetsReducerActions>;
  odds: number;
  setOdds: Dispatch<SetStateAction<number>>;
};

const SlotBlendContext = createContext<SlotBlendContextProps>({
  ingredients: [],
  dispatchIngredients: () => {},
  targets: [],
  dispatchTargets: () => {},
  odds: 0,
  setOdds: () => {}
});

const SlotBlendProvider = ({ children }: SlotBlendProviderProps) => {
  const [ingredients, dispatchIngredients] = useReducer(SlotBlendIngredientsReducer, []);
  const [targets, dispatchTargets] = useReducer(SlotBlendTargetsReducer, []);
  const [odds, setOdds] = useState(0);

  useEffect(() => {
    if (targets.length === 0) return;

    let x = 0;
    for (const t of targets) {
      x += t.odds;
    }

    setOdds(x);
  }, [targets]);

  return (
    <SlotBlendContext.Provider
      value={{ ingredients, dispatchIngredients, targets, dispatchTargets, odds, setOdds }}
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
