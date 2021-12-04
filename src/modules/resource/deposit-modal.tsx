import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Dialogs from '../../components/Dialogs';
import { useCollection } from '../../lib/collections/colprovider';
import { dapp } from '../../lib/waxnet';
import { useResources } from './provider';

type DepositRamModalProps = {
  open: boolean;
  onClose: () => void;
};
const DepositRamModal = ({ open, onClose }: DepositRamModalProps) => {
  const { user } = useWaxUser();
  const { collection } = useCollection();
  const { market } = useResources();

  const [value, setValue] = useState(1);

  const calcBytes = () => {
    if (!market) return;

    const base = Number(market.base.balance.split(' ')[0]);
    const quote = Number(market.quote.balance.split(' ')[0]);

    return Math.floor(value * (base / quote));
  };

  const calcNFTs = () => {
    const ram = calcBytes();
    if (!ram) return;

    return Math.floor(ram / 151);
  };

  const action = async () => {
    if (!user) return;

    try {
      await user
        .transact(
          [
            {
              account: 'eosio.token',
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
                quantity: value.toFixed(8) + ' WAX',
                memo: collection
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

          toast.success('Sucessfully deposit ram to collection.');
        });
    } catch (e) {
      console.error(e);

      toast.error(String(e));
    }
  };

  return (
    <Dialogs
      open={open}
      onClose={onClose}
      className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gunmetal shadow-xl rounded-2xl"
    >
      <Dialog.Title as="h4" className="font-black text-white text-3xl">
        <span className="text-deep-champagne">Deposit Ram </span>
      </Dialog.Title>

      <Dialog.Description className="text-white mt-1">
        Deposit ram for your blends. Only <strong>WAX</strong> is supported.
      </Dialog.Description>

      <div className="mt-6 w-11/12 mx-auto">
        <div>
          <input
            onChange={(v) => setValue(v.target.valueAsNumber)}
            min={1}
            className="py-2 px-4 rounded-lg w-full"
            placeholder="Enter wax ammount"
            defaultValue={1}
            type="number"
            name="assetwax"
          />

          <div className="mt-2">
            <p className="text-gray-200 text-sm">
              Approximate bytes: <strong>{calcBytes()} bytes</strong>
            </p>
            <p className="text-gray-200 text-sm">
              Approximate NFTs to be minted: <strong>{calcNFTs()} NFTs</strong>
            </p>
          </div>
        </div>

        <div className="my-4 text-center">
          <button
            type="button"
            onClick={action}
            className="py-2 px-8 rounded-lg uppercase bg-sage hover:bg-deep-champagne text:gunmetal text-sm"
          >
            Deposit Ram
          </button>
        </div>
      </div>
    </Dialogs>
  );
};

export default DepositRamModal;
