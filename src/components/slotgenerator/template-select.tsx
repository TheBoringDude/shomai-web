import { Dialog, Listbox } from '@headlessui/react';
import { CheckIcon, ViewGridAddIcon } from '@heroicons/react/solid';
import { ITemplate } from 'atomicassets/build/API/Explorer/Objects';
import { useState } from 'react';
import { GET_COLLECTION_TEMPLATES } from '../../lib/account/getauthcol';
import useCallAPI from '../../lib/hooks/useCallAPI';
import Dialogs from '../Dialogs';
import AttribSelectSlot from './attrib-select';
import { useSlotGenerator } from './provider';

const SlotTemplatesSelect = () => {
  const {
    state: { collection, templates },
    dispatch
  } = useSlotGenerator();
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<ITemplate | undefined>(undefined);

  const data = useCallAPI<ITemplate[]>(GET_COLLECTION_TEMPLATES(collection));

  const addTemplate = () => {
    if (!selected) return;

    dispatch({
      type: 'set',
      key: 'templates',
      value: [Number(selected.template_id), ...templates]
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
          Add a Template
        </Dialog.Title>
        <Dialog.Description className="text-white mt-1">Select a template</Dialog.Description>

        <div>
          <div className="flex flex-col my-2">
            <AttribSelectSlot
              selected={selected}
              setSelected={setSelected}
              showtext={
                selected
                  ? `#${selected.template_id} (${selected.immutable_data.name})`
                  : 'Choose template...'
              }
              label="Template"
            >
              <Listbox.Options className="overflow-auto h-24">
                {data ? (
                  data
                    .filter((t) => !templates.includes(Number(t.template_id)))
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
                              #{f.template_id} ({f.immutable_data.name})
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
        </div>

        <div className="flex items-center justify-center mt-8">
          <button
            type="button"
            onClick={addTemplate}
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

export default SlotTemplatesSelect;
