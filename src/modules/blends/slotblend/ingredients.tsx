import { XCircleIcon } from '@heroicons/react/solid';
import AddSlotIngredient from './add-slot';
import PreviewSlotIngredient from './preview-ingredient';
import { useSlotBlend } from './provider';

const SlotBlendIngredients = () => {
  const { ingredients, dispatchIngredients } = useSlotBlend();

  return (
    <>
      {/* add ingredients */}
      <div>
        <h4 className="font-black text-2xl text-gray-100">Ingredients</h4>
        <div className="mt-6 grid grid-cols-4 gap-6 items-center">
          {ingredients.map((i, index) => (
            <div
              key={index}
              className="border-2 border-sage group h-64 rounded-lg text-sage px-6 text-center flex items-center justify-center relative"
            >
              <PreviewSlotIngredient slot={i} />

              <button
                onClick={() => {
                  dispatchIngredients({ type: 'remove', index });
                }}
                className="absolute z-10 -top-2 -right-2 hover:scale-105 transform text-sage"
              >
                <XCircleIcon className="w-8 h-8" />
              </button>

              <p className="flex flex-col tracking-wide">
                <strong className="font-black text-lg">({i.collection})</strong>
                {i.schema_only ? (
                 <span>{i.schema}</span> 
                ) : (
                  <>
                  <span className="text-sm my-1">
                  from: {i.from === 0 ? 'templates' : 'immutable_data'}
                </span>
                <span className="text-xs">[{i.attributes.length} attribute/s]</span></>
                )}
              </p>
            </div>
          ))}

          <AddSlotIngredient />
        </div>
      </div>
    </>
  );
};

export default SlotBlendIngredients;
