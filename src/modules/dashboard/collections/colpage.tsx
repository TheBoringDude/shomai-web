import { Tab } from '@headlessui/react';
import { useRouter } from 'next/dist/client/router';
import DashLayout from '../../../layouts/Dash';
import ColProvider from '../../../lib/collections/colprovider';
import joinString from '../../../lib/joinstring';
import DashProvider from '../dashprovider';
import ColHeader from './colheader';
import BlendPage from './tabs/blendpage';
import ResourcesPage from './tabs/resourcespage';
import SettingsPage from './tabs/settingspage';
import StatsPage from './tabs/statspage';

const tabmenus = ['stats', 'blends', 'settings'];

const CollectionPage = () => {
  const router = useRouter();
  const { colname, p } = router.query;

  if (!colname) {
    return <></>;
  }

  return (
    <ColProvider collection={joinString(colname)}>
      <DashLayout title={joinString(colname)}>
        <DashProvider>
          <div className="py-16">
            <div className="w-5/6 mx-auto">
              <Tab.Group defaultIndex={tabmenus.indexOf(joinString(p ?? '')) ?? 0}>
                <ColHeader />

                <hr className="border-gray-400 my-8" />

                <Tab.Panels className="mt-6 w-11/12 mx-auto">
                  <Tab.Panel>
                    <StatsPage />
                  </Tab.Panel>
                  <Tab.Panel>
                    <BlendPage />
                  </Tab.Panel>
                  <Tab.Panel>
                    <ResourcesPage />
                  </Tab.Panel>
                  <Tab.Panel>
                    <SettingsPage />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </DashProvider>
      </DashLayout>
    </ColProvider>
  );
};

export default CollectionPage;
