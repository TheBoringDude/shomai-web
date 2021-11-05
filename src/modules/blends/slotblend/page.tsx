import DashLayout from '../../../layouts/Dash';
import BlendContainer from '../_container';
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
            <SlotBlendIngredients />

            <hr className="my-6 border-gray-500" />

            <SlotBlendTargets />
          </div>
        </BlendContainer>
      </SlotBlendProvider>
    </DashLayout>
  );
};

export default SlotBlend;
