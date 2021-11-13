import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { IAsset } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import { useState } from 'react';
import useSWR from 'swr';
import { GET_TEMPLATE_ASSETS } from '../../lib/account/getassets';
import { fetcher } from '../../lib/fetcher';
import { AtomicRequest } from '../../typings/atomicrequest';
import { useAssetSetter } from './provider';

type ShowAssetProps = {
  onClose: () => void;
};

const ShowAsset = ({ onClose }: ShowAssetProps) => {
  const { user } = useWaxUser();
  const { defCollection, templateid, pick, ignoreAssets } = useAssetSetter();
  const [selected, setSelected] = useState<IAsset | undefined>(undefined);

  const { data } = useSWR<AtomicRequest<IAsset[]>>(
    GET_TEMPLATE_ASSETS(defCollection, templateid, user?.wallet ?? ''),
    fetcher
  );

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data?.data
          // this prevents choosing already picked assets
          .filter((i) => !ignoreAssets?.includes(Number(i.asset_id)))
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

            pick(Number(selected.asset_id), Number(selected.template_mint));
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

export default ShowAsset;
