import { IAsset } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import { useState } from 'react';
import useSWR from 'swr';
import { GET_TEMPLATE_ASSETS } from '../../lib/account/getassets';
import { fetcher } from '../../lib/fetcher';
import { useAuth } from '../../modules/auth/provider';
import { AtomicRequest } from '../../typings/atomicrequest';
import { useAssetSetter } from './provider';

type ShowAssetProps = {
  onClose: () => void;
};

const ShowAsset = ({ onClose }: ShowAssetProps) => {
  const { user } = useAuth();
  const { defCollection, templateid, pick, ignoreAssets } = useAssetSetter();
  const [selected, setSelected] = useState<number>(undefined);

  const { data } = useSWR<AtomicRequest<IAsset[]>>(
    GET_TEMPLATE_ASSETS(defCollection, templateid, user.wallet),
    fetcher
  );

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {data?.data
          // this prevents choosing already picked assets
          .filter((i) => !ignoreAssets?.includes(Number(i.asset_id)))
          .map((i, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelected(Number(i.asset_id))}
              className={`${
                selected?.toString() === i.asset_id
                  ? `border-2 border-deep-champagne rounded-xl`
                  : ''
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

            pick(selected);
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
