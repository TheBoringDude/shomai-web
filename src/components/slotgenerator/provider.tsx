import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import { SlotBlendAllIngredientProps } from '../../typings/blends/ingredients';
import SlotGeneratorReducer, { SlotGeneratorReducerActions } from './reducer';

type SlotGeneratorProviderProps = {
  children: ReactNode;
  defCollection: string;
  pick: (slot: SlotBlendAllIngredientProps) => void;
};

type SlotGeneratorContextProps<T extends keyof SlotBlendAllIngredientProps> = {
  defCollection: string;
  pick: (slot: SlotBlendAllIngredientProps) => void;
  state: SlotBlendAllIngredientProps;
  dispatch: Dispatch<SlotGeneratorReducerActions<T>>;
};

const SlotGeneratorContext = createContext<SlotGeneratorContextProps<any>>({
  defCollection: '',
  pick: () => {},
  state: {
    type: null,
    collection: '',
    amount: 1,
    schema: '',
    templates: [],
    require_all_attribs: false,
    attributes: []
  },
  dispatch: () => {}
});

const SlotGeneratorProvider = ({ children, defCollection, pick }: SlotGeneratorProviderProps) => {
  const [state, dispatch] = useReducer(SlotGeneratorReducer, {
    type: null,
    collection: defCollection,
    amount: 1,
    schema: '',
    templates: [],
    require_all_attribs: false,
    attributes: []
  });

  return (
    <SlotGeneratorContext.Provider
      value={{
        defCollection,
        pick,
        state,
        dispatch
      }}
    >
      {children}
    </SlotGeneratorContext.Provider>
  );
};

function useSlotGenerator<T extends keyof SlotBlendAllIngredientProps>() {
  const context = useContext<SlotGeneratorContextProps<T>>(SlotGeneratorContext);
  if (context === undefined) {
    throw new Error('<SlotGeneratorProvider></SlotGeneratorProvider>');
  }

  return context;
}

export default SlotGeneratorProvider;
export { SlotGeneratorContext, useSlotGenerator };
