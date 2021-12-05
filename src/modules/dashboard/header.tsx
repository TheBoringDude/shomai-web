import Link from 'next/link';
import { useCollection } from '../../lib/collections/colprovider';
import UserWallet from './userwallet';

const DashHeader = () => {
  const { collection } = useCollection();

  return (
    <header className="bg-gunmetal py-4">
      <nav className="mx-auto w-11/12 flex items-center justify-between">
        <Link href="/d">
          <a>
            <h1 className="font-black text-2xl text-deep-champagne">shomai</h1>
          </a>
        </Link>

        <ul className="hidden text-sm text-gray-100 md:flex items-center">
          <li className="mx-4 md:mx-8">
            {/* route to collection page if it is under it */}
            <Link href={`/d/${collection ? collection : ''}`}>
              <a className="hover:text-atomic-tangerine tracking-wide font-bold">Collection</a>
            </Link>
          </li>

          {/* show menus only if under a collection */}
          {collection && (
            <>
              <li className="mx-4 md:mx-8">
                <Link href={`/d/${collection}/my-nfts`}>
                  <a className="hover:text-atomic-tangerine tracking-wide font-bold">My NFTs</a>
                </Link>
              </li>
              <li className="mx-4 md:mx-8">
                <Link href={`/d/${collection}/refunds`}>
                  <a className="hover:text-atomic-tangerine tracking-wide font-bold">ReFUND</a>
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="text-center">
          <UserWallet />
        </div>
      </nav>
    </header>
  );
};

export default DashHeader;
