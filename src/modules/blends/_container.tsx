import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useCollection } from '../../lib/dash/colprovider';

type BlendContaineProps = {
  children: ReactNode;
  title: string;
  info?: string;
};
const BlendContainer = ({ children, title, info }: BlendContaineProps) => {
  const { collection } = useCollection();

  return (
    <div className="w-11/12 mx-auto">
      <div className="m-12 bg-gunmetal rounded-xl py-12 px-14 relative">
        <Link href={`/d/${collection}?p=blends`}>
          <a className="inline-flex items-center text-gray-300 hover:text-gray-200 hover:underline text-sm absolute top-4 left-6">
            <ArrowNarrowLeftIcon className="h-4 w-5 mr-1" /> Return to Collection
          </a>
        </Link>

        <div className="mb-6">
          <h3 className="text-white text-3xl font-black">
            Create a new <span className="text-atomic-tangerine">{title}</span>
          </h3>
          <p className="text-gray-200 mt-1 tracking-wide">{info}</p>
        </div>

        <hr className="border-gray-400 my-6" />

        {children}
      </div>
    </div>
  );
};

export default BlendContainer;
