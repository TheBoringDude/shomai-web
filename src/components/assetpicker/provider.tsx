import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

type AssetProviderProps = {
  children: ReactNode;
  collection_name: string;
  lockCollection?: boolean;
  pick: (collection: string, schema: string, templateid: string, image: string) => void;
};

type AssetContextProps = {
  lockCollection?: boolean;
  defCollection: string;
  collection: string;
  setCollection: Dispatch<SetStateAction<string>>;
  schema: string;
  setSchema: Dispatch<SetStateAction<string>>;
  template: string;
  setTemplate: Dispatch<SetStateAction<string>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  pick: (collection: string, schema: string, templateid: string, image: string) => void;
};

const AssetContext = createContext<AssetContextProps>({
  lockCollection: false,
  defCollection: '',
  collection: '',
  setCollection: () => {},
  schema: '',
  setSchema: () => {},
  template: '',
  setTemplate: () => {},
  image: '',
  setImage: () => {},
  pick: () => {}
});

const AssetProvider = ({ children, collection_name, lockCollection, pick }: AssetProviderProps) => {
  const [collection, setCollection] = useState(collection_name);
  const [schema, setSchema] = useState('');
  const [template, setTemplate] = useState('');
  const [image, setImage] = useState('');

  return (
    <AssetContext.Provider
      value={{
        defCollection: collection_name,
        lockCollection,
        collection,
        setCollection,
        schema,
        setSchema,
        template,
        setTemplate,
        image,
        setImage,
        pick
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

const useAssetPicker = () => {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('<AsserProvider></AsserProvider>');
  }

  return context;
};

export default AssetProvider;
export { useAssetPicker, AssetContext };
