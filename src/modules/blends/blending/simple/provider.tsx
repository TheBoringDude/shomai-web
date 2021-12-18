import { useGetTableRows } from '@cryptopuppie/useeoschain';
import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import EmptyComponent from '../../../../components/empty-component';
import { dapp } from '../../../../lib/waxnet';
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
  const { id, collection } = useBlending();

  const [state, dispatch] = useReducer(SimpleBlendingReducer, {});
  const data = useGetTableRows<SIMPLEBLENDS>({
    code: dapp,
    scope: collection,
    table: 'simblenders',
    limit: 1,
    lower_bound: String(id),
    upper_bound: String(id)
  });
  const config = data?.rows[0];

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
