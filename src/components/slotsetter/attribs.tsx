import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { IAsset } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import { useState } from 'react';
import { GET_USER_ASSETS } from '../../lib/account/getassets';
import useCallAPI from '../../lib/hooks/useCallAPI';
import { useSlotAssetSetter } from './provider';

type SlotSetterAttribsProps = {
  onClose: () => void;
};

const SlotSetterAttribs = ({ onClose }: SlotSetterAttribsProps) => {
  const { user } = useWaxUser();
  const { config, ignoreAssets, pick } = useSlotAssetSetter();
  const [selected, setSelected] = useState<IAsset | undefined>(undefined);

  const data = useCallAPI<IAsset[]>(
    GET_USER_ASSETS(
      config.collection,
      user?.wallet ?? '',
      config.type === 0 || config.type === 2 ? config.schema : ''
    )
  );

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data
          ?.filter((i) => !ignoreAssets?.includes(Number(i.asset_id)))
          .filter((i) => {
            let ok = false;

            if (config.type === 0) {
              // schema
              if (i.schema.schema_name === config.schema) {
                ok = true;
              }
            } else if (config.type === 1) {
              // template
              if (config.templates.includes(Number(i.template?.template_id))) {
                ok = true;
              }
            } else if (config.type === 2) {
              // attribute
              console.log(i);

              for (const at of config.attributes) {
                if (ok && config.require_all_attribs) break;

                for (const x of at.allowed_values) {
                  if (i.data[at.key]?.includes(x)) {
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
              } relative`}
            >
              <span className="z-20 absolute top-0 right-0 bg-deep-champagne text-gunmetal font-bold p-1 rounded-lg text-xs">
                #{i.template_mint}
              </span>

              <Image
                src={`https://ipfs.io/ipfs/${i.data.img}`}
                alt={i.name}
                height="250"
                width="175"
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
              assetid: Number(selected.asset_id),
              mint: Number(selected.template_mint)
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
