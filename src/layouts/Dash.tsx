import { ReactNode } from 'react';
import DashProvider from '../modules/dashboard/dashprovider';
import DashFooter from '../modules/dashboard/footer';
import DashHeader from '../modules/dashboard/header';
import ServiceInfo from '../modules/dashboard/serviceinfo';
import PageLayout from './Page';

type DashLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};
const DashLayout = ({ title, description, children }: DashLayoutProps) => {
  return (
    <PageLayout title={title} description={description}>
      <DashProvider>
        <DashHeader />

        <ServiceInfo />

        {children}

        <DashFooter />
      </DashProvider>
    </PageLayout>
  );
};

export default DashLayout;
