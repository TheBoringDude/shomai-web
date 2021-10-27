import { ReactNode } from 'react';
import Seo from '../components/Seo';

type PageLayoutProps = {
  children: ReactNode;
  title: string;
  description?: string;
};
const PageLayout = ({ children, title, description }: PageLayoutProps) => {
  return (
    <>
      <Seo title={title} description={description} />

      {children}
    </>
  );
};

export default PageLayout;
