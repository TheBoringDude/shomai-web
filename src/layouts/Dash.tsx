import { ReactNode } from 'react';
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
      <DashHeader />

      <ServiceInfo />

      {children}
    </PageLayout>
  );
};

export default DashLayout;
