import { LinkIcon, TrashIcon } from '@heroicons/react/solid';
import { GetTableRowsResult } from 'eosjs/dist/eosjs-rpc-interfaces';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCollection } from '../../lib/dash/colprovider';
import { SIMPLEBLENDS } from '../../typings/blends/blends';
import { wax } from '../auth/cloudwallet';
import getTransact from '../auth/getTransact';
import { useAuth } from '../auth/provider';
import ShowTarget from './showtarget';

type ShowBlendsProps = {
  title: string;
  table: string;
  type: string;
};
const ShowBlends = ({ title, table, type }: ShowBlendsProps) => {
  const { user } = useAuth();
  const { collection } = useCollection();
  const [data, setData] = useState<GetTableRowsResult | undefined>(undefined);

  const removeAction = async (col: string, blenderid: number) => {
    const session = await getTransact(user);

    await session
      .transact({
        actions: [
          {
            account: process.env.NEXT_PUBLIC_CONTRACTNAME,
            name: 'remblsimple',
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
      .then(() => setData(undefined));
  };

  useEffect(() => {
    const f = async () => {
      if (data) return;

      const x = await wax.rpc.get_table_rows({
        json: true,
        code: process.env.NEXT_PUBLIC_CONTRACTNAME,
        table: table,
        scope: collection,
        limit: 999
      });

      setData(x);
    };

    f();
  }, [collection, data, table]);

  return (
    <div className="my-4">
      <h4 className="text-xl font-black uppercase tracking-wide text-sage mb-8">{title}</h4>

      <div className="grid grid-cols-4 gap-6 items-center">
        {data?.rows.map((i: SIMPLEBLENDS, index) => (
          <div key={index} className="relative bg-gunmetal rounded-lg group">
            <div className="absolute hidden group-hover:bg-black/20 h-full w-full rounded-lg z-30 group-hover:flex items-center justify-center">
              <div className="inline-flex flex-col items-center">
                <button
                  type="button"
                  onClick={async () => await removeAction(i.collection, i.blenderid)}
                  className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md text-white text-sm my-1 inline-flex items-center"
                >
                  <TrashIcon className="h-5 w-5 mr-1" /> Remove
                </button>
                <Link href={`/c/${i.collection}/${i.blenderid}-${type}`}>
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
