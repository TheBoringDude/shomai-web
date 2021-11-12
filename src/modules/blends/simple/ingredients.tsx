import { XCircleIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import AddIngredientSimple from './add-ingredient';
import { useSimpleBlend } from './provider';

const SimpleBlendIngredients = () => {
  const { ingredients, dispatchIngredients } = useSimpleBlend();

  return (
    <>
      {/* add ingredients */}
      <div>
        <h4 className="font-black text-2xl text-gray-100">Ingredients</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center mt-6">
          {ingredients.map((i) => (
            <div key={i.template} className="relative bg-charcoal rounded-xl p-2">
              <button
                onClick={() => {
                  dispatchIngredients({ type: 'remove-ingredient', template: i.template });
                }}
                className="absolute z-10 -top-2 -right-2 hover:scale-105 transform text-sage"
              >
                <XCircleIcon className="w-8 h-8" />
              </button>

              <span className="z-10 -bottom-1 -left-2 absolute text-xs rounded-md bg-atomic-tangerine py-2 px-3">
                {i.collection} / #{i.template}
              </span>
              <Image
                src={`https://ipfs.io/ipfs/${i.image}`}
                alt=""
                height="400"
                width="300"
                objectFit="contain"
                className="z-0"
              />
            </div>
          ))}

          <AddIngredientSimple />
        </div>
      </div>
    </>
  );
};

export default SimpleBlendIngredients;
