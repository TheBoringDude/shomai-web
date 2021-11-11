import { PlusCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import SlotSetter from '../../../../components/SlotSetter';
import SlotSetterProvider from '../../../../components/slotsetter/provider';
import { useCollection } from '../../../../lib/collections/colprovider';
import {
  SlotAssetIngredient,
  SlotBlendAllIngredientProps,
  SlotIngredients
} from '../../../../typings/blends/ingredients';
import { useBlending } from '../blending-provider';
import { useSlotBlender } from './provider';

type SlotSetAssetProps = {
  index: number;
  config: SlotIngredients;
};
const SlotSetAsset = ({ index, config }: SlotSetAssetProps) => {
  const { collection } = useCollection();

  const [open, setOpen] = useState(false);
  const { ignoreAssets, setIgnoreAssets } = useBlending();
  const { dispatchIngredients } = useSlotBlender();

  const pick = (sl: SlotAssetIngredient) => {
    if (!sl) return;

    dispatchIngredients({ type: 'set-ingredient', index, value: sl });

    const ignore = [...ignoreAssets, sl.assetid];
    setIgnoreAssets(ignore);

    setOpen(false);
  };

  const cfg = {
    type: config.type,
    collection: config.collection,
    amount: config.amount,
    ...config.props
  };

  return (
    <SlotSetterProvider
      defCollection={collection}
      config={cfg as SlotBlendAllIngredientProps}
      ignoreAssets={ignoreAssets}
      pick={pick}
    >
      <SlotSetter
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute z-10 -top-2 -right-2 hover:scale-105 transform text-sage"
      >
        <PlusCircleIcon className="w-8 h-8" />
      </button>
    </SlotSetterProvider>
  );
};

export default SlotSetAsset;
