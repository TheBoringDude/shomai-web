import { Dialog } from '@headlessui/react';
import Dialogs from './Dialogs';
import SlotForm from './slotgenerator/generatorform';
import { useSlotGenerator } from './slotgenerator/provider';

type SlotGeneratorProps = {
  open: boolean;
  onClose: () => void;
};
const SlotGenerator = ({ open, onClose }: SlotGeneratorProps) => {
  const { defCollection } = useSlotGenerator();

  return (
    <Dialogs
      open={open}
      onClose={onClose}
      className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gunmetal shadow-xl rounded-2xl"
    >
      <Dialog.Title as="h4" className="font-black text-white text-2xl">
        <span className="text-atomic-tangerine">{defCollection}</span> | Slot Generator
      </Dialog.Title>
      <Dialog.Description className="text-white mt-1">
        Select an asset from the collection.
      </Dialog.Description>

      <div className="mt-6">
        <SlotForm onClose={onClose} />
      </div>
    </Dialogs>
  );
};

export default SlotGenerator;
