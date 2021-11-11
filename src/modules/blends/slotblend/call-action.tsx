import { useWaxUser } from '@cryptopuppie/next-waxauth';
import Link from 'next/link';
import { useCollection } from '../../../lib/collections/colprovider';
import { dapp } from '../../../lib/waxnet';
import { useSlotBlend } from './provider';

const SlotCallAction = () => {
  const { collection } = useCollection();
  const { user } = useWaxUser();
  const { ingredients, targets, title } = useSlotBlend();

  const createTransaction = async () => {
    if (ingredients.length === 0 || targets.length === 0 || !title) return;

    if (!user) return;

    const session = await user.session();
    if (!session) return;

    const _targets = targets
      .map((t) => {
        return {
          odds: t.odds,
          templateid: t.templateid
        };
      })
      .sort((a, b) => b.odds - a.odds); // sort with odds in descending order

    const _ingredients = ingredients.map((i) => {
      return {
        ...i,
        props: [
          i.type === 0
            ? 'SlotBlendSchemaIngredient'
            : i.type === 1
            ? 'SlotBlendTemplateIngredient'
            : i.type === 2
            ? 'SlotBlendAttribIngredient'
            : null,
          i.props
        ]
      };
    });

    console.log(_ingredients);

    await session
      .transact({
        actions: [
          {
            account: dapp,
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
              ingredients: _ingredients,
              title
            }
          }
        ]
      })
      .then((r) => {
        console.log(r);
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
