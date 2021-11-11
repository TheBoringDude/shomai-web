import { Disclosure, Switch } from '@headlessui/react';
import { ChevronUpIcon, XIcon } from '@heroicons/react/solid';
import SlotAttributesSelect from './attributes-select';
import { useSlotGenerator } from './provider';

const SlotAttributes = () => {
  const {
    state: { attributes, require_all_attribs },
    dispatch
  } = useSlotGenerator();

  return (
    <>
      <div className="flex justify-between items-center">
        <label htmlFor="attributes" className="text-white">
          Attributes
        </label>

        <div className="inline-flex items-center">
          <SlotAttributesSelect />

          <Switch
            checked={require_all_attribs}
            title="Allow any of the attributes to match the slot"
            onChange={() =>
              dispatch({ type: 'set', key: 'require_all_attribs', value: !require_all_attribs })
            }
            className={`${
              require_all_attribs ? 'bg-deep-champagne' : 'bg-gray-200'
            } relative inline-flex items-center h-5 rounded-full w-11 ml-2`}
          >
            <span className="sr-only">Require all attributes to match</span>
            <span
              className={`${
                require_all_attribs ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
        </div>
      </div>

      <div className="w-11/12 mx-auto mt-2 bg-deep-champagne p-2 rounded-lg">
        {attributes.map((a, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <div className="flex items-center">
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 my-1 text-sm font-medium text-left rounded-lg bg-sage">
                    <span>{a.key}</span>
                    <ChevronUpIcon
                      className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <button
                    type="button"
                    className="hover:text-atomic-tangerine"
                    title="Remove Attribute"
                    onClick={() => {
                      dispatch({
                        type: 'set',
                        key: 'attributes',
                        value: attributes.filter((_, idx) => idx !== index)
                      });
                    }}
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm ">
                  <strong>Allowed Values:</strong> {a.allowed_values.join()}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </>
  );
};

export default SlotAttributes;
