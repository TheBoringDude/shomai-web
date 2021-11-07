import { Dialog } from '@headlessui/react';
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import Dialogs from '../../../../components/Dialogs';
import { useCollection } from '../../../../lib/collections/colprovider';
import { CLAIMASSET } from '../../../../typings/blends/claims';
import { wax } from '../../../auth/cloudwallet';
import getTransact from '../../../auth/getTransact';
import { useAuth } from '../../../auth/provider';
import { useBlending } from '../blending-provider';
import ShowClaimsAsset from './showclaimsasset';

type SlotBlendClaimProps = {
  open: boolean;
  onClose: () => void;
  claimid: number
};

const SlotBlendClaim = ({ open, onClose, claimid }: SlotBlendClaimProps) => {
  const { user } = useAuth();
  const { collection } = useCollection();
  const { id } = useBlending();

  const [data, setData] = useState<CLAIMASSET | undefined>(undefined);

  const claimBlend = async (claim: CLAIMASSET) => {
    const session = await getTransact(user);

    await session
      .transact({
        actions: [
          {
            account: process.env.NEXT_PUBLIC_CONTRACTNAME,
            name: 'claimblslot',
            authorization: [
              {
                actor: user.wallet,
                permission: user.permission ?? 'active'
              }
            ],
            data: {
              claim_id: claim.claim_id,
              blender: user.wallet,
              scope: collection
            }
          }
        ]
      })
      .then(() => onClose());
  };

  useEffect(() => {
    if (open) {
      if (data) return;

      setInterval(async () => {
        const x = await wax.rpc.get_table_rows({
          json: true,
          code: process.env.NEXT_PUBLIC_CONTRACTNAME,
          table: 'claimassets',
          scope: collection,
          lower_bound: claimid,
          limit: 1
        });

        const _data = x.rows as CLAIMASSET[];

        setData(
          _data.filter((i: CLAIMASSET) => i.blender === user.wallet && i.blenderid === id)[0]
        );
      }, 3000);
    }
  });

  return (
    <Dialogs
      open={open}
      onClose={onClose}
      className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gunmetal shadow-xl rounded-2xl"
    >
      <Dialog.Title as="h4" className="font-black text-white text-2xl">
        <span className="text-atomic-tangerine">Claim Blend</span> | Slot Blends
      </Dialog.Title>
      <Dialog.Description className="text-white mt-1">Claim your NFT from blend</Dialog.Description>

      <div className="mt-6">
        {data && (
          <div className="flex items-center justify-center">
            <ShowClaimsAsset claim={data} />

            <button
              type="button"
              onClick={() => claimBlend(data)}
              className="bg-deep-champagne hover:bg-atomic-tangerine py-3 px-12 rounded-lg duration-300 inline-flex items-center font-black uppercase tracking-wide text-gunmetal"
            >
              <ArrowNarrowLeftIcon className="h-5 w-5 mr-2" />
              Claim
            </button>
          </div>
        )}
      </div>
    </Dialogs>
  );
};

export default SlotBlendClaim;
