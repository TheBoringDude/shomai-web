import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { SimpleAssetIngredient } from '../../typings/blends/ingredients';

type AssetSetterProviderProps = {
  children: ReactNode;
  defCollection: string;
  templateid: number;
  pick: (assetid: number) => void;
};

type AssetSetterContextProps = {
  asset?: SimpleAssetIngredient;
  setAsset: Dispatch<SetStateAction<SimpleAssetIngredient | undefined>>;
  defCollection: string;
  templateid: number;
  pick: (assetid: number) => void;
};

const AssetSetterContext = createContext<AssetSetterContextProps>({
  setAsset: () => {},
  defCollection: '',
  templateid: 0,
  pick: () => {}
});

const AssetSetterProvider = ({
  children,
  defCollection,
  templateid,
  pick
}: AssetSetterProviderProps) => {
  const [asset, setAsset] = useState<SimpleAssetIngredient | undefined>(undefined);

  return (
    <AssetSetterContext.Provider value={{ asset, setAsset, defCollection, templateid, pick }}>
      {children}
    </AssetSetterContext.Provider>
  );
};

const useAssetSetter = () => {
  const context = useContext(AssetSetterContext);
  if (context === undefined) {
    throw new Error('<AssetSetterProvider></AssetSetterProvider>');
  }

  return context;
};

export default AssetSetterProvider;
export { useAssetSetter, AssetSetterContext };