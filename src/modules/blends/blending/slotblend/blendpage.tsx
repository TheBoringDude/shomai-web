import BlendingPage from '../blendingpage';
import SlotBlendingContainer from './container';
import SlotBlendingProvider from './provider';

const SlotBlending = () => {
  return (
    <BlendingPage>
      <SlotBlendingProvider>
        <div>
          <SlotBlendingContainer />
        </div>
      </SlotBlendingProvider>
    </BlendingPage>
  );
};

export default SlotBlending;
