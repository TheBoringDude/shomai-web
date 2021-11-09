import { useWaxUser } from '@cryptopuppie/next-waxauth';
import DashLayout from '../../layouts/Dash';
import ShowCollections from './collections';

const DashboardPage = () => {
  const { isLoggedIn } = useWaxUser();

  return <DashLayout title="Dashboard">{isLoggedIn && <ShowCollections />}</DashLayout>;
};

export default DashboardPage;
