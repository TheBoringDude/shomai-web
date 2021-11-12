import Image from 'next/image';
import getBlendTypes from '../../../lib/blendtypes';
import { useCollection } from '../../../lib/collections/colprovider';
import { useBlending } from './blending-provider';

const GetCollection = () => {
  const { coldata: data } = useCollection();
  const { blend, id } = useBlending();

  if (!data) {
    return <></>;
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between">
      <div className="inline-flex items-center">
        <Image
          src={`https://ipfs.io/ipfs/${data.img}`}
          alt={data.name}
          height="100"
          width="100"
          objectFit="contain"
          className="rounded-lg"
        />
        <div className="ml-3 flex flex-col">
          <h3 className="text-4xl font-black text-atomic-tangerine">{data.collection_name}</h3>
          <p className="text-xl mt-2 font-bold text-gray-300">{data.name}</p>
        </div>
      </div>

      {blend && (
        <div className="mt-4 md:mt-0 inline-flex flex-col items-end md:items-center">
          <h5 className="text-lg font-bold text-gray-300">{getBlendTypes(blend)}</h5>
          <strong className="text-2xl font-black text-deep-champagne">#{id}</strong>
        </div>
      )}
    </div>
  );
};

export default GetCollection;
