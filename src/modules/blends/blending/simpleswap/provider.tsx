import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import { SIMPLESWAPS } from '../../../../typings/blends/blends';
import { SimpleAssetIngredient } from '../../../../typings/blends/ingredients';
import { wax } from '../../../auth/cloudwallet';
import { useBlending } from '../blending-provider';

type SimpleSwapBlendingProviderProps = {
  children: ReactNode;
};

type SimpleSwapBlendingContextProps = {
  ingredient?: SimpleAssetIngredient;
  setIngredient: Dispatch<SetStateAction<SimpleAssetIngredient>>;
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
  const { id, collection } = useBlending();

  const [ingredient, setIngredient] = useState<SimpleAssetIngredient>(undefined);
  const [config, setConfig] = useState<SIMPLESWAPS | undefined>(undefined);

  useEffect(() => {
    const f = async () => {
      const x = await wax.rpc.get_table_rows({
        json: true,
        code: process.env.NEXT_PUBLIC_CONTRACTNAME,
        scope: collection,
        table: 'simswap',
        limit: 1,
        lower_bound: id
      });

      setConfig(x.rows[0]);
    };

    console.log('asdas');

    f();
  }, [collection, id]);

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
