import DashLayout from '../../layouts/Dash';
import ShowCollections from './collections';

const DashboardPage = () => {
  return (
    <DashLayout title="Dashboard">
      <ShowCollections />
    </DashLayout>
  );
};

export default DashboardPage;
