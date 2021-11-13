import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { ReceiptRefundIcon } from '@heroicons/react/solid';
import { GetTableRowsResult } from 'eosjs/dist/eosjs-rpc-interfaces';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import EmptyComponent from '../../../components/empty-component';
import { useCollection } from '../../../lib/collections/colprovider';
import { dapp } from '../../../lib/waxnet';
import { RefundNFTAsset } from '../../../typings/refund';
import ShowRefunds from './showrefunds';

const GetRefundNFTs = () => {
  const { user, rpc } = useWaxUser();
  const { collection } = useCollection();
  const [data, setData] = useState<GetTableRowsResult | undefined>(undefined);
  const [assets, setAssets] = useState<number[] | undefined>(undefined);

  const callRefund = async () => {
    if (!assets) return;

    if (!user) return;

    const session = await user.session();
    if (!session) return;

    await session
      .transact({
        actions: [
          {
            account: dapp,
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
      })
      .then((r) => {
        console.log(r);

        toast.success('All assets has been refunded back to your wallet.');
      })
      .catch((e) => {
        console.error(e);

        toast.error('Failed to refund assets.');
      });
  };

  useEffect(() => {
    const f = async () => {
      if (!user) return;
      if (data) return;

      const x = await rpc?.get_table_rows({
        json: true,
        code: process.env.NEXT_PUBLIC_CONTRACTNAME,
        table: 'nftrefunds',
        scope: user.wallet,
        limit: 999
      });

      setData(x);
    };

    f();
  }, [data, user, rpc]);

  useEffect(() => {
    if (!data) return;
    if (!user) return;
    if (assets) return;

    const x = data.rows
      .filter((i: RefundNFTAsset) => i.from == user.wallet)
      .map((i: RefundNFTAsset) => i.assetid);
    setAssets(x);
  }, [assets, data, user]);

  if (!data || !assets) return <EmptyComponent />;

  return (
    <div>
      <div className="text-center my-4">
        {/* show only the refund button if user is logged in and there are assets in it */}
        {assets.length > 0 && user && (
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
