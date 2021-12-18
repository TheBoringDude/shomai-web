import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { useCollection } from '../../../lib/collections/colprovider';
import { dapp } from '../../../lib/waxnet';
import { useBlendConfig } from './provider';

const BlendConfigMaxUses = () => {
  const { user } = useWaxUser();
  const { collection } = useCollection();
  const { config, blenderid } = useBlendConfig();

  const inputMaxUse = useRef<HTMLInputElement>(null);
  const inputMaxUserUse = useRef<HTMLInputElement>(null);
  const inputMaxUserCooldown = useRef<HTMLInputElement>(null);

  const update = async () => {
    if (!user) return;

    let maxuse = inputMaxUse.current?.valueAsNumber ?? undefined;
    let maxuseruse = inputMaxUserUse.current?.valueAsNumber ?? undefined;
    let maxusercooldown = inputMaxUserCooldown.current?.valueAsNumber ?? undefined;

    if (maxuse === undefined || maxuseruse === undefined || maxusercooldown === undefined) {
      // TODO: show error in here

      return;
    }
    if (maxuse < -1 || maxuseruse < -1 || maxusercooldown < -1) {
      // TODO: show error in here

      return;
    }

    if (config != null) {
      const {
        maxuse: imaxuse,
        maxuseruse: imaxuseruse,
        maxusercooldown: imaxusercooldown
      } = config;

      if (
        maxuse === imaxuse &&
        maxuseruse === imaxuseruse &&
        maxusercooldown === imaxusercooldown
      ) {
        toast.info("Blend config's max uses is similar.");
        return;
      }
    }

    try {
      await user
        .transact(
          [
            {
              account: dapp,
              name: 'setmax',
              authorization: [
                {
                  actor: user.wallet,
                  permission: user.permission ?? 'active'
                }
              ],
              data: {
                author: user.wallet,
                blenderid,
                scope: collection,
                maxuse,
                maxuseruse,
                maxusercooldown
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

          toast.success('Sucessfully updated config max uses.');
        });
    } catch (e) {
      console.error(e);

      toast.error(String(e));
    }
  };

  return (
    <div className="my-2">
      <h4 className="text-lg uppercase underline text-sage font-bold">Max Uses</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-11/12 mt-4 mx-auto">
        <div className="my-1 sm:my-0">
          <p className="text-neutral-200 mb-1">Maximum Use</p>
          <input
            defaultValue={`${config ? config.maxuse : -1}`}
            ref={inputMaxUse}
            type="number"
            name="maxuse"
            className="py-2 px-4 rounded-lg w-full"
            placeholder="Set max use"
          />
        </div>

        <div className="my-1 sm:my-0">
          <p className="text-neutral-200 mb-1">Max User Use</p>
          <input
            defaultValue={`${config ? config.maxuseruse : -1}`}
            ref={inputMaxUserUse}
            type="number"
            name="maxuseruse"
            className="py-2 px-4 rounded-lg w-full"
            placeholder="Set max user use"
          />
        </div>

        <div className="my-1 sm:my-0">
          <p className="text-neutral-200 mb-1">Max User Cooldown</p>
          <input
            defaultValue={`${config ? config.maxusercooldown : -1}`}
            ref={inputMaxUserCooldown}
            type="number"
            name="maxusercooldown"
            className="py-2 px-4 rounded-lg w-full"
            placeholder="Set max user cooldown"
          />
        </div>
      </div>

      <div className="text-right mt-2">
        <button
          onClick={update}
          type="button"
          className="py-2 px-6 rounded-lg bg-sage hover:bg-deep-champagne text-sm text-gunmetal"
        >
          Update Max Use
        </button>
      </div>
    </div>
  );
};

export default BlendConfigMaxUses;
