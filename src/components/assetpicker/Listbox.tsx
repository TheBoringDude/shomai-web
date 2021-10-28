import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';
import { Dispatch, Fragment, ReactNode, SetStateAction } from 'react';

type ListBoxProps<T> = {
  selected: T;
  showtext?: string;
  label: string;
  setSelected: Dispatch<SetStateAction<T>>;
  children: ReactNode;
};
const ListBox = <T extends unknown>({
  selected,
  showtext,
  setSelected,
  label,
  children
}: ListBoxProps<T>) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1 w-full">
        <Listbox.Label className=" text-white">{label}</Listbox.Label>

        <Listbox.Button className="z-20 relative w-full py-3 pl-5 mt-1 pr-10 text-left bg-deep-champagne rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <span className="block truncate">{showtext ?? 'Select...'}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="z-30 absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {children}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ListBox;
