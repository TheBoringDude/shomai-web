import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { useRouter } from 'next/dist/client/router';
import { ReactNode, useEffect } from 'react';
import EmptyComponent from '../../components/empty-component';
import { useHasMounted } from '../../hooks/useHasMounted';
import { useCollection } from '../../lib/collections/colprovider';

type RouteBlendsProps = {
  children: ReactNode;
};
const RouteBlends = ({ children }: RouteBlendsProps) => {
  const router = useRouter();
  const { user, isLoggedIn } = useWaxUser();
  const { coldata } = useCollection();
  const mounted = useHasMounted();

  useEffect(() => {
    if (mounted) {
      if (!coldata) return;

      // verify if user is authorized by collection
      const authorized = coldata?.authorized_accounts.includes(user?.wallet ?? '');

      if (!authorized) {
        // if not authorized, router push to the collections page
        router.push(`/d/${coldata.collection_name}?p=blends`);
      }
    }
  }, [user, coldata, router, mounted, isLoggedIn]);

  if (!user || !coldata) return <EmptyComponent />;

  return <>{children}</>;
};

export default RouteBlends;
