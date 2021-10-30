import { Menu, Transition } from '@headlessui/react';
import { ArrowRightIcon, ChartSquareBarIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
import { Fragment, useState } from 'react';
import { SimpleModal } from 'unstyled-lightbox';
import { useHasMounted } from '../../hooks/useHasMounted';
import { loginWithAnchor } from './anchor';
import { loginWithCloudWallet } from './cloudwallet';
import { useAuth } from './provider';

const HomeLogin = () => {
  const router = useRouter();
  const mounted = useHasMounted;
  const [open, setOpen] = useState(false);
  const { login, isLoggedIn, user, logout } = useAuth();

  if (!mounted) return;

  return (
    <>
      <SimpleModal
        open={open}
        onClose={() => setOpen(false)}
        className="fixed w-full h-full bg-black/60 z-50 inset-0 flex items-center justify-center"
        overlayClassname="absolute h-full w-full z-30"
      >
        <div className="z-50 bg-gray-100 w-full max-w-lg rounded-xl p-8 text-center">
          <h4 className="font-black text-2xl text-gunmetal">Authenticate your Wax Wallet</h4>

          <div className="mt-6 flex flex-col">
            {!(process.env.NEXT_PUBLIC_ISTESTNET === 'true') && (
              <button
                onClick={async () => {
                  const d = await loginWithCloudWallet();

                  login(d);
                  setOpen(false);
                }}
                className="my-1 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-md px-4 text-lg font-light tracking-wide"
                type="button"
              >
                Login with Wax Cloud Wallet
              </button>
            )}

            <button
              onClick={async () => {
                const d = await loginWithAnchor();

                login(d);
                setOpen(false);
              }}
              className="my-1 bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-md px-4 text-lg font-light tracking-wide"
              type="button"
            >
              Login with Anchor
            </button>
          </div>
        </div>
      </SimpleModal>

      {!isLoggedIn ? (
        <button
          onClick={() => setOpen(true)}
          className="tracking-wide hover:text-atomic-tangerine"
          type="button"
        >
          Wallet Login
        </button>
      ) : (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              {user?.wallet}
              <ChevronDownIcon
                className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
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
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-gunmetal divide-y rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-2 px-3">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => router.push('/dashboard')}
                      className={`${
                        active ? 'bg-deep-champagne text-gunmetal' : 'text-white'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm my-1`}
                    >
                      {active ? (
                        <ChartSquareBarIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                      ) : (
                        <ChartSquareBarIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                      )}
                      Dashboard
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => logout()}
                      className={`${
                        active ? 'bg-deep-champagne text-gunmetal' : 'text-white'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm my-1`}
                    >
                      {active ? (
                        <ArrowRightIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                      ) : (
                        <ArrowRightIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                      )}
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </>
  );
};

export default HomeLogin;
