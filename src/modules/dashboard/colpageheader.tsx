import Image from 'next/image';
import Link from 'next/link';
import EmptyComponent from '../../components/empty-component';
import { useCollection } from '../../lib/collections/colprovider';

type ColPageHeaderProps = {
  title: string;
};

const ColPageHeader = ({ title }: ColPageHeaderProps) => {
  const { collection, coldata: data } = useCollection();

  if (!data) return <EmptyComponent />;

  return (
    <div className="flex items-center justify-between">
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
            <a className="text-4xl font-black text-atomic-tangerine hover:underline">
              <h3 className="">{data.collection_name}</h3>
            </a>
          </Link>
          <p className="text-xl mt-2 font-bold text-gray-300">{data.name}</p>
        </div>
      </div>

      <h5 className="text-3xl font-black text-gray-200 tracking-wide">{title}</h5>
    </div>
  );
};

export default ColPageHeader;
