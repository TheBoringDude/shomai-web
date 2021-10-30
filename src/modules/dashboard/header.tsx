import Link from 'next/link';
import UserWallet from './userwallet';

const DashHeader = () => {
  return (
    <header className="bg-gunmetal py-4">
      <nav className="mx-auto w-11/12 flex items-center justify-between">
        <h1 className="font-black text-xl text-deep-champagne">shomai</h1>

        <ul className="text-sm text-gray-100 flex items-center">
          <li className="mx-8">
            <Link href="/dashboard">
              <a className="hover:text-atomic-tangerine tracking-wide font-bold">Collections</a>
            </Link>
          </li>
          <li className="mx-8">
            <Link href="/dashboard/my-nfts/">
              <a className="hover:text-atomic-tangerine tracking-wide font-bold">My NFTs</a>
            </Link>
          </li>
        </ul>

        <div className="text-center">
          <UserWallet />
        </div>
      </nav>
    </header>
  );
};

export default DashHeader;
