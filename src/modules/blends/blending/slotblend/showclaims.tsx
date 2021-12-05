import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { Dialog } from '@headlessui/react';
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Dialogs from '../../../../components/Dialogs';
import { useCollection } from '../../../../lib/collections/colprovider';
import { dapp } from '../../../../lib/waxnet';
import { CLAIMASSET } from '../../../../typings/blends/claims';
import { useBlending } from '../blending-provider';
import ShowClaimsAsset from './showclaimsasset';

type SlotBlendClaimProps = {
  open: boolean;
  onClose: () => void;
  claimid: number;
};

const SlotBlendClaim = ({ open, onClose, claimid }: SlotBlendClaimProps) => {
  const { user, rpc } = useWaxUser();
  const { collection } = useCollection();
  const { id } = useBlending();

  const [data, setData] = useState<CLAIMASSET | undefined>(undefined);
  const [claimed, setClaimed] = useState(false);

  const claimBlend = async (claim: CLAIMASSET) => {
    if (!user) return;

    await user
      .transact(
        [
          {
            account: dapp,
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
        ],
        {
          blocksBehind: 3,
          expireSeconds: 1200
        }
      )
      .then((r) => {
        setClaimed(true);
        toast.success('Sucessfully claimed blend asset!');

        onClose();
      })
      .catch((e) => {
        console.error(e);

        toast.error('Failed to claim blend asset.');
      });
  };

  useEffect(() => {
    if (open) {
      if (data) return;

      let done = false;

      const interval = setInterval(async () => {
        if (claimed) return;

        if (!open) {
          clearInterval(interval);
          return;
        }
        if (done) {
          clearInterval(interval);
          return;
        }

        const x = await rpc?.get_table_rows({
          json: true,
          code: process.env.NEXT_PUBLIC_CONTRACTNAME,
          table: 'claimassets',
          scope: collection,
          lower_bound: claimid,
          upper_bound: claimid,
          limit: 1
        });

        if (!x) return;

        const _data = x.rows as CLAIMASSET[];

        const value = _data.filter(
          (i: CLAIMASSET) => i.blender === user?.wallet && i.blenderid === id
        )[0];
        if (value != null) {
          done = true;
        }

        setData(value);
      }, 3000);
    }
  }, [claimed, claimid, collection, data, id, open, rpc, user?.wallet]);

  return (
    <Dialogs
      open={open}
      onClose={() => {
        if (claimed) {
          onClose();
        }
      }}
      className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gunmetal shadow-xl rounded-2xl"
    >
      <Dialog.Title as="h4" className="font-black text-white text-2xl">
        <span className="text-atomic-tangerine">Claim Blend</span> | Slot Blends
      </Dialog.Title>
      <Dialog.Description className="text-white mt-1">Claim your NFT from blend</Dialog.Description>

      <div className="mt-6">
        {data ? (
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
        ) : (
          <div className="flex justify-center">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </Dialogs>
  );
};

export default SlotBlendClaim;
