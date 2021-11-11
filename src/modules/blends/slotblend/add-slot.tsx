import { PlusCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import SlotGenerator from '../../../components/SlotGenerator';
import SlotGeneratorProvider from '../../../components/slotgenerator/provider';
import { useCollection } from '../../../lib/collections/colprovider';
import { SlotBlendAllIngredientProps, SlotIngredients } from '../../../typings/blends/ingredients';
import { useSlotBlend } from './provider';

const AddSlotIngredient = () => {
  const [open, setOpen] = useState(false);
  const { collection } = useCollection();
  const { ingredients, dispatchIngredients } = useSlotBlend();

  const pick = (slot: SlotBlendAllIngredientProps) => {
    if (slot.collection === '') return;

    let amount = slot.amount;
    if (amount < 1) {
      amount = 1;
    }

    switch (slot.type) {
      case 0: {
        if (!slot.schema) return;

        const sl: SlotIngredients = {
          type: 0,
          collection: slot.collection,
          amount: amount,
          props: {
            schema: slot.schema
          }
        };
        dispatchIngredients({ type: 'add', slot: sl });

        break;
      }
      case 1: {
        if (slot.templates.length < 1) return;

        const sl: SlotIngredients = {
          type: 1,
          collection: slot.collection,
          amount: amount,
          props: {
            templates: slot.templates
          }
        };
        dispatchIngredients({ type: 'add', slot: sl });

        break;
      }
      case 2: {
        if (slot.attributes.length < 1) return;

        const sl: SlotIngredients = {
          type: 2,
          collection: slot.collection,
          amount: amount,
          props: {
            schema: slot.schema,
            require_all_attribs: slot.require_all_attribs,
            attributes: slot.attributes
          }
        };
        dispatchIngredients({ type: 'add', slot: sl });

        break;
      }
      default:
        return;
    }

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
