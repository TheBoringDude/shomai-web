import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { DuplicateIcon, SwitchHorizontalIcon } from '@heroicons/react/solid';
import { ITemplate } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { GET_COLLECTION_TEMPLATE } from '../../../../lib/account/getauthcol';
import { fetcher } from '../../../../lib/fetcher';
import { dapp } from '../../../../lib/waxnet';
import { AtomicRequest } from '../../../../typings/atomicrequest';
import { useBlending } from '../blending-provider';
import ManageSimpleSwapIngredient from './manage-ingredient';
import { useSimpleSwapBlender } from './provider';

const SimpleSwapBlendingContainer = () => {
  const { collection, id } = useBlending();
  const { config, ingredient } = useSimpleSwapBlender();
  const { user, isLoggedIn } = useWaxUser();
  const { data } = useSWR<AtomicRequest<ITemplate>>(
    config ? GET_COLLECTION_TEMPLATE(collection, config.ingredient) : null,
    fetcher
  );

  const { data: target } = useSWR<AtomicRequest<ITemplate>>(
    config ? GET_COLLECTION_TEMPLATE(collection, config.target) : null,
    fetcher
  );

  const callBlend = async () => {
    if (!ingredient) return;
    if (!user) return;

    await user
      .transact(
        [
          {
            account: 'atomicassets',
            name: 'transfer',
            authorization: [
              {
                actor: user.wallet,
                permission: user.permission ?? 'active'
              }
            ],
            data: {
              from: user.wallet,
              to: dapp,
              asset_ids: [ingredient.assetid],
              memo: collection
            }
          }
        ],
        {
          blocksBehind: 3,
          expireSeconds: 1200
        }
      )
      .then(async () =>
        user
          .transact(
            [
              {
                account: dapp,
                name: 'callswsimple',
                authorization: [
                  {
                    actor: user.wallet,
                    permission: user.permission ?? 'active'
                  }
                ],
                data: {
                  blenderid: id,
                  blender: user.wallet,
                  scope: collection,
                  asset: ingredient.assetid
                }
              }
            ],
            {
              blocksBehind: 3,
              expireSeconds: 1200
            }
          )
          .then((r) => {
            console.log(r);

            toast.success('Swap is successful! You can check your asset in the My NFTs page.');
          })
          .catch((e) => {
            console.error(e);

            toast.error(
              'Failed to swap. If problem persists, please report in the community server.'
            );
          })
      )
      .catch((e) => {
        console.error(e);

        toast.error('Failed to transfer assets for swap.');
      });
  };

  if (!data) return <></>;

  return (
    <div className="my-12 w-4/5 md:w-full lg:w-11/12 mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="text-center">
          <h4 className="font-black text-2xl text-neutral-100">Ingredient</h4>

          <div className="mt-6">
            <ManageSimpleSwapIngredient templateid={config.ingredient} data={data?.data} />
          </div>
        </div>

        <div className="text-center mx-8 lg:mx-10 inline-flex flex-col items-center my-10 md:my-0">
          <span className="text-sage mb-6">
            <SwitchHorizontalIcon className="h-8 lg:h-10 w-8 lg:w-10" />
          </span>
          {isLoggedIn && (
            <button
              type="button"
              onClick={callBlend}
              className="bg-deep-champagne hover:bg-atomic-tangerine text-sm lg:text-base py-2 md:py-3 px-6 lg:px-12 rounded-lg duration-300 inline-flex items-center font-black uppercase tracking-wide text-gunmetal"
            >
              <DuplicateIcon className="h-5 w-5" />
              Swap
            </button>
          )}
        </div>

        <div className="text-center">
          <h4 className="font-black text-2xl text-neutral-100">Target</h4>

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
