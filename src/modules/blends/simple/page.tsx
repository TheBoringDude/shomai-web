import DashLayout from '../../../layouts/Dash';
import BlendContainer from '../_container';
import SimpleBlendTarget from './add-target';
import CallAction from './call-action';
import SimpleBlendIngredients from './ingredients';
import SimpleBlendProvider from './provider';

const SimpleBlend = () => {
  return (
    <DashLayout title="Simple Blend">
      <SimpleBlendProvider>
        <BlendContainer title="Simple Blend" info="Blend assets from this collection only.">
          <div className="w-11/12 mx-auto">
            <SimpleBlendIngredients />

            <hr className="my-6 border-gray-500" />

            <SimpleBlendTarget />

            <hr className="my-6 border-gray-500 w-4/5 mx-auto" />

            <CallAction />
          </div>
        </BlendContainer>
      </SimpleBlendProvider>
    </DashLayout>
  );
};

export default SimpleBlend;
