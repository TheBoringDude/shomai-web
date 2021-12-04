import BlendingPage from '../blendingpage';
import SimpleSwapBlendingContainer from './container';
import SimpleSwapBlendingProvider from './provider';

const SimpleSwapBlending = () => {
  return (
    <BlendingPage>
      <SimpleSwapBlendingProvider>
        <div>
          <SimpleSwapBlendingContainer />
        </div>
      </SimpleSwapBlendingProvider>
    </BlendingPage>
  );
};

export default SimpleSwapBlending;
