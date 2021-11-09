import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { ReactNode } from 'react';
import UnauthorizedPage from './unauthorized';

type ProtectPageProps = {
  children: ReactNode;
};
const ProtectPage = ({ children }: ProtectPageProps) => {
  const { isLoggedIn } = useWaxUser();

  if (!isLoggedIn) return <UnauthorizedPage />;

  return <>{children}</>;
};

export default ProtectPage;
