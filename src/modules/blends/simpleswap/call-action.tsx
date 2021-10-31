import Link from 'next/link';
import { useCollection } from '../../../lib/dash/colprovider';
import getTransact from '../../auth/getTransact';
import { useAuth } from '../../auth/provider';
import { useSimpleSwap } from './provider';

const CallSimpleSwapAction = () => {
  const { collection } = useCollection();
  const { user } = useAuth();
  const { ingredient, target } = useSimpleSwap();

  const createTransaction = async () => {
    const session = await getTransact(user);

    await session.transact({
      actions: [
        {
          account: process.env.NEXT_PUBLIC_CONTRACTNAME,
          name: 'makeswsimple',
          authorization: [
            {
              actor: user.wallet,
              permission: user.permission ?? 'active'
            }
          ],
          data: {
            author: user.wallet,
            collection: target.collection,
            target: Number(target.template),
            ingredient: Number(ingredient.template)
          }
        }
      ]
    });
  };
  return (
    <div className="mt-12 text-center flex items-center justify-center">
      <button
        onClick={createTransaction}
        className="bg-deep-champagne hover:bg-atomic-tangerine duration-300 py-3 px-8 rounded-lg mx-1"
      >
        Create Blend
      </button>
      <Link href={`/d/${collection}`}>
        <a className="bg-charcoal text-gray-100 py-3 px-8 rounded-lg mx-1">Cancel</a>
      </Link>
    </div>
  );
};

export default CallSimpleSwapAction;
