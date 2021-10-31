import BlendingPage from '../blendingpage';
import SimpleBlenderIngredients from './ingredients';
import SimpleBlendingProvider from './provider';

const SimpleBlending = () => {
  return (
    <BlendingPage>
      <SimpleBlendingProvider>
        <hr className="border-charcoal my-12" />
        <div>
          <SimpleBlenderIngredients />
        </div>
      </SimpleBlendingProvider>
    </BlendingPage>
  );
};

export default SimpleBlending;
