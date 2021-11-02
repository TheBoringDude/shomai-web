import Link from 'next/link';
import { useCollection } from '../../../lib/collections/colprovider';
import getTransact from '../../auth/getTransact';
import { useAuth } from '../../auth/provider';
import { useSimpleBlend } from './provider';

const CallAction = () => {
  const { collection } = useCollection();
  const { user } = useAuth();
  const { ingredients, target } = useSimpleBlend();

  const createTransaction = async () => {
    const session = await getTransact(user);

    const _ingredients = ingredients.map((i) => Number(i.template));

    await session.transact({
      actions: [
        {
          account: process.env.NEXT_PUBLIC_CONTRACTNAME,
          name: 'makeblsimple',
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
            ingredients: _ingredients
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
      <Link href={`/d/${collection}?p=blends`}>
        <a className="bg-charcoal text-gray-100 py-3 px-8 rounded-lg mx-1">Cancel</a>
      </Link>
    </div>
  );
};

export default CallAction;
