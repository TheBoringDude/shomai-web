import { ITemplate } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';

type AssetRenderImageProps = {
  selected?: ITemplate;
};

const AssetRenderImage = ({ selected }: AssetRenderImageProps) => {
  if (!selected || selected?.template_id === '') {
    return <div className="h-56"></div>;
  }

  return (
    <Image
      src={`https://ipfs.io/ipfs/${selected?.immutable_data.img}`}
      alt=""
      height="200"
      width="200"
      objectFit="contain"
    />
  );
};

export default AssetRenderImage;
