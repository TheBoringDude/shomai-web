import { ICollection } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import useSWR from 'swr';
import getBlendTypes from '../../../lib/blendtypes';
import { fetcher } from '../../../lib/fetcher';
import { AtomicRequest } from '../../../typings/atomicrequest';
import { useBlending } from './blending-provider';

const GetCollection = () => {
  const { collection, blend, id } = useBlending();

  const { data } = useSWR<AtomicRequest<ICollection>>(
    collection
      ? `${process.env.NEXT_PUBLIC_ATOMICASSETS_API}/atomicassets/v1/collections/${collection}`
      : null,
    fetcher
  );

  if (!data) {
    return <></>;
  }

  return (
    <div className="flex items-center justify-between">
      <div className="inline-flex items-center">
        <Image
          src={`https://ipfs.io/ipfs/${data.data.img}`}
          alt={data.data.name}
          height="100"
          width="100"
          objectFit="contain"
          className="rounded-lg"
        />
        <div className="ml-3 flex flex-col">
          <h3 className="text-4xl font-black text-atomic-tangerine">{data.data.collection_name}</h3>
          <p className="text-xl mt-2 font-bold text-gray-300">{data.data.name}</p>
        </div>
      </div>

      {blend && (
        <div className="inline-flex flex-col items-center">
          <h5 className="text-lg font-bold text-gray-300">{getBlendTypes(blend)}</h5>
          <strong className="text-2xl font-black text-deep-champagne">#{id}</strong>
        </div>
      )}
    </div>
  );
};

export default GetCollection;
