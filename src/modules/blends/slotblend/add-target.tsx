import { PlusCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import SlotTargetPicker from '../../../components/SlotTarget';
import SlotTargetPickerProvider from '../../../components/slottarget/provider';
import { useCollection } from '../../../lib/collections/colprovider';
import { SlotBlendTargetProps } from '../../../typings/blends/targets';
import { useSlotBlend } from './provider';

const AddSlotTarget = () => {
  const [open, setOpen] = useState(false);
  const { collection } = useCollection();
  const { targets, dispatchTargets } = useSlotBlend();

  const pick = (ts: SlotBlendTargetProps[]) => {
    if (ts.length === 0) return;

    const _targets = ts.filter((i) => {
      const check = targets.filter((k) => k.templateid === i.templateid)[0];

      return check === undefined;
    });

    for (const i of _targets) {
      dispatchTargets({ type: 'add', target: i });
    }

    setOpen(false);
  };

  return (
    <SlotTargetPickerProvider defCollection={collection} pick={pick}>
      <SlotTargetPicker open={open} onClose={() => setOpen(false)} />

      <button
        onClick={() => setOpen(true)}
        type="button"
        className="border-2 border-sage rounded-xl h-64 flex items-center justify-center"
      >
        <p className="text-center text-sage inline-flex flex-col items-center px-3">
          <PlusCircleIcon className="h-10 w-10" />
          <span className="text-xl font-black">Add Slot Target</span>
        </p>
      </button>
    </SlotTargetPickerProvider>
  );
};

export default AddSlotTarget;
