import { PlusCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import AssetPicker from '../../../components/AssetPicker';
import AssetProvider from '../../../components/assetpicker/provider';
import { useCollection } from '../../../lib/collections/colprovider';
import { useSimpleBlend } from './provider';

const AddIngredientSimple = () => {
  const [open, setOpen] = useState(false);
  const { collection } = useCollection();
  const { dispatchIngredients } = useSimpleBlend();

  const pickIngredient = (collection: string, schema: string, template: string, image: string) => {
    if (collection === '' || schema === '' || schema === '' || template === '' || image === '')
      return;

    dispatchIngredients({
      type: 'add-ingredient',
      data: {
        collection,
        schema,
        template,
        image
      }
    });

    setOpen(false);
  };

  return (
    <AssetProvider collection_name={collection} pick={pickIngredient}>
      <AssetPicker open={open} onClose={() => setOpen(false)} />

      <button
        onClick={() => setOpen(true)}
        type="button"
        className="border-2 border-sage rounded-xl h-52 xl:h-64 flex items-center justify-center"
      >
        <p className="text-center text-sage inline-flex flex-col items-center mx-4">
          <PlusCircleIcon className="h-10 w-10" />
          <span className="text-xl font-black">Add Ingredient</span>
        </p>
      </button>
    </AssetProvider>
  );
};

export default AddIngredientSimple;
