import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { DuplicateIcon } from '@heroicons/react/solid';
import { ITemplate } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import {
  GET_COLLECTION_TEMPLATE,
  GET_COLLECTION_TEMPLATES
} from '../../../../lib/account/getauthcol';
import { fetcher } from '../../../../lib/fetcher';
import { dapp } from '../../../../lib/waxnet';
import { AtomicRequest } from '../../../../typings/atomicrequest';
import { useBlending } from '../blending-provider';
import ManageIngredient from './manage-ingredient';
import { useSimpleBlender } from './provider';

const SimpleBlenderIngredients = () => {
  const { config, ingredients } = useSimpleBlender();
  const { collection, id } = useBlending();
  const { user, isLoggedIn } = useWaxUser();

  const { data } = useSWR<AtomicRequest<ITemplate[]>>(
    config ? GET_COLLECTION_TEMPLATES(collection, undefined, config.ingredients) : null,
    fetcher
  );
  const { data: target } = useSWR<AtomicRequest<ITemplate>>(
    config ? GET_COLLECTION_TEMPLATE(collection, config.target) : null,
    fetcher
  );

  const callBlend = async () => {
    const vs = Object.values(ingredients);
    const assets = vs.map((i) => i?.assetid);
    const _templates = vs.map((i) => i?.template);

    if (_templates.length !== config.ingredients.length) return;

    if (JSON.stringify(_templates.sort()) != JSON.stringify(config.ingredients.sort())) {
      return;
    }

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
              asset_ids: assets,
              memo: collection
            }
          }
        ],
        {
          blocksBehind: 3,
          expireSeconds: 1200
        }
      )
      .then(
        async () =>
          await user
            .transact(
              [
                {
                  account: dapp,
                  name: 'callblsimple',
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
                    assetids: assets
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

              toast.success('Blend is successful! You can check your asset in the My NFTs page.');
            })
            .catch((e) => {
              console.error(e);

              toast.error(
                'Failed to blend. If problem persists, please report in the community server.'
              );
            })
      )
      .catch((e) => {
        console.error(e);

        toast.error('Failed to transfer assets for blending.');
      });
  };

  if (!data) {
    return <></>;
  }

  return (
    <div className="my-12 w-11/12 mx-auto">
      <h4 className="font-black text-2xl text-gray-100">Ingredients</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center mt-6">
        {config.ingredients.map((i, index) => (
          <ManageIngredient key={index} index={index} templateid={i} data={data?.data} />
        ))}
      </div>

      <hr className="my-12 border-charcoal" />

      <div className="text-center">
        <h4 className="font-black text-2xl text-gray-100">Target</h4>

        <div className="flex flex-col md:flex-row items-center justify-center mt-6">
          {target && (
            <div className="bg-charcoal p-2 rounded-lg">
              <Image
                src={`https://ipfs.io/ipfs/${target?.data.immutable_data.img}`}
                alt={target?.data.immutable_data.name}
                height="300"
                width="200"
                objectFit="contain"
              />
            </div>
          )}

          {isLoggedIn && (
            <div className="text-center ml-0 md:ml-12 mt-4 md:mt-0">
              <button
                type="button"
                onClick={callBlend}
                className="bg-deep-champagne hover:bg-atomic-tangerine py-3 px-12 rounded-lg duration-300 inline-flex items-center font-black uppercase tracking-wide text-gunmetal"
              >
                <DuplicateIcon className="h-5 w-5" />
                Blend
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleBlenderIngredients;
