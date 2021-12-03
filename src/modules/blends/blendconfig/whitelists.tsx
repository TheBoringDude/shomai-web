import { Switch } from '@headlessui/react';
import { useState } from 'react';

const BlendConfigWhitelists = () => {
  const [enable, setEnable] = useState(false);

  return (
    <div>
      <h4 className="text-lg uppercase underline text-sage font-bold">Whitelists</h4>

      <div className="w-11/12 mt-4 mx-auto">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <p className="text-gray-200">List of names for whitelist</p>
            <Switch
              checked={enable}
              onChange={setEnable}
              className={`${
                enable ? 'bg-deep-champagne' : 'bg-gray-200'
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span className="sr-only">Enable end date</span>
              <span
                className={`${
                  enable ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
          </div>

          <textarea className="w-full py-2 px-4 rounded-lg h-56 text-sm"></textarea>
        </div>
      </div>

      <div className="text-right mt-2">
        <button
          type="button"
          className="py-2 px-6 rounded-lg bg-sage hover:bg-deep-champagne text-sm text-gunmetal"
        >
          Update Whitelists
        </button>
      </div>
    </div>
  );
};

export default BlendConfigWhitelists;
