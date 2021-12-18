import { useGetTableRows } from '@cryptopuppie/useeoschain';
import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import EmptyComponent from '../../../../components/empty-component';
import { dapp } from '../../../../lib/waxnet';
import { SLOTBLENDSFROM_, SLOTBLENDS_TARGET } from '../../../../typings/blends/blends';
import { SlotAssetIngredient } from '../../../../typings/blends/ingredients';
import { useBlending } from '../blending-provider';
import SlotBlendingReducer, { SlotBlendingActions } from './reducer';

type SlotBlendingProviderProps = {
  children: ReactNode;
};

type SlotBlendingContextProps = {
  ingredients: Record<number, SlotAssetIngredient | undefined>;
  dispatchIngredients: Dispatch<SlotBlendingActions>;
  config: SLOTBLENDSFROM_;
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
  const { collection, id } = useBlending();

  const [ingredients, dispatchIngredients] = useReducer(SlotBlendingReducer, {});
  const data = useGetTableRows<SLOTBLENDSFROM_>({
    code: dapp,
    scope: collection,
    table: 'slotblenders',
    limit: 1,
    lower_bound: String(id),
    upper_bound: String(id)
  });
  const xdata = useGetTableRows<SLOTBLENDS_TARGET>({
    code: dapp,
    scope: collection,
    table: 'targetpools',
    limit: 1,
    lower_bound: String(id),
    upper_bound: String(id)
  });

  const config = data?.rows[0];
  const configTarget = xdata?.rows[0];

  if (!config || !configTarget) return <EmptyComponent />;

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
