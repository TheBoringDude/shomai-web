import { createContext, ReactNode, useContext } from 'react';
import { SlotAssetIngredient, SlotBlendAllIngredientProps } from '../../typings/blends/ingredients';

type SlotSetterProviderProps = {
  children: ReactNode;
  config: SlotBlendAllIngredientProps;
  defCollection: string;
  ignoreAssets: number[];
  pick: (sl: SlotAssetIngredient) => void;
};

type SlotSetterContextProps = {
  config: SlotBlendAllIngredientProps;
  defCollection: string;
  ignoreAssets: number[];
  pick: (sl: SlotAssetIngredient) => void;
};

const SlotSetterContext = createContext<SlotSetterContextProps>({
  config: {
    collection: '',
    schema: '',
    templates: [],
    require_all_attribs: false,
    attributes: [],
    type: null,
    amount: 0
  },
  defCollection: '',
  ignoreAssets: [],
  pick: () => {}
});

const SlotSetterProvider = ({
  children,
  config,
  defCollection,
  ignoreAssets,
  pick
}: SlotSetterProviderProps) => {
  return (
    <SlotSetterContext.Provider value={{ config, defCollection, ignoreAssets, pick }}>
      {children}
    </SlotSetterContext.Provider>
  );
};

const useSlotAssetSetter = () => {
  const context = useContext(SlotSetterContext);
  if (context === undefined) {
    throw new Error('<SlotSetterProvider></SlotSetterProvider>');
  }

  return context;
};

export default SlotSetterProvider;
export { SlotSetterContext, useSlotAssetSetter };
