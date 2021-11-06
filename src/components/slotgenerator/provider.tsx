import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import { SlotIngredients } from '../../typings/blends/ingredients';
import SlotGeneratorReducer, { SlotGeneratorReducerActions } from './reducer';

type SlotGeneratorProviderProps = {
  children: ReactNode;
  defCollection: string;
  pick: (slot: SlotIngredients) => void;
};

type SlotGeneratorContextProps<T extends keyof SlotIngredients> = {
  defCollection: string;
  pick: (slot: SlotIngredients) => void;
  state: SlotIngredients;
  dispatch: Dispatch<SlotGeneratorReducerActions<T>>;
};

const SlotGeneratorContext = createContext<SlotGeneratorContextProps<any>>({
  defCollection: '',
  pick: () => {},
  state: {
    collection: '',
    schema: '',
    schema_only: false,
    from: -1,
    anyof: false,
    attributes: [],
    display_text: ''
  },
  dispatch: () => {}
});

const SlotGeneratorProvider = ({ children, defCollection, pick }: SlotGeneratorProviderProps) => {
  const [state, dispatch] = useReducer(SlotGeneratorReducer, {
    collection: defCollection, // default is the current collection
    schema: '',
    schema_only: false,
    from: -1,
    anyof: false,
    attributes: [],
    display_text: ''
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

const useSlotGenerator = <T extends keyof SlotIngredients>() => {
  const context = useContext<SlotGeneratorContextProps<T>>(SlotGeneratorContext);
  if (context === undefined) {
    throw new Error('<SlotGeneratorProvider></SlotGeneratorProvider>');
  }

  return context;
};

export default SlotGeneratorProvider;
export { SlotGeneratorContext, useSlotGenerator };
