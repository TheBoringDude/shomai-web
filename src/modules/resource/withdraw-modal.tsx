import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Dialogs from '../../components/Dialogs';
import { useCollection } from '../../lib/collections/colprovider';
import { dapp } from '../../lib/waxnet';
import { useResources } from './provider';

type WithdrawRamModalProps = {
  open: boolean;
  onClose: () => void;
};
const WithdrawRamModal = ({ open, onClose }: WithdrawRamModalProps) => {
  const { user } = useWaxUser();
  const { collection } = useCollection();
  const { market } = useResources();

  const [value, setValue] = useState(1);
  const [recipient, setRecipient] = useState(user?.wallet);

  const action = async () => {
    if (!user) return;
    if (!value || !recipient) return;

    try {
      await user
        .transact(
          [
            {
              account: dapp,
              name: 'withdrawram',
              authorization: [
                {
                  actor: user.wallet,
                  permission: user.permission ?? 'active'
                }
              ],
              data: {
                author: user.wallet,
                collection,
                recipient,
                bytes: value
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

          toast.success('Successfully withdraw ram from collection.');
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
        Withdraw the ram to the recipient.
      </Dialog.Description>

      <div className="mt-6 w-11/12 mx-auto">
        <div>
          <div className="flex flex-col my-2">
            <label htmlFor="rambytes" className="text-neutral-300 mb-1">
              Bytes:
            </label>
            <input
              onChange={(v) => setValue(v.target.valueAsNumber)}
              min={1}
              className="py-2 px-4 rounded-lg w-full"
              placeholder="Enter wax ammount"
              defaultValue={1}
              type="number"
              name="rambytes"
            />
          </div>

          <div className="flex flex-col my-2">
            <label htmlFor="rambytes" className="text-neutral-300 mb-1">
              Recipient:
            </label>
            <input
              onChange={(v) => setRecipient(v.target.value)}
              className="py-2 px-4 rounded-lg w-full"
              placeholder="Enter recepient"
              defaultValue={user?.wallet}
              type="text"
              name="rambytes"
            />
          </div>
        </div>

        <div className="my-4 text-center">
          <button
            type="button"
            onClick={action}
            className="py-2 px-8 rounded-lg uppercase bg-sage hover:bg-deep-champagne text:gunmetal text-sm"
          >
            Withdraw Ram
          </button>
        </div>
      </div>
    </Dialogs>
  );
};

export default WithdrawRamModal;
