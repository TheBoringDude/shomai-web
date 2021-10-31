import { XCircleIcon } from '@heroicons/react/solid';
import { ITemplate } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import { useMemo } from 'react';
import { useBlending } from '../blending-provider';
import { useSimpleBlender } from './provider';
import SetAsset from './set-asset';

type ManageIngredientProps = {
  templateid: number;
  data: ITemplate[];
  index: number;
};
const ManageIngredient = ({ templateid, data, index }: ManageIngredientProps) => {
  const { dispatchIngredients, ingredients } = useSimpleBlender();
  const { ignoreAssets, setIgnoreAssets } = useBlending();

  const x = useMemo(() => {
    return data.filter((i) => i.template_id === templateid.toString())[0];
  }, [data, templateid]);

  const isSet = (t: number) => {
    const x = ingredients[t];

    return x != null;
  };

  return (
    <div className="relative bg-charcoal rounded-xl p-2 group">
      {isSet(index) ? (
        <button
          type="button"
          onClick={() => {
            const ignore = ignoreAssets.filter((i) => i !== ingredients[index].assetid);
            setIgnoreAssets(ignore);

            dispatchIngredients({
              type: 'set-ingredient',
              index: index,
              value: undefined
            });
          }}
          className="absolute z-10 -top-2 -right-2 hover:scale-105 transform text-sage"
        >
          <XCircleIcon className="w-8 h-8" />
        </button>
      ) : (
        <SetAsset templateid={templateid} index={index} />
      )}

      <span className="z-10 -bottom-1 -left-2 absolute text-xs rounded-md bg-atomic-tangerine py-2 px-3">
        {isSet(index)
          ? `#${ingredients[index].assetid}`
          : `${x.collection.collection_name}  #${x.template_id}`}
      </span>
      <Image
        src={`https://ipfs.io/ipfs/${x.immutable_data.img}`}
        alt=""
        height="400"
        width="300"
        objectFit="contain"
        className={`z-0 ${isSet(index) ? '' : 'filter grayscale'}`}
      />
    </div>
  );
};

export default ManageIngredient;
