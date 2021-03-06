import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { ISchema } from 'atomicassets/build/API/Explorer/Objects';
import { useEffect, useState } from 'react';
import { GET_COLLECTION_SCHEMAS } from '../../lib/account/getauthcol';
import useCallAPI from '../../lib/hooks/useCallAPI';
import ListBox from './Listbox';
import { useAssetPicker } from './provider';

const SchemaPicker = () => {
  const { user } = useWaxUser();
  const { collection, schema, setSchema } = useAssetPicker();
  const [selected, setSelected] = useState<ISchema>();
  const data = useCallAPI<ISchema[]>(collection ? GET_COLLECTION_SCHEMAS(collection) : null);

  useEffect(() => {
    if (!selected || selected?.schema_name === '') return;
    if (selected.collection.collection_name === collection) return;

    setSelected(undefined);
  }, [collection, schema, selected]);

  useEffect(() => {
    if (schema !== selected?.schema_name) {
      setSchema(selected?.schema_name ?? '');
    }
  }, [collection, selected, schema, setSchema]);

  return (
    <ListBox
      selected={selected}
      showtext={selected?.schema_name}
      setSelected={setSelected}
      label="Schema"
    >
      {data ? (
        data.map((sche, index) => (
          <Listbox.Option
            key={index}
            className={({ active }) =>
              `${active ? 'text-amber-900 bg-amber-100' : 'text-neutral-900'}
                              cursor-default select-none relative py-2 pl-10 pr-4`
            }
            value={sche}
          >
            {({ selected, active }) => (
              <>
                <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                  {sche.schema_name}
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
    </ListBox>
  );
};

export default SchemaPicker;
