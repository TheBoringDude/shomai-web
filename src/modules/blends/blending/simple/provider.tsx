import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react';
import { SIMPLEBLENDS } from '../../../../typings/blends/blends';
import { SimpleAssetIngredient } from '../../../../typings/blends/ingredients';
import { wax } from '../../../auth/cloudwallet';
import { useBlending } from '../blending-provider';
import SimpleBlendingReducer, { SimpleBlendingActions } from './reducer';

type SimpleBlendingProviderProps = {
  children: ReactNode;
};

type SimpleBlendingContextProps = {
  ingredients: Record<number, SimpleAssetIngredient>;
  dispatchIngredients: Dispatch<SimpleBlendingActions>;
  config: SIMPLEBLENDS;
};

const SimpleBlendingContext = createContext<SimpleBlendingContextProps>({
  ingredients: [],
  dispatchIngredients: () => {},
  config: {
    blenderid: 0,
    author: '',
    collection: '',
    ingredients: [],
    target: 0
  }
});

const SimpleBlendingProvider = ({ children }: SimpleBlendingProviderProps) => {
  const { id, collection } = useBlending();

  const [state, dispatch] = useReducer(SimpleBlendingReducer, {});
  const [config, setConfig] = useState<SIMPLEBLENDS | undefined>(undefined);

  console.log(config);

  useEffect(() => {
    const f = async () => {
      const x = await wax.rpc.get_table_rows({
        json: true,
        code: process.env.NEXT_PUBLIC_CONTRACTNAME,
        scope: collection,
        table: 'simblender',
        limit: 1,
        lower_bound: id
      });

      setConfig(x.rows[0]);
    };

    f();
  }, [collection, id]);

  return (
    <SimpleBlendingContext.Provider
      value={{ ingredients: state, dispatchIngredients: dispatch, config }}
    >
      {children}
    </SimpleBlendingContext.Provider>
  );
};

const useSimpleBlender = () => {
  const context = useContext(SimpleBlendingContext);
  if (context === undefined) {
    throw new Error('<SimpleBlendProvider></SimpleBlendProvider>');
  }

  return context;
};

export default SimpleBlendingProvider;
export { useSimpleBlender, SimpleBlendingContext };
