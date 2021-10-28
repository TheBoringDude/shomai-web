import Link from 'next/link';
import DashLayout from '../../../layouts/Dash';
import { useCollection } from '../../../lib/dash/colprovider';
import BlendContainer from '../_container';
import SimpleBlendTarget from './add-target';
import SimpleBlendIngredients from './ingredients';
import SimpleBlendProvider from './provider';

const SimpleBlend = () => {
  const { collection } = useCollection();

  return (
    <DashLayout title="Simple Blend">
      <SimpleBlendProvider>
        <BlendContainer title="Simple Blend" info="Blend assets from this collection only.">
          <div className="w-11/12 mx-auto">
            <SimpleBlendIngredients />

            <hr className="my-6 border-gray-500" />

            <SimpleBlendTarget />

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
      </SimpleBlendProvider>
    </DashLayout>
  );
};

export default SimpleBlend;
