import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { GET_AUTHORIZED_COLLECTIONS_API } from '../../lib/account/getauthcol';
import fetcher from '../../lib/fetcher';
import { AuthorizedCollectionsProps } from '../../typings/acount/authcol';

const ShowCollections = () => {
  const { data } = useSWR<AuthorizedCollectionsProps>(GET_AUTHORIZED_COLLECTIONS_API, fetcher);

  if (!data) {
    return (
      <div className="py-32 text-center">
        <p>Loading authorized collections...</p>
      </div>
    );
  }

  return (
    <div className="py-32">
      <div className="w-5/6 mx-auto">
        <h3 className="text-3xl font-black text-white">Your Collections</h3>

        <div className="w-11/12 mx-auto items-center justify-center grid grid-cols-3 gap-6 mt-12">
          {data.data.map((col, index) => (
            <Link href={`/dashboard/${col.collection_name}`} key={index}>
              <a className="flex flex-col text-center">
                <Image
                  src={`https://ipfs.io/ipfs/${col.img}`}
                  alt={col.name}
                  height="300"
                  width="300"
                  objectFit="cover"
                  className="rounded-t-md"
                />
                <h3 className="py-4 bg-deep-champagne font-black text-lg tracking-wide text-gunmetal rounded-b-md">
                  {col.collection_name}
                </h3>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowCollections;
