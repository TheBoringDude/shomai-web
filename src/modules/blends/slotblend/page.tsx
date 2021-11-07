import DashLayout from '../../../layouts/Dash';
import BlendContainer from '../_container';
import SlotAddTitle from './add-title';
import SlotCallAction from './call-action';
import SlotBlendIngredients from './ingredients';
import SlotBlendProvider from './provider';
import SlotBlendTargets from './targets';

const SlotBlend = () => {
  return (
    <DashLayout title="Slot Blend">
      <SlotBlendProvider>
        <BlendContainer
          title="Slot Blend"
          info="Blend assets with specific slot values and configurations."
        >
          <div className="w-11/12 mx-auto">
            <SlotAddTitle />

            <hr className="my-6 border-gray-500" />

            <SlotBlendIngredients />

            <hr className="my-6 border-gray-500" />

            <SlotBlendTargets />

            <hr className="my-6 border-gray-500 w-4/5 mx-auto" />
            <SlotCallAction />
          </div>
        </BlendContainer>
      </SlotBlendProvider>
    </DashLayout>
  );
};

export default SlotBlend;
