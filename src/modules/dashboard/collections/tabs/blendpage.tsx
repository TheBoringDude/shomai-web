import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, DocumentAddIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { Fragment } from 'react';
import { useCollection } from '../../../../lib/collections/colprovider';
import useAuthorized from '../../../../lib/hooks/useAuthorized';
import ShowBlends from '../../../blends/showblends';

const BlendPage = () => {
  const { collection } = useCollection();
  const authorized = useAuthorized();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-2xl font-black tracking-wide text-white mb-4 underline">Blends</h5>

        {authorized && (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex items-center py-2 px-8 bg-deep-champagne text-sm rounded-md opacity-90 hover:opacity-100">
                <DocumentAddIcon className="h-5 w-5" />
                <span className="ml-1">Create New</span>
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-deep-champagne rounded-lg focus:outline-none">
                <div className="py-3 px-2">
                  <Menu.Item>
                    <Link href={`/d/${collection}/new/simple`}>
                      <a className="hover:bg-sage text-gray-900 group flex rounded-md items-center w-full px-4 py-2 text-sm">
                        Simple Blend
                      </a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href={`/d/${collection}/new/multi`}>
                      <a className="hover:bg-sage text-gray-900 group flex rounded-md items-center w-full px-4 py-2 text-sm">
                        Multi Blend
                      </a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href={`/d/${collection}/new/slot`}>
                      <a className="hover:bg-sage text-gray-900 group flex rounded-md items-center w-full px-4 py-2 text-sm">
                        Slot Blend
                      </a>
                    </Link>
                  </Menu.Item>

                  <hr className="my-1 border-sage" />

                  <Menu.Item>
                    <Link href={`/d/${collection}/new/swap`}>
                      <a className="hover:bg-sage text-gray-900 group flex rounded-md items-center w-full px-4 py-2 text-sm">
                        Swap
                      </a>
                    </Link>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        )}
      </div>

      <div>
        <ShowBlends action="remblsimple" title="Simple Blends" table="simblender" type="sb" />

        <hr className="my-8 border-gunmetal" />

        <ShowBlends action="remswsimple" title="Simple Swaps" table="simswap" type="sw" />
      </div>
    </div>
  );
};

export default BlendPage;
