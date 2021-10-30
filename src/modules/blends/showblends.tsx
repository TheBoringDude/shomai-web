import { GetTableRowsResult } from 'eosjs/dist/eosjs-rpc-interfaces';
import { useEffect, useState } from 'react';
import { useCollection } from '../../lib/dash/colprovider';
import { SIMPLEBLENDS } from '../../typings/blends/blends';
import { wax } from '../auth/cloudwallet';
import ShowTarget from './showtarget';

type ShowBlendsProps = {
  title: string;
  table: string;
};
const ShowBlends = ({ title, table }: ShowBlendsProps) => {
  const { collection } = useCollection();
  const [data, setData] = useState<GetTableRowsResult | undefined>(undefined);

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
          <div key={index} className="relative bg-gunmetal rounded-lg">
            <span className="absolute -top-1 -left-2 z-10 bg-deep-champagne py-1 px-3 rounded-sm text-xs">
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
