import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { CheckCircleIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { GET_AUTHORIZED_COLLECTIONS_API } from '../../lib/account/getauthcol';
import { fetcher } from '../../lib/fetcher';
import { dapp } from '../../lib/waxnet';
import { AuthorizedCollectionsProps } from '../../typings/acount/authcol';

const ShowCollections = () => {
  const { user } = useWaxUser();
  const { data } = useSWR<AuthorizedCollectionsProps>(
    GET_AUTHORIZED_COLLECTIONS_API(user?.wallet ?? ''),
    fetcher
  );

  if (!data) {
    return (
      <div className="py-32 text-center">
        <p className="text-white">Loading authorized collections...</p>
      </div>
    );
  }

  return (
    <div className="py-32">
      <div className="w-5/6 mx-auto">
        <h3 className="text-3xl font-black text-white">Your Collections</h3>

        <div className="w-5/6 mx-auto items-center justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {data.data.map((col, index) => (
            <Link href={`/d/${col.collection_name}`} key={index}>
              <a className="flex flex-col text-center relative">
                {col.authorized_accounts.includes(dapp) && (
                  <span
                    className="absolute -top-2 -right-2 text-atomic-tangerine z-20"
                    title="dApp is Authorized in this collection"
                  >
                    <CheckCircleIcon className="h-8 w-8" />
                  </span>
                )}
                <Image
                  src={`https://ipfs.io/ipfs/${col.img}`}
                  alt={col.name}
                  height="300"
                  width="300"
                  objectFit="cover"
                  className="rounded-t-md z-10"
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
