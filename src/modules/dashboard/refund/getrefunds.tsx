import { ReceiptRefundIcon } from '@heroicons/react/solid';
import { GetTableRowsResult } from 'eosjs/dist/eosjs-rpc-interfaces';
import { useEffect, useState } from 'react';
import EmptyComponent from '../../../components/empty-component';
import { useCollection } from '../../../lib/dash/colprovider';
import { RefundNFTAsset } from '../../../typings/refund';
import { wax } from '../../auth/cloudwallet';
import getTransact from '../../auth/getTransact';
import { useAuth } from '../../auth/provider';
import ShowRefunds from './showrefunds';

const GetRefundNFTs = () => {
  const { user } = useAuth();
  const { collection } = useCollection();
  const [data, setData] = useState<GetTableRowsResult | undefined>(undefined);
  const [assets, setAssets] = useState<number[] | undefined>(undefined);

  const callRefund = async () => {
    const session = await getTransact(user);

    await session.transact({
      actions: [
        {
          account: process.env.NEXT_PUBLIC_CONTRACTNAME,
          name: 'refundnfts',
          authorization: [
            {
              actor: user.wallet,
              permission: user.permission ?? 'active'
            }
          ],
          data: {
            user: user.wallet,
            scope: collection,
            assetids: assets
          }
        }
      ]
    });
  };

  useEffect(() => {
    const f = async () => {
      if (data) return;

      const x = await wax.rpc.get_table_rows({
        json: true,
        code: process.env.NEXT_PUBLIC_CONTRACTNAME,
        table: 'refundnft',
        scope: collection,
        limit: 999
      });

      setData(x);
    };

    f();
  }, [collection, data]);

  useEffect(() => {
    if (!data) return;
    if (!user) return;

    const x = data.rows
      .filter((i: RefundNFTAsset) => i.from == user.wallet)
      .map((i: RefundNFTAsset) => i.assetid);
    setAssets(x);
  }, [assets, data, user]);

  if (!data || !assets) return <EmptyComponent />;

  return (
    <div>
      <div className="text-center my-4">
        {assets.length > 0 && (
          <button
            onClick={callRefund}
            title="Refund All NFTs"
            className="inline-flex items-center py-3 px-8 bg-deep-champagne bg-opacity-90 hover:bg-opacity-100 text-sm uppercase rounded-lg"
          >
            <ReceiptRefundIcon className="h-5 w-5 mr-1" />
            Refund All
          </button>
        )}
      </div>
      <ShowRefunds assets={assets} />
    </div>
  );
};

export default GetRefundNFTs;
