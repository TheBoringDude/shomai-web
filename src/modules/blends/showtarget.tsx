import { ITemplate } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetcher } from '../../lib/fetcher';
import { AtomicRequest } from '../../typings/atomicrequest';

type ShowTargetProps = {
  collection: string;
  templateid: number;
};

const ShowTarget = ({ collection, templateid }: ShowTargetProps) => {
  const [data, setData] = useState<AtomicRequest<ITemplate> | undefined>(undefined);

  useEffect(() => {
    const f = async () => {
      if (data) return;

      const x: AtomicRequest<ITemplate> = await fetcher(
        `${process.env.NEXT_PUBLIC_ATOMICASSETS_API}/atomicassets/v1/templates/${collection}/${templateid}`
      );

      setData(x);
    };

    f();
  }, [collection, data, templateid]);

  if (!data) {
    return <></>;
  }

  return (
    <div className="relative z-0 text-white text-center mb-4">
      <Image
        src={`https://ipfs.io/ipfs/${data.data.immutable_data.img}`}
        alt={data.data.immutable_data.name}
        height="400"
        width="300"
        objectFit="contain"
      />

      <strong>{data.data.immutable_data.name}</strong>
    </div>
  );
};

export default ShowTarget;
