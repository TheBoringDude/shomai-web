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
import { SLOTBLENDS, SLOTBLENDS_TARGET } from '../../../../typings/blends/blends';
import { SlotAssetIngredient } from '../../../../typings/blends/ingredients';
import { useBlending } from '../blending-provider';
import SlotBlendingReducer, { SlotBlendingActions } from './reducer';

type SlotBlendingProviderProps = {
  children: ReactNode;
};

type SlotBlendingContextProps = {
  ingredients: Record<number, SlotAssetIngredient>;
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
    ingredients: [],
    title: ''
  },
  config_target: {
    blenderid: 0,
    collection: '',
    targets: []
  }
});

const SlotBlendingProvider = ({ children }: SlotBlendingProviderProps) => {
  const { rpc } = useWaxUser();

  const { collection, id } = useBlending();

  const [ingredients, dispatchIngredients] = useReducer(SlotBlendingReducer, {});
  const [config, setConfig] = useState<SLOTBLENDS | undefined>(undefined);
  const [configTarget, setConfigTarget] = useState<SLOTBLENDS_TARGET | undefined>(undefined);

  useEffect(() => {
    const fx = async () => {
      const x = await rpc?.get_table_rows({
        json: true,
        code: process.env.NEXT_PUBLIC_CONTRACTNAME,
        scope: collection,
        table: 'slotblenders',
        limit: 1,
        lower_bound: id
      });

      if (!x) return;

      setConfig(x.rows[0]);
    };

    const fy = async () => {
      const x = await rpc?.get_table_rows({
        json: true,
        code: process.env.NEXT_PUBLIC_CONTRACTNAME,
        scope: collection,
        table: 'targetpools',
        limit: 1,
        lower_bound: id
      });

      if (!x) return;

      setConfigTarget(x.rows[0]);
    };

    fx();
    fy();
  }, [collection, id, rpc]);

  if (!config || !configTarget) return <></>;

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
