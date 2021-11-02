import { useAuth } from '../../modules/auth/provider';
import { useCollection } from '../collections/colprovider';

// simple hook for checking if user is authorized or not
const useAuthorized = () => {
  const { user } = useAuth();
  const { coldata } = useCollection();

  return coldata.authorized_accounts.includes(user?.wallet);
};

export default useAuthorized;
