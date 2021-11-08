import { PlusCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import SlotGenerator from '../../../components/SlotGenerator';
import SlotGeneratorProvider from '../../../components/slotgenerator/provider';
import { useCollection } from '../../../lib/collections/colprovider';
import { SlotIngredients } from '../../../typings/blends/ingredients';
import { useSlotBlend } from './provider';

const AddSlotIngredient = () => {
  const [open, setOpen] = useState(false);
  const { collection } = useCollection();
  const { ingredients, dispatchIngredients } = useSlotBlend();

  const pick = (slot: SlotIngredients) => {
    if (slot.schema === '') return;

    if (!slot.schema_only) {
      if (slot.from === -1) return;
      if (slot.attributes.length === 0) return;
    }

    dispatchIngredients({ type: 'add', slot: slot });
    setOpen(false);
  };

  return (
    <SlotGeneratorProvider defCollection={collection} pick={pick}>
      <SlotGenerator open={open} onClose={() => setOpen(false)} />

      <button
        onClick={() => setOpen(true)}
        type="button"
        className="border-2 border-sage rounded-xl h-64 w-52 flex items-center justify-center"
      >
        <p className="text-center text-sage inline-flex flex-col items-center px-3">
          <PlusCircleIcon className="h-10 w-10" />
          <span className="text-xl font-black">Add Slot Ingredient</span>
        </p>
      </button>
    </SlotGeneratorProvider>
  );
};

export default AddSlotIngredient;
