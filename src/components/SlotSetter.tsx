import { Dialog } from '@headlessui/react';
import Dialogs from './Dialogs';
import SlotSetterAttribs from './slotsetter/attribs';
import { useSlotAssetSetter } from './slotsetter/provider';

type SlotSetterProps = {
  open: boolean;
  onClose: () => void;
};
const SlotSetter = ({ open, onClose }: SlotSetterProps) => {
  const { config } = useSlotAssetSetter();

  return (
    <Dialogs
      open={open}
      onClose={onClose}
      className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gunmetal shadow-xl rounded-2xl"
    >
      <Dialog.Title as="h4" className="font-black text-white text-2xl">
        <span className="text-atomic-tangerine">{config.collection}</span> | Slot Target Setter
      </Dialog.Title>
      <Dialog.Description className="text-white mt-1">Set Asset for slot</Dialog.Description>

      <div className="mt-6">
        <SlotSetterAttribs onClose={onClose} />
      </div>
    </Dialogs>
  );
};

export default SlotSetter;
