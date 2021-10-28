import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { ITemplate } from 'atomicassets/build/API/Explorer/Objects';
import { useEffect, useState } from 'react';
import { GET_COLLECTION_TEMPLATES } from '../../lib/account/getauthcol';
import useCallAPI from '../../lib/hooks/useCallAPI';
import ListBox from './Listbox';
import { useAssetPicker } from './provider';
import AssetRenderImage from './renderimage';

const TemplatePicker = () => {
  const { collection, schema, template, setTemplate, setImage } = useAssetPicker();

  const [selected, setSelected] = useState<ITemplate | undefined>(undefined);
  const data = useCallAPI<ITemplate[]>(
    collection && schema ? GET_COLLECTION_TEMPLATES(collection, schema) : null
  );

  useEffect(() => {
    if (!selected || selected?.template_id === '') return;
    if (selected.schema.schema_name === schema) return;

    setSelected(undefined);
  }, [schema, selected]);

  useEffect(() => {
    if (template !== selected?.template_id) {
      setTemplate(selected?.template_id);
      setImage(selected?.immutable_data.img);
    }
  }, [collection, selected, schema, setTemplate, template, setImage]);

  return (
    <>
      <ListBox
        selected={selected ?? {}}
        showtext={
          selected?.immutable_data.name
            ? selected.immutable_data.name + ` (#${selected?.template_id})`
            : null
        }
        setSelected={setSelected}
        label="Template ID"
      >
        {data ? (
          data.map((temp, index) => (
            <Listbox.Option
              key={index}
              className={({ active }) =>
                `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                              cursor-default select-none relative py-2 pl-10 pr-4`
              }
              value={temp}
            >
              {({ selected, active }) => (
                <>
                  <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                    {temp.immutable_data.name} (#{temp.template_id})
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
        ) : !collection && !schema ? (
          <p></p>
        ) : (
          <p>loading...</p>
        )}
      </ListBox>

      <div className="flex flex-col mt-4">
        <AssetRenderImage selected={selected} />
      </div>
    </>
  );
};

export default TemplatePicker;
