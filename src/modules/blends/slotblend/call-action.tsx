import { useWaxUser } from '@cryptopuppie/next-waxauth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useCollection } from '../../../lib/collections/colprovider';
import { dapp } from '../../../lib/waxnet';
import { useSlotBlend } from './provider';

const SlotCallAction = () => {
  const router = useRouter();

  const { collection } = useCollection();
  const { user } = useWaxUser();
  const { ingredients, targets, title } = useSlotBlend();

  const createTransaction = async () => {
    if (ingredients.length === 0 || targets.length === 0 || !title) return;

    if (!user) return;

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

    await user
      .transact(
        [
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
        ],
        {
          blocksBehind: 3,
          expireSeconds: 1200
        }
      )
      .then((r) => {
        console.log(r);

        // show toast success
        toast.success('Successfully created a new slot blend.');

        // route back to dashboard blends tab
        router.push(`/d/${collection}?p=blends`);
      })
      .catch((e) => {
        console.error(e);

        // show toast error
        toast.error(String(e));
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
