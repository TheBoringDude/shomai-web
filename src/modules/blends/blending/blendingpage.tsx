import { ReactNode } from 'react';
import DashLayout from '../../../layouts/Dash';
import joinString from '../../../lib/joinstring';
import { useBlending } from './blending-provider';
import GetCollection from './getcollection';

type BlendingPageProps = {
  children: ReactNode;
};

const BlendingPage = ({ children }: BlendingPageProps) => {
  const { collection, blend } = useBlending();

  return (
    <DashLayout title={joinString(collection) + ' - ' + joinString(blend)}>
      <div className="w-11/12 my-12 mx-auto bg-gunmetal rounded-xl py-8 px-12">
        <GetCollection />

        <div>{children}</div>
      </div>
    </DashLayout>
  );
};

export default BlendingPage;
