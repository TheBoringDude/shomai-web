import Link from 'next/link';
import { useCollection } from '../../../lib/collections/colprovider';
import getTransact from '../../auth/getTransact';
import { useAuth } from '../../auth/provider';
import { useSlotBlend } from './provider';

const SlotCallAction = () => {
  const { collection } = useCollection();
  const { user } = useAuth();
  const { ingredients, targets } = useSlotBlend();

  const createTransaction = async () => {
    if (ingredients.length === 0 || targets.length === 0) return;
    const session = await getTransact(user);

    const _targets = targets
      .map((t) => {
        return {
          odds: t.odds,
          templateid: t.templateid
        };
      })
      .sort((a, b) => b.odds - a.odds); // sort with odds in descending order

    await session
      .transact({
        actions: [
          {
            account: process.env.NEXT_PUBLIC_CONTRACTNAME,
            name: 'makeblslot',
            authorization: [
              {
                actor: user.wallet,
                permission: user.permission ?? 'active'
              }
            ],
            data: {
              author: user.wallet,
              collection: collection,
              targets: _targets,
              ingredients
            }
          }
        ]
      })
      .catch((e) => {
        console.error(e);
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

export default SlotCallAction;
