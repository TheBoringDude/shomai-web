import { Dialog } from '@headlessui/react';
import { useRef, useState } from 'react';
import Dialogs from '../../../components/Dialogs';
import { SlotBlendTargetProps } from '../../../typings/blends/targets';
import { useSlotBlend } from './provider';

type SetTargetOddsProps = {
  target: SlotBlendTargetProps;
};
const SetTargetOdds = ({ target }: SetTargetOddsProps) => {
  const [open, setOpen] = useState(false);
  const { dispatchTargets, odds, setOdds } = useSlotBlend();
  const oddsInput = useRef<HTMLInputElement>(null);

  return (
    <>
      <Dialogs
        open={open}
        onClose={() => setOpen(false)}
        className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gunmetal shadow-xl rounded-2xl"
      >
        <Dialog.Title as="h4" className="font-black text-white text-2xl">
          <span className="text-atomic-tangerine">#{target.templateid}</span> | Set Odds
        </Dialog.Title>
        <Dialog.Description className="text-white mt-1">
          Set template target odds
        </Dialog.Description>

        <div className="mt-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const v = oddsInput.current?.valueAsNumber ?? 0;
              if (v <= 0) return;
              if (v > 100) return;

              dispatchTargets({ type: 'set-odds', template: target.templateid, odds: v });
              setOpen(false);
            }}
            className="mx-auto w-11/12"
          >
            <p className="text-sm text-white text-right">Remaining Odds: {100 - odds}</p>

            <div className="flex flex-col my-2">
              <label className="text-white" htmlFor="odds">
                Odds
              </label>
              <input
                ref={oddsInput}
                type="number"
                max={`${100 - odds + target.odds}`}
                name="odds"
                className="py-3 px-5 rounded-lg mt-1"
                placeholder="Set template odds probability"
                required
              />
            </div>

            <div className="flex items-center justify-center mt-8">
              <button
                type="submit"
                className="py-3 px-12 mx-1 rounded-lg bg-deep-champagne hover:bg-atomic-tangerine text-sm"
              >
                Set Odds
              </button>

              <button
                className="py-3 px-12 mx-1 rounded-lg bg-charcoal text-gray-300 text-sm"
                type="reset"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Dialogs>

      <button
        onClick={() => setOpen(true)}
        type="button"
        title="Preview Slot Ingredient"
        className="absolute z-10 hidden group-hover:block text-xs top-1 left-1 bg-sage text-gunmetal hover:bg-deep-champagne py-1 px-2 rounded-lg"
      >
        set odds
      </button>
    </>
  );
};

export default SetTargetOdds;
