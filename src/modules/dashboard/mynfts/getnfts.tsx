import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { IAsset } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import useSWR from 'swr';
import EmptyComponent from '../../../components/empty-component';
import { GET_USER_ASSETS } from '../../../lib/account/getassets';
import { useCollection } from '../../../lib/collections/colprovider';
import { fetcher } from '../../../lib/fetcher';
import { AtomicRequest } from '../../../typings/atomicrequest';

const GetNFTs = () => {
  const { collection } = useCollection();
  const { user } = useWaxUser();

  const { data } = useSWR<AtomicRequest<IAsset[]>>(
    user && collection ? GET_USER_ASSETS(collection, user.wallet) : null,
    fetcher
  );

  if (!data) return <EmptyComponent />;

  return (
    <div>
      <ul className="grid grid-cols-5 gap-4">
        {data.data.map((i, index) => (
          <li key={index} className="relative bg-charcoal py-1 px-2 rounded-xl">
            <span className="absolute text-sm bg-atomic-tangerine text-gunmetal font-black top-0 right-0 py-1 px-2 rounded-md z-30">
              {i.template_mint} /{' '}
              {i.template?.max_supply == '0' ? <>&infin;</> : i.template?.max_supply}
            </span>

            <Image
              src={`https://ipfs.io/ipfs/${i.data.img}`}
              alt={i.name}
              height="300"
              width="200"
              objectFit="contain"
              className="z-10"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetNFTs;
