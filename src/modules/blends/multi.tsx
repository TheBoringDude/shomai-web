import { PlusCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import DashLayout from '../../layouts/Dash';
import { useCollection } from '../../lib/dash/colprovider';
import BlendContainer from './_container';

const MultiBlend = () => {
  const { collection } = useCollection();

  return (
    <DashLayout title="Multi Blend">
      <BlendContainer
        title="Multi Blend"
        info="Cross-collection NFT blending to craft another better nft."
      >
        <div className="w-11/12 mx-auto">
          {/* add ingredients */}
          <div>
            <h4 className="font-black text-2xl text-gray-100">Ingredients</h4>
            <div className="mt-6">
              <button
                type="button"
                className="border-2 border-sage rounded-xl h-64 w-52 flex items-center justify-center"
              >
                <p className="text-center text-sage inline-flex flex-col items-center">
                  <PlusCircleIcon className="h-10 w-10" />
                  <span className="text-xl font-black">Add Ingredient</span>
                </p>
              </button>
            </div>
          </div>

          <hr className="my-6 border-gray-500" />

          {/* add target */}
          <div>
            <h4 className="font-black text-2xl text-gray-100">Target</h4>
            <div className="mt-6">
              <button
                type="button"
                className="border-2 border-sage rounded-xl h-64 w-52 flex items-center justify-center"
              >
                <p className="text-center text-sage inline-flex flex-col items-center">
                  <PlusCircleIcon className="h-10 w-10" />
                  <span className="text-xl font-black">Select Target</span>
                </p>
              </button>
            </div>
          </div>

          <hr className="my-6 border-gray-500 w-4/5 mx-auto" />

          <div className="mt-12 text-center flex items-center justify-center">
            <button className="bg-deep-champagne hover:bg-atomic-tangerine duration-300 py-3 px-8 rounded-lg mx-1">
              Create Blend
            </button>
            <Link href={`/dashboard/${collection}`}>
              <a className="bg-charcoal text-gray-100 py-3 px-8 rounded-lg mx-1">Cancel</a>
            </Link>
          </div>
        </div>
      </BlendContainer>
    </DashLayout>
  );
};

export default MultiBlend;
