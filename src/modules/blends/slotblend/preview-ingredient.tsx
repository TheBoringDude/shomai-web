import { Dialog, Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Dialogs from '../../../components/Dialogs';
import EmptyComponent from '../../../components/empty-component';
import { SlotIngredients } from '../../../typings/blends/ingredients';

type PreviewSlotIngredientProps = {
  slot: SlotIngredients;
};
const PreviewSlotIngredient = ({ slot }: PreviewSlotIngredientProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialogs
        open={open}
        onClose={() => setOpen(false)}
        className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gunmetal shadow-xl rounded-2xl"
      >
        <Dialog.Title as="h4" className="font-black text-white text-2xl">
          <span className="text-atomic-tangerine">Slot Preview</span>
        </Dialog.Title>

        <div className="w-11/12 mx-auto p-6 bg-deep-champagne rounded-2xl mt-6">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-bold text-left bg-sage text-coolGray-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                  <span>Collection</span>
                  <ChevronUpIcon
                    className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-deep-champagne`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 font-black text-gray-500">
                  {slot.collection}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {slot.type === 0 ? (
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-bold text-left bg-sage text-coolGray-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                    <span>Schema</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-deep-champagne`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 font-black text-gray-500">
                    {slot.props.schema}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ) : slot.type === 1 ? (
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-bold text-left bg-sage text-coolGray-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                    <span>Templates</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-deep-champagne`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-2 font-black text-gray-500">
                    <div className="mx-auto w-11/12">
                      {slot.props.templates.map((t, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between w-full py-1 px-3 text-sm  my-1 bg-sage rounded-full"
                        >
                          <strong className="text-gunmetal">#{t}</strong>
                        </div>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ) : slot.type === 2 ? (
            <>
              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-bold text-left bg-sage text-coolGray-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                      <span>Schema</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-deep-champagne`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 font-black text-gray-500">
                      {slot.props.schema}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-bold text-left bg-sage text-coolGray-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                      <span>Attributes</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-deep-champagne`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pb-2 font-black text-gray-500">
                      <div className="mx-auto w-11/12">
                        {slot.props.attributes.map((i, index) => (
                          <Disclosure key={index} as="div" className="mt-2">
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-bold text-left bg-sage text-coolGray-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                                  <span>{i.key}</span>
                                  <ChevronUpIcon
                                    className={`${
                                      open ? 'transform rotate-180' : ''
                                    } w-5 h-5 text-deep-champagne`}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 font-black text-gray-500">
                                  {i.allowed_values.join()}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </>
          ) : (
            <EmptyComponent />
          )}

          {/* 
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-bold text-left bg-sage text-coolGray-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                  <span>Schema Only?</span>
                  <ChevronUpIcon
                    className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-deep-champagne`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 font-black text-gray-500">
                  {JSON.stringify(slot.schema_only)}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {!slot.schema_only && (
            <>
              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-bold text-left bg-sage text-coolGray-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                      <span>From</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-deep-champagne`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 font-black text-gray-500">
                      {slot.from === 0
                        ? `templates`
                        : slot.from === 1
                        ? `immutable_data`
                        : 'unknown'}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-bold text-left bg-sage text-coolGray-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                      <span>Attributes</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-deep-champagne`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pb-2 font-black text-gray-500">
                      <div className="mx-auto w-11/12">
                        {slot.attributes.map((i, index) => (
                          <Disclosure key={index} as="div" className="mt-2">
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-bold text-left bg-sage text-coolGray-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                                  <span>{i.attrib}</span>
                                  <ChevronUpIcon
                                    className={`${
                                      open ? 'transform rotate-180' : ''
                                    } w-5 h-5 text-deep-champagne`}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 font-black text-gray-500">
                                  {i.values.join()}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </>
          )} */}
        </div>
      </Dialogs>

      <button
        onClick={() => setOpen(true)}
        type="button"
        title="Preview Slot Ingredient"
        className="absolute z-10 hidden group-hover:block text-xs bottom-1 left-1 bg-sage text-gunmetal hover:bg-deep-champagne py-1 px-2 rounded-lg"
      >
        preview
      </button>
    </>
  );
};

export default PreviewSlotIngredient;
