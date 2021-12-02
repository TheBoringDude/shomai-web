import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { ReceiptRefundIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';
import EmptyComponent from '../../../components/empty-component';
import { useCollection } from '../../../lib/collections/colprovider';
import { fetcher } from '../../../lib/fetcher';
import { dapp } from '../../../lib/waxnet';
import { APIRequest } from '../../../typings/api';
import { RefundNFTAsset } from '../../../typings/refund';
import ShowRefunds from './showrefunds';

const GetRefundNFTs = () => {
  const { user, isLoggedIn } = useWaxUser();
  const { collection } = useCollection();

  const { data: assets } = useSWR<APIRequest<RefundNFTAsset[]>>(
    collection && isLoggedIn
      ? process.env.NEXT_PUBLIC_SHOMAI_API + `/refunds/${user?.wallet}?collection=${collection}`
      : null,
    fetcher
  );

  const callRefund = async () => {
    if (!assets) return;

    if (!user) return;

    const _assets = assets.data?.map((r) => Number(r.assetid));

    await user
      .transact(
        [
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
              assetids: _assets
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

        mutate(
          process.env.NEXT_PUBLIC_SHOMAI_API + `/refunds/${user?.wallet}?collection=${collection}`
        );

        toast.success('All assets has been refunded back to your wallet.');
      })
      .catch((e) => {
        console.error(e);

        toast.error('Failed to refund assets.');
      });
  };

  if (!assets) return <EmptyComponent />;

  return (
    <div>
      <div className="text-center my-4">
        {/* show only the refund button if user is logged in and there are assets in it */}
        {(assets.data?.length ?? 0 > 0) && isLoggedIn && (
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
      <ShowRefunds assets={assets.data?.map((r) => Number(r.assetid)) ?? []} />
    </div>
  );
};

export default GetRefundNFTs;
