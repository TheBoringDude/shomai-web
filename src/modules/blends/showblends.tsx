import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { LinkIcon, TrashIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { useCollection } from '../../lib/collections/colprovider';
import useAuthorized from '../../lib/hooks/useAuthorized';
import { dapp } from '../../lib/waxnet';
import { BASEBLENDINFO_PROPS, COLLECTIONBLENDS_PROPS } from '../../typings/api';
import { SIMPLEBLENDS, SIMPLESWAPS } from '../../typings/blends/blends';
import { useDashboard } from '../dashboard/dashprovider';
import ShowTarget from './showtarget';

type ShowBlendsProps = {
  table: string;
  type: string;
  action: string;
};
const ShowBlends = ({ table, type, action }: ShowBlendsProps) => {
  const { user } = useWaxUser();
  const authorized = useAuthorized();
  const { blends } = useDashboard();
  const { collection } = useCollection();

  const _blend = useMemo(() => {
    if (!blends) return;

    return blends[table as keyof COLLECTIONBLENDS_PROPS] as
      | BASEBLENDINFO_PROPS<SIMPLEBLENDS[]>
      | BASEBLENDINFO_PROPS<SIMPLESWAPS[]>;
  }, [blends, table]);

  const removeAction = async (col: string, blenderid: number) => {
    if (!user) return;

    const session = await user.session();
    if (!session) return;

    try {
      await session
        .transact({
          actions: [
            {
              account: dapp,
              name: action,
              authorization: [
                {
                  actor: user.wallet,
                  permission: user.permission
                }
              ],
              data: {
                user: user.wallet,
                scope: col,
                blenderid
              }
            }
          ]
        })
        .then((r) => {
          console.log(r);

          mutate(process.env.NEXT_PUBLIC_SHOMAI_API + `/blends/${collection}`);

          // show toast success
          toast.success('Successfully removed blend.');
        });
    } catch (e) {
      console.error(e);

      // show toast error
      toast.error(String(e));
    }
  };

  return (
    <div className="my-4">
      <h4 className="text-xl font-black uppercase tracking-wide text-sage mb-8">{_blend?.info}</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
        {_blend?.data.map((i, index) => (
          <div key={index} className="relative bg-gunmetal rounded-lg group">
            <div className="absolute hidden group-hover:bg-black/20 h-full w-full rounded-lg z-30 group-hover:flex items-center justify-center">
              <div className="inline-flex flex-col items-center">
                {authorized && (
                  <button
                    type="button"
                    onClick={async () => await removeAction(i.collection, i.blenderid)}
                    className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md text-white text-sm my-1 inline-flex items-center"
                  >
                    <TrashIcon className="h-5 w-5 mr-1" /> Remove
                  </button>
                )}
                <Link href={`/d/${i.collection}/blends/${i.blenderid}-${type}`}>
                  <a
                    target="_blank"
                    className="bg-charcoal hover:bg-gunmetal py-2 px-4 rounded-md text-white text-sm my-1 inline-flex items-center"
                  >
                    <LinkIcon className="h-5 w-5 mr-1" /> View
                  </a>
                </Link>
              </div>
            </div>

            <span className="absolute -top-1 -left-2 z-10 bg-deep-champagne py-2 px-3 rounded-sm font-bold text-xs text-gunmetal shadow-xl">
              #{i.blenderid}
            </span>
            <ShowTarget collection={i.collection} templateid={i.target} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowBlends;
