import { IAsset } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import { useState } from 'react';
import { GET_USER_ASSETS } from '../../lib/account/getassets';
import useCallAPI from '../../lib/hooks/useCallAPI';
import { useAuth } from '../../modules/auth/provider';
import { useSlotAssetSetter } from './provider';

type SlotSetterAttribsProps = {
  onClose: () => void;
};

const SlotSetterAttribs = ({ onClose }: SlotSetterAttribsProps) => {
  const { user } = useAuth();
  const { config, ignoreAssets, pick } = useSlotAssetSetter();
  const [selected, setSelected] = useState<IAsset>(undefined);

  const data = useCallAPI<IAsset[]>(GET_USER_ASSETS(config.collection, user.wallet, config.schema));

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {data
          ?.filter((i) => !ignoreAssets?.includes(Number(i.asset_id)))
          .filter((i) => {
            let ok = false;

            if (config.from === 0) {
              // 0 === templates
              for (const at of config.attributes) {
                if (ok && config.anyof) break;

                if (at.values[0] === i.template.template_id) {
                  ok = true;
                }
              }
            } else if (config.from === 1) {
              // 1 == immutable_data
              for (const at of config.attributes) {
                if (ok && config.anyof) break;

                for (const x of at.values) {
                  if (i.data[at.attrib]?.includes(x)) {
                    ok = true;
                  }
                }
              }
            }

            return ok;
          })
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
              template: Number(selected.template.template_id),
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

export default SlotSetterAttribs;
