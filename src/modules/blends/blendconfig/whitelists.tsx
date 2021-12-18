import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { Switch } from '@headlessui/react';
import { Action } from 'eosjs/dist/eosjs-serialize';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useCollection } from '../../../lib/collections/colprovider';
import { dapp } from '../../../lib/waxnet';
import { useBlendConfig } from './provider';

const BlendConfigWhitelists = () => {
  const { user } = useWaxUser();
  const { collection } = useCollection();
  const { config, blenderid } = useBlendConfig();

  const [enable, setEnable] = useState(config ? config.enable_whitelists === 1 : false);
  const inputWhitelists = useRef<HTMLTextAreaElement>(null);

  const update = async () => {
    if (!user) return;

    let whitelists = (inputWhitelists.current?.value ?? '')
      .trim()
      .split(/\r?\n/)
      .map((r) => r.trim())
      .filter((r) => r.length <= 12 && r.length > 3 && !r.includes(' ')); // TODO: add more checks in here, it is necessary

    console.log(whitelists);

    const actions: Action[] = [];

    //  const _enwhitelist = enable ? 1 : 0;
    // TODO: should add some checks in here to prevent unnecessary updates

    if (enable) {
      // add the update whitelist only if the whitelist is enabled
      actions.push({
        account: dapp,
        name: 'setwhitelist',
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
          names_list: whitelists
        }
      });
    }

    try {
      await user
        .transact(
          [
            {
              account: dapp,
              name: 'setonwhlist',
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
                on_whitelist: enable
              }
            },
            ...actions
          ],
          {
            blocksBehind: 3,
            expireSeconds: 1200
          }
        )
        .then((r) => {
          console.log(r);

          toast.success('Successfully update config whitelist.');
        });
    } catch (e) {
      console.error(e);

      toast.error(String(e));
    }
  };

  return (
    <div>
      <h4 className="text-lg uppercase underline text-sage font-bold">Whitelists</h4>

      <div className="w-11/12 mt-4 mx-auto">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <p className="text-neutral-200">List of names for whitelist</p>
            <Switch
              checked={enable}
              onChange={setEnable}
              className={`${
                enable ? 'bg-deep-champagne' : 'bg-gray-200'
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span className="sr-only">Enable end date</span>
              <span
                className={`${
                  enable ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
          </div>

          <textarea
            defaultValue={config?.whitelists.join('\n')}
            ref={inputWhitelists}
            className="w-full py-2 px-4 rounded-lg h-56 text-sm"
          ></textarea>
        </div>
      </div>

      <div className="text-right mt-2">
        <button
          onClick={update}
          type="button"
          className="py-2 px-6 rounded-lg bg-sage hover:bg-deep-champagne text-sm text-gunmetal"
        >
          Update Whitelists
        </button>
      </div>
    </div>
  );
};

export default BlendConfigWhitelists;
