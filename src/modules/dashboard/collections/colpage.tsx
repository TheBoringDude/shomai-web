import { useRouter } from 'next/dist/client/router';
import DashLayout from '../../../layouts/Dash';
import joinString from '../../../lib/joinstring';

const CollectionPage = () => {
  const router = useRouter();
  const { colname } = router.query;

  if (!colname) {
    return <></>;
  }

  return <DashLayout title={joinString(colname)}>{colname}</DashLayout>;
};

export default CollectionPage;
