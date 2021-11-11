import { Dialog, Listbox } from '@headlessui/react';
import { CheckIcon, ViewGridAddIcon } from '@heroicons/react/solid';
import { ISchema } from 'atomicassets/build/API/Explorer/Objects';
import { SchemaObject } from 'atomicassets/build/Schema';
import { useState } from 'react';
import { GET_COLLECTION_SCHEMA } from '../../lib/account/gets';
import useCallAPI from '../../lib/hooks/useCallAPI';
import Dialogs from '../Dialogs';
import AttribSelectSlot from './attrib-select';
import { useSlotGenerator } from './provider';

const SlotAttributesSelect = () => {
  const {
    state: { collection, schema, attributes },
    dispatch
  } = useSlotGenerator();

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const [selected, setSelected] = useState<SchemaObject | undefined>(undefined);

  const data = useCallAPI<ISchema>(schema ? GET_COLLECTION_SCHEMA(collection, schema) : null);

  const addAttribute = () => {
    if (values.length === 0 || !selected) return;

    dispatch({
      type: 'set',
      key: 'attributes',
      value: [
        {
          key: selected.name,
          allowed_values: values
        },
        ...attributes
      ]
    });

    setOpen(false);
  };

  return (
    <>
      <Dialogs
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        className="inline-block w-full max-w-xl px-8 py-12 my-8 overflow-hidden text-left align-middle transition-all transform bg-gunmetal shadow-xl rounded-2xl"
      >
        <Dialog.Title as="h4" className="font-black text-white text-2xl">
          Add an Attribute
        </Dialog.Title>
        <Dialog.Description className="text-white mt-1">
          Select and set attributes from the schema&apos;s immutable data props{' '}
          <i>(string value-keys are only allowed)</i>
        </Dialog.Description>

        <div className="w-11/12 mx-auto">
          <div className="flex flex-col my-2">
            <AttribSelectSlot
              selected={selected}
              setSelected={setSelected}
              showtext={selected ? selected.name : 'Choose key...'}
              label="Immutable Data Key"
            >
              <Listbox.Options>
                {data ? (
                  data.format
                    .filter((i) => i.type === 'string') // only allow string values for now
                    .map((f, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                              cursor-default select-none relative py-2 pl-10 pr-4`
                        }
                        value={f}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`${
                                selected ? 'font-medium' : 'font-normal'
                              } block truncate`}
                            >
                              {f.name}
                            </span>
                            {selected ? (
                              <span
                                className={`${active ? 'text-amber-600' : 'text-amber-600'}
                                    absolute inset-y-0 left-0 flex items-center pl-3`}
                              >
                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))
                ) : (
                  <p>loading...</p>
                )}
              </Listbox.Options>
            </AttribSelectSlot>
          </div>

          <div className="flex flex-col my-2">
            <label htmlFor="values" className="text-white">
              Allowed Values
            </label>
            <div className="flex items-center overflow-auto py-3 px-5 rounded-lg border-sage bg-deep-champagne font-medium">
              {values.map((i, index) => (
                <span
                  key={index}
                  className="bg-atomic-tangerine py-1 px-2 rounded-full text-sm font-normal mr-1"
                >
                  {i}
                </span>
              ))}
              <input
                type="text"
                name="values"
                className="bg-deep-champagne focus:outline-none placeholder-coolGray-700 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Backspace') {
                    const value = e.currentTarget.value.trim();

                    if (value === '') {
                      setValues(values.filter((_, index) => index !== values.length - 1));
                    }
                  }

                  if (e.key === ',') {
                    e.preventDefault();

                    const value = e.currentTarget.value.trim();

                    if (values.includes(value)) return;

                    setValues([...values, value]);
                    e.currentTarget.value = '';
                  }
                }}
                placeholder="add some allowed values"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-8">
          <button
            onClick={addAttribute}
            className="py-3 px-12 mx-1 rounded-lg bg-deep-champagne hover:bg-atomic-tangerine text-sm"
          >
            Add
          </button>
        </div>
      </Dialogs>

      <button
        onClick={() => setOpen(true)}
        type="button"
        title="Add an attribute"
        className="inline-flex items-center text-xs text-gunmetal bg-sage py-1 px-2 rounded-md hover:bg-deep-champagne"
      >
        <ViewGridAddIcon className="h-4 w-4 mr-1" />
        Add
      </button>
    </>
  );
};

export default SlotAttributesSelect;
