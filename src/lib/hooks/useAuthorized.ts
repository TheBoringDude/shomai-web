import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { useCollection } from '../collections/colprovider';

// simple hook for checking if user is authorized or not
const useAuthorized = () => {
  const { user } = useWaxUser();
  const { coldata } = useCollection();

  return coldata?.authorized_accounts.includes(user?.wallet ?? '');
};

export default useAuthorized;
