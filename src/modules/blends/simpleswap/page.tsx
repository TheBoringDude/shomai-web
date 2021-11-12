import { SwitchHorizontalIcon } from '@heroicons/react/solid';
import DashLayout from '../../../layouts/Dash';
import BlendContainer from '../_container';
import SimpleSwapIngredient from './add-ingredient';
import SimpleSwapTarget from './add-target';
import CallAction from './call-action';
import SimpleSwapProvider from './provider';

const SimpleSwap = () => {
  return (
    <DashLayout title="Simple Swap">
      <SimpleSwapProvider>
        <BlendContainer title="Simple Swap" info="Swap a NFT asset to a different one.">
          <div className="w-11/12 mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center">
              <SimpleSwapIngredient />

              <span className="text-sage my-10 md:my-0">
                <SwitchHorizontalIcon className="h-10 w-10 mx-10" />
              </span>

              <SimpleSwapTarget />
            </div>

            <hr className="my-6 border-gray-500 w-4/5 mx-auto" />

            <CallAction />
          </div>
        </BlendContainer>
      </SimpleSwapProvider>
    </DashLayout>
  );
};

export default SimpleSwap;
