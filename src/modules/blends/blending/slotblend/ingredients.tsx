import { SlotAnotherIngredients, SlotIngredients } from '../../../../typings/blends/ingredients';
import SlotManageIngredient from './manage-ingredient';
import { useSlotBlender } from './provider';

const SlotBlendingIngredients = () => {
  const {
    config: { ingredients },
    ingredients: d
  } = useSlotBlender();

  const genIngredients = () => {
    const arr = [];

    for (const a of ingredients) {
      arr.push(...Array(a.amount).fill(a));
    }

    return arr;
  };

  const _ingredients = genIngredients();

  const parseConfig = (i: SlotAnotherIngredients) => {
    return {
      ...i,
      props: i.props[1]
    };
  };

  return (
    <div className="">
      <h4 className="font-black text-2xl text-gray-100">Ingredients</h4>

      <div className="grid grid-cols-4 gap-6 items-center mt-6">
        {_ingredients.map((i, index) => (
          <SlotManageIngredient
            key={index}
            config={parseConfig(i) as SlotIngredients}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default SlotBlendingIngredients;
