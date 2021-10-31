import { XCircleIcon } from '@heroicons/react/solid';
import { ITemplate } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import { useSimpleSwapBlender } from './provider';
import SetSimpleSwapAsset from './set-asset';

type ManageSimpleSwapIngredientProps = {
  templateid: number;
  data: ITemplate;
};
const ManageSimpleSwapIngredient = ({ templateid, data }: ManageSimpleSwapIngredientProps) => {
  const { ingredient, setIngredient } = useSimpleSwapBlender();

  const isSet = (t: string) => {
    return t === String(ingredient?.template);
  };

  return (
    <div className="relative bg-charcoal rounded-xl p-2 group">
      {isSet(data.template_id) ? (
        <button
          type="button"
          onClick={() => {
            setIngredient(undefined);
          }}
          className="absolute z-10 -top-2 -right-2 hover:scale-105 transform text-sage"
        >
          <XCircleIcon className="w-8 h-8" />
        </button>
      ) : (
        <SetSimpleSwapAsset templateid={templateid} />
      )}

      <span className="z-10 -bottom-1 -left-2 absolute text-xs rounded-md bg-atomic-tangerine py-2 px-3">
        {isSet(data.template_id)
          ? `#${ingredient.assetid}`
          : `${data.collection.collection_name}  #${data.template_id}`}
      </span>
      <Image
        src={`https://ipfs.io/ipfs/${data.immutable_data.img}`}
        alt=""
        height="400"
        width="300"
        objectFit="contain"
        className={`z-0 ${isSet(data.template_id) ? '' : 'filter grayscale'}`}
      />
    </div>
  );
};

export default ManageSimpleSwapIngredient;
