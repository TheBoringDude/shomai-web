import { PlusCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import AssetSetter from '../../../../components/AssetSetter';
import AssetSetterProvider from '../../../../components/assetsetter/provider';
import { useBlending } from '../blending-provider';
import { useSimpleBlender } from './provider';

type SetAssetProps = {
  templateid: number;
  index: number;
};

const SetAsset = ({ templateid, index }: SetAssetProps) => {
  const { collection } = useBlending();
  const { dispatchIngredients } = useSimpleBlender();
  const { ignoreAssets, setIgnoreAssets } = useBlending();
  const [open, setOpen] = useState(false);

  const pick = (asset: number, mint: number) => {
    if (!asset) return;

    dispatchIngredients({
      type: 'set-ingredient',
      index,
      value: {
        assetid: asset,
        template: templateid,
        mint
      }
    });

    const ignore = [...ignoreAssets, asset];
    setIgnoreAssets(ignore);

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

export default SetAsset;
