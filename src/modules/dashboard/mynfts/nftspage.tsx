import { useRouter } from 'next/dist/client/router';
import DashLayout from '../../../layouts/Dash';
import ColProvider from '../../../lib/dash/colprovider';
import joinString from '../../../lib/joinstring';
import ColHeader from './colheader';
import GetNFTs from './getnfts';

const MyNFTs = () => {
  const router = useRouter();
  const { colname } = router.query;

  return (
    <ColProvider collection={joinString(colname)}>
      <DashLayout title={joinString(colname)}>
        <div className="py-10">
          <div className="w-5/6 mx-auto bg-gunmetal rounded-xl m-12 py-12 px-14">
            <ColHeader />

            <hr className="border-charcoal my-8" />

            <GetNFTs />
          </div>
        </div>
      </DashLayout>
    </ColProvider>
  );
};

export default MyNFTs;
