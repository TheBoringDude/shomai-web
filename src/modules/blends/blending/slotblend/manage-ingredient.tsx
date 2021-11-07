import { XCircleIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { SlotIngredients } from '../../../../typings/blends/ingredients';
import PreviewSlotIngredient from '../../slotblend/preview-ingredient';
import { useBlending } from '../blending-provider';
import { useSlotBlender } from './provider';
import SlotSetAsset from './set-asset';

type SlotManageIngredientProps = {
  config: SlotIngredients;
  index: number;
};
const SlotManageIngredient = ({ config, index }: SlotManageIngredientProps) => {
  const { dispatchIngredients, ingredients } = useSlotBlender();
  const { ignoreAssets, setIgnoreAssets } = useBlending();

  const isSet = (t: number) => {
    const x = ingredients[t];

    return x !== undefined;
  };

  return (
    <div
      key={index}
      className={`${
        isSet(index)
          ? `bg-charcoal p-2`
          : `border-2 border-sage group h-64 text-sage px-6 text-center flex items-center justify-center`
      } relative rounded-xl`}
    >
      <PreviewSlotIngredient slot={config} />

      {isSet(index) ? (
        <button
          onClick={() => {
            const ignore = ignoreAssets.filter((i) => i !== ingredients[index].assetid);
            setIgnoreAssets(ignore);

            dispatchIngredients({ type: 'set-ingredient', index, value: undefined });
          }}
          className="absolute z-10 -top-2 -right-2 hover:scale-105 transform text-sage"
        >
          <XCircleIcon className="w-8 h-8" />
        </button>
      ) : (
        <SlotSetAsset config={config} index={index} />
      )}

      {isSet(index) ? (
        <>
          <span className="z-10 -bottom-1 -left-2 absolute text-xs rounded-md bg-atomic-tangerine py-2 px-3">
            {isSet(index)
              ? `#${ingredients[index].assetid}`
              : `${ingredients[index].collection}  #${ingredients[index].template}`}
          </span>
          <Image
            src={`https://ipfs.io/ipfs/${ingredients[index]?.image}`}
            alt=""
            height="400"
            width="300"
            objectFit="contain"
            className="z-0"
          />
        </>
      ) : (
        <p className="flex flex-col tracking-wide">
          <strong className="font-black text-lg">({config.collection})</strong>
          {config.schema_only ? (
            <span>{config.schema}</span>
          ) : (
            <>
              <span className="text-sm my-1">
                from: {config.from === 0 ? 'templates' : 'immutable_data'}
              </span>
              <span className="text-xs">[{config.attributes.length} attribute/s]</span>
            </>
          )}
        </p>
      )}
    </div>
  );
};

export default SlotManageIngredient;
