import Image from 'next/image';
import Link from 'next/link';
import EmptyComponent from '../../components/empty-component';
import { useCollection } from '../../lib/collections/colprovider';

type ColPageHeaderProps = {
  title: string;
  description?: string;
};

const ColPageHeader = ({ title, description }: ColPageHeaderProps) => {
  const { collection, coldata: data } = useCollection();

  if (!data) return <EmptyComponent />;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
      <div className="inline-flex items-center">
        <Image
          src={`https://ipfs.io/ipfs/${data.img}`}
          alt={data.name}
          height="80"
          width="80"
          objectFit="contain"
          className="rounded-lg"
        />
        <div className="ml-3 flex flex-col">
          <Link href={`/d/${collection}`}>
            <a className="font-black text-atomic-tangerine hover:underline">
              <h3 className="text-3xl sm:text-4xl ">{data.collection_name}</h3>
            </a>
          </Link>
          <p className="text-xl mt-2 font-bold text-neutral-300">{data.name}</p>
        </div>
      </div>

      <div className="text-right mt-4 md:mt-0 w-full md:w-2/5 ml-auto">
        <h5 className="text-3xl font-black text-neutral-200 tracking-wide">{title}</h5>
        <p className="text-neutral-400 tracking-wide mt-1 truncate">{description}</p>
      </div>
    </div>
  );
};

export default ColPageHeader;
