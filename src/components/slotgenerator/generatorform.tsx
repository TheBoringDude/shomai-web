import AttributesSlot from './attributes';
import DisplayTextSlot from './displayText';
import FromSlot from './from';
import { useSlotGenerator } from './provider';
import SchemaSlot from './schema';
import SchemaOnlySlot from './schemaOnly';
import SlotSelectCollection from './select-collection';

type SlotFormProps = {
  onClose: () => void;
};
const SlotForm = ({ onClose }: SlotFormProps) => {
  const { state, pick } = useSlotGenerator();

  return (
    <form
      className="w-11/12 mx-auto flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();

        pick(state);
      }}
    >
      <div className="flex flex-col my-2">
        <label htmlFor="collection" className="text-white">
          Collection
        </label>
        <div className="mt-1 flex items-center justify-between bg-deep-champagne text-sm py-2 px-5 w-full rounded-lg">
          <p className="truncate font-bold tracking-wide">{state.collection}</p>

          <SlotSelectCollection />
        </div>
      </div>

      {state.collection !== '' && (
        <>
          <div className="flex flex-col my-2">
            <div className="flex items-center">
              <SchemaSlot />
              <SchemaOnlySlot />
            </div>
          </div>

          {!state.schema_only && state.schema !== '' && (
            <>
              <div className="flex flex-col my-2">
                <FromSlot />
              </div>

              {state.from !== '' && (
                <div className="flex flex-col my-2">
                  <AttributesSlot />
                </div>
              )}
            </>
          )}
        </>
      )}

      <div className="flex flex-col my-2">
        <DisplayTextSlot />
      </div>

      <div className="flex items-center justify-center mt-8">
        <button
          className="py-3 px-12 mx-1 rounded-lg bg-deep-champagne hover:bg-atomic-tangerine text-sm"
          type="submit"
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
    </form>
  );
};

export default SlotForm;
