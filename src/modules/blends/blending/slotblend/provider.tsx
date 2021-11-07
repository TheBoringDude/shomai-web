import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react';
import { SLOTBLENDS, SLOTBLENDS_TARGET } from '../../../../typings/blends/blends';
import { SimpleAssetIngredient } from '../../../../typings/blends/ingredients';
import { wax } from '../../../auth/cloudwallet';
import { useBlending } from '../blending-provider';
import SlotBlendingReducer, { SlotBlendingActions } from './reducer';

type SlotBlendingProviderProps = {
  children: ReactNode;
};

type SlotBlendingContextProps = {
  ingredients: Record<number, SimpleAssetIngredient>;
  dispatchIngredients: Dispatch<SlotBlendingActions>;
  config: SLOTBLENDS;
  config_target: SLOTBLENDS_TARGET;
};

const SlotBlendingContext = createContext<SlotBlendingContextProps>({
  ingredients: {},
  dispatchIngredients: () => {},
  config: {
    blenderid: 0,
    author: '',
    collection: '',
    ingredients: []
  },
  config_target: {
    blenderid: 0,
    collection: '',
    targets: []
  }
});

const SlotBlendingProvider = ({ children }: SlotBlendingProviderProps) => {
  const { collection, id } = useBlending();

  const [ingredients, dispatchIngredients] = useReducer(SlotBlendingReducer, {});
  const [config, setConfig] = useState<SLOTBLENDS | undefined>(undefined);
  const [configTarget, setConfigTarget] = useState<SLOTBLENDS_TARGET | undefined>(undefined);

  useEffect(() => {
    const fx = async () => {
      const x = await wax.rpc.get_table_rows({
        json: true,
        code: process.env.NEXT_PUBLIC_CONTRACTNAME,
        scope: collection,
        table: 'slotblender',
        limit: 1,
        lower_bound: id
      });

      setConfig(x.rows[0]);
    };

    const fy = async () => {
      const x = await wax.rpc.get_table_rows({
        json: true,
        code: process.env.NEXT_PUBLIC_CONTRACTNAME,
        scope: collection,
        table: 'mtargetpool',
        limit: 1,
        lower_bound: id
      });

      setConfigTarget(x.rows[0]);
    };

    fx();
    fy();
  }, [collection, id]);

  return (
    <SlotBlendingContext.Provider
      value={{ ingredients, dispatchIngredients, config, config_target: configTarget }}
    >
      {children}
    </SlotBlendingContext.Provider>
  );
};

const useSlotBlender = () => {
  const context = useContext(SlotBlendingContext);
  if (context === undefined) {
    throw new Error('<SimpleBlendProvider></SimpleBlendProvider>');
  }

  return context;
};

export default SlotBlendingProvider;
export { SlotBlendingContext, useSlotBlender };
