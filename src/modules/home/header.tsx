import Link from 'next/link';
import HomeLogin from './homelogin';

const Header = () => {
  return (
    <header className="py-6">
      <nav className="flex items-center justify-between w-5/6 mx-auto">
        <div className="">
          <h1 className="font-black tracking-wide text-2xl text-atomic-tangerine">shomai</h1>
        </div>

        <ul className="text-white flex items-center text-sm">
          <li className="ml-20">
            <Link href="/">
              <a className="tracking-wide hover:text-atomic-tangerine">Home</a>
            </Link>
          </li>
          <li className="ml-20">
            <HomeLogin />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
