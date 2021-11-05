import { Dialog } from '@headlessui/react';
import Dialogs from './Dialogs';
import { useSlotTargetPicker } from './slottarget/provider';
import SlotTargetTemplates from './slottarget/showtemplates';

type SlotGeneratorProps = {
  open: boolean;
  onClose: () => void;
};
const SlotTargetPicker = ({ open, onClose }: SlotGeneratorProps) => {
  const { defCollection, state, pick } = useSlotTargetPicker();

  return (
    <Dialogs
      open={open}
      onClose={onClose}
      className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gunmetal shadow-xl rounded-2xl"
    >
      <Dialog.Title as="h4" className="font-black text-white text-2xl">
        <span className="text-atomic-tangerine">{defCollection}</span> | Slot Target Picker
      </Dialog.Title>
      <Dialog.Description className="text-white mt-1">
        Select template target from your collection
        <br />
        <i>(multi-select is supported)</i>
      </Dialog.Description>

      <div className="mt-6">
        <p className="text-right text-sm text-white">Selected: {state.length}</p>

        <SlotTargetTemplates />

        <div className="flex items-center justify-center mt-8">
          <button
            type="button"
            onClick={() => {
              pick(state);
            }}
            className="py-3 px-12 mx-1 rounded-lg bg-deep-champagne hover:bg-atomic-tangerine text-sm"
          >
            Add Slot
          </button>

          <button
            className="py-3 px-12 mx-1 rounded-lg bg-charcoal text-gray-300 text-sm"
            type="reset"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Dialogs>
  );
};

export default SlotTargetPicker;
