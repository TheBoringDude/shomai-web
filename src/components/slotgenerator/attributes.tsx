import { Disclosure, Switch } from '@headlessui/react';
import { ChevronUpIcon, XIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import ImmutableDataAttributesSlot from './attrib-data';
import ImmutableTemplateAttributesSlot from './attrib-templates';
import { useSlotGenerator } from './provider';

const AttributesSlot = () => {
  const [state, setState] = useState('');

  const {
    state: { attributes, anyof, from },
    dispatch
  } = useSlotGenerator();

  useEffect(() => {
    if (from !== state) {
      // reset the attributes if `from` is changed
      dispatch({ type: 'set', key: 'attributes', value: [] });

      setState(from);
    }
  }, [dispatch, from, state]);

  return (
    <>
      <div className="flex justify-between items-center">
        <label htmlFor="attributes" className="text-white">
          Attributes
        </label>

        <div className="inline-flex items-center">
          {from === 'temp' ? (
            <ImmutableTemplateAttributesSlot />
          ) : from === 'data' ? (
            <ImmutableDataAttributesSlot />
          ) : (
            <></>
          )}

          <Switch
            checked={anyof}
            title="Allow any of the attributes to match the slot"
            onChange={() => dispatch({ type: 'set', key: 'anyof', value: !anyof })}
            className={`${
              anyof ? 'bg-deep-champagne' : 'bg-gray-200'
            } relative inline-flex items-center h-5 rounded-full w-11 ml-2`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                anyof ? 'translate-x-6' : 'translate-x-1'
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
                    <span>{a.attrib}</span>
                    <ChevronUpIcon
                      className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <button
                    type="button"
                    className="hover:text-atomic-tangerine"
                    title="Remove Attribute"
                    onClick={() => {
                      dispatch({ type: 'remove-attrib', index });
                    }}
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm ">
                  <strong>Allowed Values:</strong> {a.values.join()}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </>
  );
};

export default AttributesSlot;
