import { Dialog } from '@headlessui/react';
import AssetForm from './assetpicker/assetform';
import { useAssetPicker } from './assetpicker/provider';
import Dialogs from './Dialogs';

type AssetPickerProps = {
  open: boolean;
  onClose: () => void;
};
const AssetPicker = ({ open, onClose }: AssetPickerProps) => {
  const { defCollection } = useAssetPicker();

  return (
    <Dialogs
      open={open}
      onClose={onClose}
      className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gunmetal shadow-xl rounded-2xl"
    >
      <Dialog.Title as="h4" className="font-black text-white text-2xl">
        <span className="text-atomic-tangerine">{defCollection}</span> | Asset Picker
      </Dialog.Title>
      <Dialog.Description className="text-white mt-1">
        Select an asset from the collection.
      </Dialog.Description>

      <div className="mt-6">
        <AssetForm onClose={onClose} />
      </div>
    </Dialogs>
  );
};

export default AssetPicker;
