import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { ICollection } from 'atomicassets/build/API/Explorer/Objects';
import { useEffect, useState } from 'react';
import { GET_AUTHORIZED_COLLECTIONS_API } from '../../lib/account/getauthcol';
import useCallAPI from '../../lib/hooks/useCallAPI';
import ListBox from './Listbox';
import { useAssetPicker } from './provider';

const CollectionPicker = () => {
  const { user } = useWaxUser();
  const { collection, defCollection, lockCollection, setCollection } = useAssetPicker();
  const [selected, setSelected] = useState<ICollection | undefined>(undefined);
  const data = useCallAPI<ICollection[]>(GET_AUTHORIZED_COLLECTIONS_API(user?.wallet ?? ''));

  useEffect(() => {
    if (data) {
      const fcol = data.filter((d) => d.collection_name === defCollection)[0];

      if (selected?.collection_name === fcol.collection_name) return;

      setSelected(fcol);
    }
  }, [data, selected?.collection_name, defCollection]);

  useEffect(() => {
    if (collection !== selected?.collection_name) {
      setCollection(selected?.collection_name ?? '');
    }
  }, [collection, selected, setCollection]);

  return (
    <ListBox
      selected={selected}
      showtext={selected?.collection_name ?? collection ?? 'Select a collection...'}
      setSelected={setSelected}
      label="Collection"
    >
      {!lockCollection &&
        (data ? (
          data.map((col, index) => (
            <Listbox.Option
              key={index}
              className={({ active }) =>
                `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                              cursor-default select-none relative py-2 pl-10 pr-4`
              }
              value={col}
            >
              {({ selected, active }) => (
                <>
                  <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                    {col.collection_name}
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
        ))}
    </ListBox>
  );
};

export default CollectionPicker;
