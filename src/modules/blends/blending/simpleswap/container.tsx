import { DuplicateIcon, SwitchHorizontalIcon } from '@heroicons/react/solid';
import { ITemplate } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import useSWR from 'swr';
import { GET_COLLECTION_TEMPLATE } from '../../../../lib/account/getauthcol';
import { fetcher } from '../../../../lib/fetcher';
import { AtomicRequest } from '../../../../typings/atomicrequest';
import { useBlending } from '../blending-provider';
import ManageSimpleSwapIngredient from './manage-ingredient';
import { useSimpleSwapBlender } from './provider';

const SimpleSwapBlendingContainer = () => {
  const { collection } = useBlending();
  const { config } = useSimpleSwapBlender();
  const { data } = useSWR<AtomicRequest<ITemplate>>(
    config ? GET_COLLECTION_TEMPLATE(collection, config.ingredient) : null,
    fetcher
  );

  const { data: target } = useSWR<AtomicRequest<ITemplate>>(
    config ? GET_COLLECTION_TEMPLATE(collection, config.target) : null,
    fetcher
  );

  const callBlend = async () => {};

  if (!data) return <></>;

  return (
    <div className="my-12 w-11/12 mx-auto">
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h4 className="font-black text-2xl text-gray-100">Ingredient</h4>

          <div className="mt-6">
            <ManageSimpleSwapIngredient templateid={config.ingredient} data={data?.data} />
          </div>
        </div>

        <div className="text-center mx-10 inline-flex flex-col items-center">
          <span className="text-sage mb-6">
            <SwitchHorizontalIcon className="h-10 w-10" />
          </span>
          <button
            type="button"
            onClick={callBlend}
            className="bg-deep-champagne hover:bg-atomic-tangerine py-3 px-12 rounded-lg duration-300 inline-flex items-center font-black uppercase tracking-wide text-gunmetal"
          >
            <DuplicateIcon className="h-5 w-5" />
            Swap
          </button>
        </div>

        <div className="text-center">
          <h4 className="font-black text-2xl text-gray-100">Target</h4>

          <div className="flex items-center justify-center mt-6">
            {target && (
              <div className="bg-charcoal p-2 rounded-lg">
                <Image
                  src={`https://ipfs.io/ipfs/${target?.data.immutable_data.img}`}
                  alt={target?.data.immutable_data.name}
                  height="400"
                  width="300"
                  objectFit="contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleSwapBlendingContainer;
