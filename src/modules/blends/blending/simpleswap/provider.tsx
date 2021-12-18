import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { useGetTableRows } from '@cryptopuppie/useeoschain';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import EmptyComponent from '../../../../components/empty-component';
import { dapp } from '../../../../lib/waxnet';
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
  const data = useGetTableRows<SIMPLESWAPS>({
    code: dapp,
    scope: collection,
    table: 'simswaps',
    limit: 1,
    lower_bound: String(id),
    upper_bound: String(id)
  });
  const config = data?.rows[0];

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
