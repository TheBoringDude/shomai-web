import Link from 'next/link';
import { useCollection } from '../../lib/dash/colprovider';
import UserWallet from './userwallet';

const DashHeader = () => {
  const { collection } = useCollection();

  return (
    <header className="bg-gunmetal py-4">
      <nav className="mx-auto w-11/12 flex items-center justify-between">
        <h1 className="font-black text-xl text-deep-champagne">shomai</h1>

        <ul className="text-sm text-gray-100 flex items-center">
          <li className="mx-8">
            <Link href="/d/">
              <a className="hover:text-atomic-tangerine tracking-wide font-bold">Collections</a>
            </Link>
          </li>
          {collection && (
            <>
              <li className="mx-8">
                <Link href={`/d/${collection}/my-nfts`}>
                  <a className="hover:text-atomic-tangerine tracking-wide font-bold">My NFTs</a>
                </Link>
              </li>
              <li className="mx-8">
                <Link href={`/d/${collection}/my-nfts`}>
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
