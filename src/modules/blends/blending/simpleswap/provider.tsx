import { useWaxUser } from '@cryptopuppie/next-waxauth';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import EmptyComponent from '../../../../components/empty-component';
import { SIMPLESWAPS } from '../../../../typings/blends/blends';
import { SimpleAssetIngredient } from '../../../../typings/blends/ingredients';
import { useBlending } from '../blending-provider';

type SimpleSwapBlendingProviderProps = {
  children: ReactNode;
};

type SimpleSwapBlendingContextProps = {
  ingredient?: SimpleAssetIngredient;
  setIngredient: Dispatch<SetStateAction<SimpleAssetIngredient | undefined>>;
  config: SIMPLESWAPS;
};

const SimpleSwapBlendingContext = createContext<SimpleSwapBlendingContextProps>({
  setIngredient: () => {},
  config: {
    blenderid: 0,
    author: '',
    collection: '',
    ingredient: 0,
    target: 0
  }
});

const SimpleSwapBlendingProvider = ({ children }: SimpleSwapBlendingProviderProps) => {
  const { rpc } = useWaxUser();

  const { id, collection } = useBlending();

  const [ingredient, setIngredient] = useState<SimpleAssetIngredient | undefined>(undefined);
  const [config, setConfig] = useState<SIMPLESWAPS | undefined>(undefined);

  useEffect(() => {
    const f = async () => {
      const x = await rpc?.get_table_rows({
        json: true,
        code: process.env.NEXT_PUBLIC_CONTRACTNAME,
        scope: collection,
        table: 'simswaps',
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
    <SimpleSwapBlendingContext.Provider value={{ ingredient, setIngredient, config }}>
      {children}
    </SimpleSwapBlendingContext.Provider>
  );
};

const useSimpleSwapBlender = () => {
  const context = useContext(SimpleSwapBlendingContext);
  if (context === undefined) {
    throw new Error('<SimpleBlendProvider></SimpleBlendProvider>');
  }

  return context;
};

export default SimpleSwapBlendingProvider;
export { useSimpleSwapBlender, SimpleSwapBlendingContext };
