import { useWaxUser } from '@cryptopuppie/next-waxauth';
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react';
import EmptyComponent from '../../../../components/empty-component';
import { SIMPLEBLENDS } from '../../../../typings/blends/blends';
import { SimpleAssetIngredient } from '../../../../typings/blends/ingredients';
import { useBlending } from '../blending-provider';
import SimpleBlendingReducer, { SimpleBlendingActions } from './reducer';

type SimpleBlendingProviderProps = {
  children: ReactNode;
};

type SimpleBlendingContextProps = {
  ingredients: Record<number, SimpleAssetIngredient | undefined>;
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
  const { rpc } = useWaxUser();

  const { id, collection } = useBlending();

  const [state, dispatch] = useReducer(SimpleBlendingReducer, {});
  const [config, setConfig] = useState<SIMPLEBLENDS | undefined>(undefined);

  useEffect(() => {
    const f = async () => {
      const x = await rpc?.get_table_rows({
        json: true,
        code: process.env.NEXT_PUBLIC_CONTRACTNAME,
        scope: collection,
        table: 'simblenders',
        limit: 1,
        lower_bound: id
      });

      if (!x) return;

      setConfig(x.rows[0]);
    };

    f();
  }, [collection, id, rpc]);

  if (!config) return <EmptyComponent />;

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
