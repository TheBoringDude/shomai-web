import EmptyComponent from '../../../../components/empty-component';
import { useCollection } from '../../../../lib/collections/colprovider';
import { useIsWhitelisted } from '../../../../lib/collections/useservicelist';
import useAuthorized from '../../../../lib/hooks/useAuthorized';
import DepositRam from '../../../resource/deposit';
import ResourceProvider from '../../../resource/provider';
import ShowRamResource from '../../../resource/showresource';
import WithdrawRam from '../../../resource/withdraw';

const ResourcesPage = () => {
  const { collection } = useCollection();
  const authorized = useAuthorized();
  const isWhitelisted = useIsWhitelisted(collection);

  return (
    <div>
      <h5 className="text-2xl font-black tracking-wide text-white mb-4 underline">
        Resources (RAM)
      </h5>

      {authorized && isWhitelisted ? (
        <ResourceProvider>
          <div className="mt-8 text-center">
            <ShowRamResource />

            <div>
              <DepositRam />
              <WithdrawRam />
            </div>
          </div>
        </ResourceProvider>
      ) : (
        <EmptyComponent />
      )}
    </div>
  );
};

export default ResourcesPage;
