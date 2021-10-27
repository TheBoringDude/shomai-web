import { Tab } from '@headlessui/react';
import { useRouter } from 'next/dist/client/router';
import DashLayout from '../../../layouts/Dash';
import ColProvider from '../../../lib/dash/colprovider';
import joinString from '../../../lib/joinstring';
import ColHeader from './colheader';
import ColMenu from './menu';
import BlendPage from './tabs/blendpage';
import SettingsPage from './tabs/settingspage';
import StatsPage from './tabs/statspage';

const CollectionPage = () => {
  const router = useRouter();
  const { colname } = router.query;

  if (!colname) {
    return <></>;
  }

  return (
    <ColProvider collection={joinString(colname)}>
      <DashLayout title={joinString(colname)}>
        <div className="py-10">
          <div className="w-5/6 mx-auto">
            <Tab.Group>
              <div className="flex items-center justify-between">
                <ColHeader collection_name={joinString(colname)} />
                <ColMenu />
              </div>

              <hr className="border-gray-400 my-4" />

              <Tab.Panels className="mt-6 w-11/12 mx-auto">
                <Tab.Panel>
                  <StatsPage />
                </Tab.Panel>
                <Tab.Panel>
                  <BlendPage />
                </Tab.Panel>
                <Tab.Panel>
                  <SettingsPage />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </DashLayout>
    </ColProvider>
  );
};

export default CollectionPage;
