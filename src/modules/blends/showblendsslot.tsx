import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { LinkIcon, TrashIcon } from '@heroicons/react/solid';
import { GetTableRowsResult } from 'eosjs/dist/eosjs-rpc-interfaces';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useCollection } from '../../lib/collections/colprovider';
import useAuthorized from '../../lib/hooks/useAuthorized';
import { dapp } from '../../lib/waxnet';
import { SLOTBLENDS } from '../../typings/blends/blends';

type ShowBlendsSlotProps = {
  title: string;
  table: string;
  type: string;
  action: string;
};
const ShowBlendsSlot = ({ title, table, type, action }: ShowBlendsSlotProps) => {
  const router = useRouter();

  const { collection } = useCollection();
  const { user, rpc } = useWaxUser();
  const authorized = useAuthorized();
  const [data, setData] = useState<GetTableRowsResult | undefined>(undefined);

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
                  permission: user.permission ?? 'active'
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

          setData(undefined);

          // show toast success
          toast.success('Successfully removed blend.');
        });
    } catch (e) {
      console.error(e);

      // show toast error
      toast.error(String(e));
    }
  };

  useEffect(() => {
    const f = async () => {
      if (data) return;

      const x = await rpc?.get_table_rows({
        json: true,
        code: process.env.NEXT_PUBLIC_CONTRACTNAME,
        table: table,
        scope: collection,
        limit: 999
      });

      setData(x);
    };

    f();
  }, [collection, data, rpc, table]);

  return (
    <div className="my-4">
      <h4 className="text-xl font-black uppercase tracking-wide text-sage mb-8">{title}</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 items-center">
        {data?.rows.map((i: SLOTBLENDS, index) => (
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
            <div className="h-80 w-11/12 mx-auto text-center flex items-center justify-center bg-sage my-8 rounded-lg">
              <strong className="text-gunmetal text-xl">{i.title}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowBlendsSlot;
