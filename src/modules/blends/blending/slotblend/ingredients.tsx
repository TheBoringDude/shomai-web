import { useSlotBlender } from './provider';

const SlotBlendingIngredients = () => {
  const { config } = useSlotBlender();

  return (
    <div className="">
      <h4 className="font-black text-2xl text-gray-100">Ingredients</h4>

      <div className=""> {JSON.stringify(config)}</div>
    </div>
  );
};

export default SlotBlendingIngredients;
