import { Dialog } from '@headlessui/react';
import { useAssetSetter } from './assetsetter/provider';
import ShowAsset from './assetsetter/showassets';
import Dialogs from './Dialogs';

type AssetSetterProps = {
  open: boolean;
  onClose: () => void;
};
const AssetSetter = ({ open, onClose }: AssetSetterProps) => {
  const { defCollection } = useAssetSetter();

  return (
    <Dialogs
      open={open}
      onClose={onClose}
      className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gunmetal shadow-xl rounded-2xl"
    >
      <Dialog.Title as="h4" className="font-black text-white text-2xl">
        <span className="text-atomic-tangerine">{defCollection}</span> | Asset Setter
      </Dialog.Title>
      <Dialog.Description className="text-white mt-1">
        Select an asset from the collection.
      </Dialog.Description>

      <div className="mt-6">
        <ShowAsset onClose={onClose} />
      </div>
    </Dialogs>
  );
};

export default AssetSetter;
