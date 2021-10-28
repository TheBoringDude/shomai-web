import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useReducer,
  useState
} from 'react';
import { SimpleIngredients } from '../../../typings/blends/ingredients';
import SimpleBlendReducer, { SimpleBlendActions } from './reducer';

type SimpleBlendProviderProps = {
  children: ReactNode;
};

type SimpleBlendContextProps = {
  ingredients: SimpleIngredients[];
  dispatchIngredients: Dispatch<SimpleBlendActions>;
  target?: SimpleIngredients;
  setTarget: Dispatch<SetStateAction<SimpleIngredients>>;
};

const SimpleBlendContext = createContext<SimpleBlendContextProps>({
  ingredients: [],
  dispatchIngredients: () => {},
  setTarget: () => {}
});

const SimpleBlendProvider = ({ children }: SimpleBlendProviderProps) => {
  const [state, dispatch] = useReducer(SimpleBlendReducer, []);
  const [target, setTarget] = useState<SimpleIngredients>(undefined);

  return (
    <SimpleBlendContext.Provider
      value={{ ingredients: state, dispatchIngredients: dispatch, target, setTarget }}
    >
      {children}
    </SimpleBlendContext.Provider>
  );
};

const useSimpleBlend = () => {
  const context = useContext(SimpleBlendContext);
  if (context === undefined) {
    throw new Error('<SimpleBlendProvider></SimpleBlendProvider>');
  }

  return context;
};

export default SimpleBlendProvider;
export { useSimpleBlend, SimpleBlendContext };
