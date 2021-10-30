import DashLayout from '../../layouts/Dash';
import ProtectPage from '../protectpage/protectpage';
import ShowCollections from './collections';

const DashboardPage = () => {
  return (
    <ProtectPage>
      <DashLayout title="Dashboard">
        <ShowCollections />
      </DashLayout>
    </ProtectPage>
  );
};

export default DashboardPage;
