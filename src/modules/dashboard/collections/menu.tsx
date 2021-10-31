import { Tab } from '@headlessui/react';
import { ChartBarIcon, CogIcon, DuplicateIcon } from '@heroicons/react/solid';

const ColMenu = () => {
  return (
    <Tab.List className="flex items-center text-sm text-white">
      <Tab
        className={({ selected }) =>
          `flex items-center hover:bg-gunmetal hover:text-deep-champagne rounded-md py-2 px-6 duration-200 ${
            selected ? 'bg-gunmetal text-deep-champagne' : ''
          }`
        }
      >
        <ChartBarIcon className="h-4 w-4" />
        <span className="ml-1">Statistics</span>
      </Tab>

      <Tab
        className={({ selected }) =>
          `flex items-center hover:bg-gunmetal hover:text-deep-champagne rounded-md py-2 px-6 duration-200 ${
            selected ? 'bg-gunmetal text-deep-champagne' : ''
          }`
        }
      >
        <DuplicateIcon className="h-4 w-4" />
        <span className="ml-1">Blends</span>
      </Tab>

      <Tab
        className={({ selected }) =>
          `flex items-center hover:bg-gunmetal hover:text-deep-champagne rounded-md py-2 px-6 duration-200 ${
            selected ? 'bg-gunmetal text-deep-champagne' : ''
          }`
        }
      >
        <CogIcon className="h-4 w-4" />
        <span className="ml-1">Settings</span>
      </Tab>
    </Tab.List>
  );
};

export default ColMenu;
