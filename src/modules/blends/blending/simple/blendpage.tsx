import BlendingPage from '../blendingpage';
import SimpleBlenderIngredients from './ingredients';
import SimpleBlendingProvider from './provider';

const SimpleBlending = () => {
  return (
    <SimpleBlendingProvider>
      <BlendingPage>
        <hr className="border-charcoal my-12" />
        <div>
          <SimpleBlenderIngredients />
        </div>
      </BlendingPage>
    </SimpleBlendingProvider>
  );
};

export default SimpleBlending;
