import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { DuplicateIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { toast } from 'react-toastify';
import genRand from '../../../../lib/claim';
import { dapp } from '../../../../lib/waxnet';
import { useBlending } from '../blending-provider';
import SlotBlendingIngredients from './ingredients';
import { useSlotBlender } from './provider';
import SlotBlendClaim from './showclaims';
import SlotBlendingTargets from './targets';

const SlotBlendingContainer = () => {
  const { id, collection } = useBlending();
  const { user, isLoggedIn } = useWaxUser();
  const { config, config_target, ingredients } = useSlotBlender();
  const [open, setOpen] = useState(false);

  const [claimid] = useState(genRand());

  const callBlend = async () => {
    const assets = Object.values(ingredients).map((i) => i?.assetid);

    if (!user) return;

    const session = await user.session();
    if (!session) return;

    console.log(assets);

    await session
      .transact({
        actions: [
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
        ]
      })
      .then(async () => {
        await session
          .transact({
            actions: [
              {
                account: dapp,
                name: 'callblslot',
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
                  assetids: assets,
                  claim_id: claimid
                }
              }
            ]
          })
          .then((r) => {
            console.log(r);

            if (config_target.targets.length > 1) {
              setOpen(true);
            }

            toast.info('Waiting for blend....');
          })
          .catch((e) => {
            console.error(e);

            toast.error(
              'Failed to blend. If problem persists, please report in the community server.'
            );
          });
      })
      .catch((e) => {
        console.error(e);

        toast.error('Failed to transfer assets for blending.');
      });
  };

  return (
    <div className="my-12 w-11/12 mx-auto">
      <SlotBlendClaim claimid={claimid} open={open} onClose={() => setOpen(false)} />

      <h3 className="text-2xl md:text-3xl text-center underline font-black tracking-wide text-deep-champagne">
        {config.title}
      </h3>

      <hr className="border-charcoal my-6" />

      <SlotBlendingIngredients />

      <hr className="my-12 border-charcoal" />

      <SlotBlendingTargets />

      <div className="text-center mt-12">
        {isLoggedIn && (
          <button
            type="button"
            onClick={callBlend}
            className="bg-deep-champagne hover:bg-atomic-tangerine py-3 px-12 rounded-lg duration-300 inline-flex items-center font-black uppercase tracking-wide text-gunmetal"
          >
            <DuplicateIcon className="h-5 w-5" />
            Blend
          </button>
        )}
      </div>
    </div>
  );
};

export default SlotBlendingContainer;
