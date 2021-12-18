import EmptyComponent from '../empty-component';
import SlotAmount from './amount-input';
import SlotAttributes from './attributes';
import { useSlotGenerator } from './provider';
import SchemaSlot from './schema';
import SlotSelectCollection from './select-collection';
import SlotSelectType from './select-type';
import SlotTemplates from './templates';

type SlotFormProps = {
  onClose: () => void;
};
const SlotForm = ({ onClose }: SlotFormProps) => {
  const { state, pick, dispatch } = useSlotGenerator();

  return (
    <form
      className="w-11/12 mx-auto flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();

        pick(state);

        dispatch({ type: 'reset' });
      }}
    >
      <div className="flex flex-col my-2">
        <SlotSelectType />
      </div>

      <div className="flex flex-col my-2">
        <label htmlFor="collection" className="text-white">
          Collection
        </label>
        <div className="mt-1 flex items-center justify-between bg-deep-champagne text-sm py-2 px-5 w-full rounded-lg">
          <p className="truncate font-bold tracking-wide">{state.collection}</p>

          <SlotSelectCollection />
        </div>
      </div>

      {state.type === 0 ? (
        <div className="flex flex-col my-2">
          <SchemaSlot />
        </div>
      ) : state.type === 1 ? (
        <div className="flex flex-col my-2">
          <SlotTemplates />
        </div>
      ) : state.type === 2 ? (
        <>
          <div className="flex flex-col my-2">
            <SchemaSlot />
          </div>

          <div className="flex flex-col my-2">
            <SlotAttributes />
          </div>
        </>
      ) : (
        <EmptyComponent />
      )}

      <SlotAmount />

      <div className="flex items-center justify-center mt-14">
        <button
          className="py-3 px-12 mx-1 rounded-lg bg-deep-champagne hover:bg-atomic-tangerine text-sm"
          type="submit"
        >
          Add Slot
        </button>

        <button
          className="py-3 px-12 mx-1 rounded-lg bg-charcoal text-neutral-300 text-sm"
          type="reset"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SlotForm;
