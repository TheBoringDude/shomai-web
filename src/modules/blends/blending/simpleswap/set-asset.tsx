import { PlusCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import AssetSetter from '../../../../components/AssetSetter';
import AssetSetterProvider from '../../../../components/assetsetter/provider';
import { useBlending } from '../blending-provider';
import { useSimpleSwapBlender } from './provider';

type SetSimpleSwapAssetProps = {
  templateid: number;
};

const SetSimpleSwapAsset = ({ templateid }: SetSimpleSwapAssetProps) => {
  const { collection } = useBlending();
  const { setIngredient } = useSimpleSwapBlender();
  const { ignoreAssets } = useBlending();
  const [open, setOpen] = useState(false);

  const pick = (asset: number) => {
    if (!asset) return;

    setIngredient({ assetid: asset, template: templateid });

    setOpen(false);
  };

  return (
    <AssetSetterProvider
      ignoreAssets={ignoreAssets}
      templateid={templateid}
      defCollection={collection}
      pick={pick}
    >
      <AssetSetter open={open} onClose={() => setOpen(false)} />

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute z-10 -top-2 -right-2 hover:scale-105 transform text-sage"
      >
        <PlusCircleIcon className="w-8 h-8" />
      </button>
    </AssetSetterProvider>
  );
};

export default SetSimpleSwapAsset;
