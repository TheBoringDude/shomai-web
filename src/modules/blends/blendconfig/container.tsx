import BlendConfigDates from './dates';
import BlendConfigMaxUses from './maxuse';
import { useBlendConfig } from './provider';
import BlendConfigWhitelists from './whitelists';

const BlendConfigModalContainer = () => {
  const { blenderid } = useBlendConfig();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-deep-champagne text-3xl font-black">Edit Blend Config</h3>

        <div>
          <p className="text-white font-black text-lg">#{blenderid}</p>
        </div>
      </div>

      <div className="mt-8 mx-4">
        <BlendConfigMaxUses />

        <hr className="border-charcoal my-4" />

        <BlendConfigDates />

        <hr className="border-charcoal my-4" />

        <BlendConfigWhitelists />
      </div>
    </div>
  );
};

export default BlendConfigModalContainer;
