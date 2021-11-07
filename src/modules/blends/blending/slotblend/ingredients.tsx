import SlotManageIngredient from './manage-ingredient';
import { useSlotBlender } from './provider';

const SlotBlendingIngredients = () => {
  const {
    config: { ingredients },
    ingredients: d
  } = useSlotBlender();

  return (
    <div className="">
      <h4 className="font-black text-2xl text-gray-100">Ingredients</h4>

      <div className="grid grid-cols-4 gap-6 items-center mt-6">
        {ingredients.map((i, index) => (
          <SlotManageIngredient key={index} config={i} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SlotBlendingIngredients;
