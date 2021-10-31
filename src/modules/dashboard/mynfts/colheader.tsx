import { ICollection } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import useSWR from 'swr';
import EmptyComponent from '../../../components/empty-component';
import { useCollection } from '../../../lib/dash/colprovider';
import { fetcher } from '../../../lib/fetcher';
import { AtomicRequest } from '../../../typings/atomicrequest';

const ColHeader = () => {
  const { collection } = useCollection();

  const { data } = useSWR<AtomicRequest<ICollection>>(
    collection
      ? `${process.env.NEXT_PUBLIC_ATOMICASSETS_API}/atomicassets/v1/collections/${collection}`
      : null,
    fetcher
  );

  if (!data) return <EmptyComponent />;

  return (
    <div className="flex items-center justify-between">
      <div className="inline-flex items-center">
        <Image
          src={`https://ipfs.io/ipfs/${data.data.img}`}
          alt={data.data.name}
          height="80"
          width="80"
          objectFit="contain"
          className="rounded-lg"
        />
        <div className="ml-3 flex flex-col">
          <h3 className="text-4xl font-black text-atomic-tangerine">{data.data.collection_name}</h3>
          <p className="text-xl mt-2 font-bold text-gray-300">{data.data.name}</p>
        </div>
      </div>

      <h5 className="text-3xl font-black text-gray-200 tracking-wide">My NFTs</h5>
    </div>
  );
};

export default ColHeader;
