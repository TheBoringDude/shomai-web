import BlendingPage from '../blendingpage';
import SimpleBlenderIngredients from './ingredients';
import SimpleBlendingProvider from './provider';

const SimpleBlending = () => {
  return (
    <BlendingPage>
      <SimpleBlendingProvider>
        <div>
          <SimpleBlenderIngredients />
        </div>
      </SimpleBlendingProvider>
    </BlendingPage>
  );
};

export default SimpleBlending;
