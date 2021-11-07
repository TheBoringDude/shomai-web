import { ITemplate } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import { GET_COLLECTION_TEMPLATE } from '../../../../lib/account/getauthcol';
import useCallAPI from '../../../../lib/hooks/useCallAPI';
import { CLAIMASSET } from '../../../../typings/blends/claims';
import { useBlending } from '../blending-provider';

type ShowClaimsAssetProps = {
  claim: CLAIMASSET;
};
const ShowClaimsAsset = ({ claim }: ShowClaimsAssetProps) => {
  const { collection } = useBlending();

  const data = useCallAPI<ITemplate>(GET_COLLECTION_TEMPLATE(collection, claim.templateid));

  return (
    <div className="my-4">
      {data && (
        <Image
          src={`https://ipfs.io/ipfs/${data.immutable_data.img}`}
          alt=""
          height="400"
          width="300"
          objectFit="contain"
        />
      )}
    </div>
  );
};

export default ShowClaimsAsset;
