import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import ListBox from '../assetpicker/Listbox';
import { useSlotGenerator } from './provider';

type SlotTypesProps = {
  [key: number]: string;
};
const SlotTypes: SlotTypesProps = {
  0: 'Schema Slot',
  1: 'Template Slot',
  2: 'Attribute Slot'
};

const SlotSelectType = () => {
  const {
    state: { type },
    dispatch
  } = useSlotGenerator();

  return (
    <ListBox
      selected={type}
      showtext={type != null ? SlotTypes[type] : undefined}
      setSelected={(v: typeof type) => {
        if (v == null) return;

        dispatch({ type: 'set', key: 'type', value: v });
      }}
      label="Slot Type"
    >
      {Object.entries(SlotTypes).map(([key, value], index) => (
        <Listbox.Option
          key={index}
          className={({ active }) =>
            `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                              cursor-default select-none relative py-2 pl-10 pr-4`
          }
          value={Number(key)}
        >
          {({ selected, active }) => (
            <>
              <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                {value}
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

export default SlotSelectType;
