import { ReactNode } from 'react';
import { useAuth } from '../auth/provider';
import UnauthorizedPage from './unauthorized';

type ProtectPageProps = {
  children: ReactNode;
};
const ProtectPage = ({ children }: ProtectPageProps) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <UnauthorizedPage />;

  return <>{children}</>;
};

export default ProtectPage;
