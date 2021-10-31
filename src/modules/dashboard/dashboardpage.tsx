import DashLayout from '../../layouts/Dash';
import { useAuth } from '../auth/provider';
import ShowCollections from './collections';

const DashboardPage = () => {
  const { user } = useAuth();

  return <DashLayout title="Dashboard">{user && <ShowCollections />}</DashLayout>;
};

export default DashboardPage;
