import Image from 'next/image';
import EmptyComponent from '../../../components/empty-component';
import { useCollection } from '../../../lib/collections/colprovider';
import ColMenu from './menu';

const ColHeader = () => {
  const { coldata: data } = useCollection();

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
          <h3 className="text-4xl font-black text-atomic-tangerine">{data.collection_name}</h3>
          <p className="text-xl mt-2 font-bold text-gray-300">{data.name}</p>
        </div>
      </div>

      <ColMenu />
    </div>
  );
};

export default ColHeader;
