import { useRouter } from 'next/dist/client/router';
import DashLayout from '../../../layouts/Dash';
import ColProvider from '../../../lib/collections/colprovider';
import joinString from '../../../lib/joinstring';
import ColPageHeader from '../colpageheader';
import GetRefundNFTs from './getrefunds';

const RefundPage = () => {
  const router = useRouter();
  const { colname } = router.query;

  return (
    <ColProvider collection={joinString(colname ?? '')}>
      <DashLayout title={joinString(colname ?? '')}>
        <div className="py-10">
          <div className="w-5/6 mx-auto bg-gunmetal rounded-xl m-12 py-12 px-14">
            <ColPageHeader
              title="Refunds"
              description="Refund the NFT's that we're lost during failed blends"
            />

            <hr className="border-charcoal my-8" />

            <GetRefundNFTs />
          </div>
        </div>
      </DashLayout>
    </ColProvider>
  );
};

export default RefundPage;
