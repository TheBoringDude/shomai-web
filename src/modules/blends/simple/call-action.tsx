import { useWaxUser } from '@cryptopuppie/next-waxauth';
import Link from 'next/link';
import { useCollection } from '../../../lib/collections/colprovider';
import { dapp } from '../../../lib/waxnet';
import { useSimpleBlend } from './provider';

const CallAction = () => {
  const { collection } = useCollection();
  const { user } = useWaxUser();
  const { ingredients, target } = useSimpleBlend();

  const createTransaction = async () => {
    if (!target) return;
    if (!user) return;

    const session = await user.session();
    if (!session) return;

    const _ingredients = ingredients.map((i) => Number(i.template));

    await session.transact({
      actions: [
        {
          account: dapp,
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
