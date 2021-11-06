import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import ListBox from '../assetpicker/Listbox';
import { useSlotGenerator } from './provider';

interface SlotFromProps {
  id: 0 | 1;
  value: string;
}

const froms: SlotFromProps[] = [
  {
    id: 0,
    value: 'templates'
  },
  {
    id: 1,
    value: 'immutable_data'
  }
];

const FromSlot = () => {
  const {
    state: { from },
    dispatch
  } = useSlotGenerator<'from'>();
  const [selected, setSelected] = useState<SlotFromProps>();

  useEffect(() => {
    if (!selected) return;

    if (from !== selected?.id) {
      dispatch({ type: 'set', key: 'from', value: selected.id });
    }
  }, [selected, dispatch, from]);

  return (
    <ListBox selected={selected} showtext={selected?.value} setSelected={setSelected} label="From">
      {froms.map((f, index) => (
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
              <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                {f.value}
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
      ))}
    </ListBox>
  );
};

export default FromSlot;
