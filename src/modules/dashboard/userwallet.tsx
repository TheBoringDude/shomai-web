import { Menu, Transition } from '@headlessui/react';
import { ArrowRightIcon, ChartSquareBarIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
import { Fragment, useEffect, useState } from 'react';
import { GET_WALLET_BALANCE } from '../../lib/account/getwallet';
import { postFetcher } from '../../lib/fetcher';
import AuthLogin from '../auth/login';
import { useAuth } from '../auth/provider';

const UserWallet = () => {
  const router = useRouter();

  const { user, logout, isLoggedIn } = useAuth();
  const [data, setData] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const f = async () => {
      if (!user) return;

      const x: string[] = await postFetcher(GET_WALLET_BALANCE(), {
        account: user.wallet,
        code: 'eosio.token',
        symbol: 'WAX'
      });

      const z = x[0];
      const bal = z?.split(' ');

      if (z && bal) {
        setData(String(Number(bal[0]).toFixed(2)) + ' ' + bal[1]);
      }
    };

    f();
  });

  return (
    <>
      <AuthLogin open={open} onClose={() => setOpen(false)} />

      {isLoggedIn ? (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex items-center justify-center text-white bg-black w-full px-6 py-2 font-medium rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              {user ? (
                <>
                  <div className="inline-flex flex-col">
                    <strong className="text-atomic-tangerine text-sm">{user?.wallet}</strong>

                    <span className="text-xs text-sage font-bold tracking-tight">( {data} )</span>
                  </div>
                  <ChevronDownIcon
                    className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                    aria-hidden="true"
                  />
                </>
              ) : (
                <strong className="text-xs text-gray-200 uppercase tracking-wide">Login</strong>
              )}
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
            <Menu.Items className="absolute z-20 right-0 w-56 mt-2 origin-top-right bg-deep-champagne divide-y rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1 px-4">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => router.push('/dashboard')}
                      className={`${
                        active ? 'bg-deep-champagne' : ''
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm my-1`}
                    >
                      {active ? (
                        <ChartSquareBarIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                      ) : (
                        <ChartSquareBarIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                      )}
                      My Collections
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => logout()}
                      className={`${
                        active ? 'bg-deep-champagne' : ''
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
      ) : (
        <button
          onClick={() => setOpen(true)}
          type="button"
          title="Login Wallet"
          className="py-2 px-6 rounded-md bg-deep-champagne bg-opacity-80 hover:bg-opacity-100 duration-300 uppercase tracking-wide text-xs"
        >
          Login
        </button>
      )}
    </>
  );
};

export default UserWallet;
