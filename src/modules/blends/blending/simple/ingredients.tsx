import { DuplicateIcon } from '@heroicons/react/solid';
import { ITemplate } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import useSWR from 'swr';
import {
  GET_COLLECTION_TEMPLATE,
  GET_COLLECTION_TEMPLATES
} from '../../../../lib/account/getauthcol';
import { fetcher } from '../../../../lib/fetcher';
import { AtomicRequest } from '../../../../typings/atomicrequest';
import getTransact from '../../../auth/getTransact';
import { useAuth } from '../../../auth/provider';
import { useBlending } from '../blending-provider';
import ManageIngredient from './manage-ingredient';
import { useSimpleBlender } from './provider';

const SimpleBlenderIngredients = () => {
  const { config, ingredients } = useSimpleBlender();
  const { collection, id } = useBlending();
  const { user } = useAuth();

  const { data } = useSWR<AtomicRequest<ITemplate[]>>(
    config ? GET_COLLECTION_TEMPLATES(collection, null, config.ingredients) : null,
    fetcher
  );
  const { data: target } = useSWR<AtomicRequest<ITemplate>>(
    config ? GET_COLLECTION_TEMPLATE(collection, config.target) : null,
    fetcher
  );

  const callBlend = async () => {
    const vs = Object.values(ingredients);
    const assets = vs.map((i) => i.assetid);
    const _templates = vs.map((i) => i.template);

    if (_templates.length !== config.ingredients.length) return;

    if (JSON.stringify(_templates.sort()) != JSON.stringify(config.ingredients.sort())) {
      console.log('unequal!');
      return;
    }

    const session = await getTransact(user);

    await session
      .transact({
        actions: [
          {
            account: process.env.NEXT_PUBLIC_CONTRACTNAME,
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
        ]
      })
      .catch((e) => {
        console.error(e);
      });
  };

  if (!data) {
    return <></>;
  }

  return (
    <div className="my-12 w-11/12 mx-auto">
      <h4 className="font-black text-2xl text-gray-100">Ingredients</h4>

      <div className="grid grid-cols-4 gap-6 mt-6">
        {config.ingredients.map((i, index) => (
          <ManageIngredient key={index} index={index} templateid={i} data={data?.data} />
        ))}
      </div>

      <hr className="my-12 border-charcoal" />

      <div className="text-center">
        <h4 className="font-black text-2xl text-gray-100">Target</h4>

        <div className="flex items-center justify-center mt-6">
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

          <div className="text-center ml-12">
            <button
              type="button"
              onClick={callBlend}
              className="bg-deep-champagne hover:bg-atomic-tangerine py-3 px-12 rounded-lg duration-300 inline-flex items-center font-black uppercase tracking-wide text-gunmetal"
            >
              <DuplicateIcon className="h-5 w-5" />
              Blend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleBlenderIngredients;
