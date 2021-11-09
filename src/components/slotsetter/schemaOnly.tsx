import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { IAsset } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import { useState } from 'react';
import { GET_USER_ASSETS } from '../../lib/account/getassets';
import useCallAPI from '../../lib/hooks/useCallAPI';
import { useSlotAssetSetter } from './provider';

type SlotSetterSchemaOnlyProps = {
  onClose: () => void;
};

const SlotSetterSchemaOnly = ({ onClose }: SlotSetterSchemaOnlyProps) => {
  const { user } = useWaxUser();
  const { config, ignoreAssets, pick } = useSlotAssetSetter();
  const [selected, setSelected] = useState<IAsset | undefined>(undefined);

  const data = useCallAPI<IAsset[]>(
    GET_USER_ASSETS(config.collection, user?.wallet ?? '', config.schema)
  );

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {data
          ?.filter((i) => !ignoreAssets?.includes(Number(i.asset_id)))
          .map((i, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelected(i)}
              className={`${
                selected?.asset_id === i.asset_id ? `border-2 border-deep-champagne rounded-xl` : ''
              }`}
            >
              <Image
                src={`https://ipfs.io/ipfs/${i.data.img}`}
                alt={i.name}
                height="200"
                width="150"
                objectFit="contain"
              />
            </button>
          ))}
      </div>

      <div className="flex items-center justify-center mt-8">
        <button
          onClick={() => {
            if (!selected) return;

            pick({
              collection: config.collection,
              image: selected.data.img,
              name: selected.name,
              template: Number(selected.template?.template_id),
              assetid: Number(selected.asset_id)
            });
          }}
          className="py-3 px-12 mx-1 rounded-lg bg-deep-champagne hover:bg-atomic-tangerine text-sm"
          type="submit"
        >
          Select
        </button>

        <button
          className="py-3 px-12 mx-1 rounded-lg bg-charcoal text-gray-300 text-sm"
          type="reset"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SlotSetterSchemaOnly;
