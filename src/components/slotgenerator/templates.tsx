import { XIcon } from '@heroicons/react/solid';
import { useSlotGenerator } from './provider';
import SlotTemplatesSelect from './template-select';

const SlotTemplates = () => {
  const {
    state: { templates },
    dispatch
  } = useSlotGenerator();

  const removeTemplate = (t: number) => {
    dispatch({ type: 'set', key: 'templates', value: templates.filter((x) => x !== t) });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <label htmlFor="templates" className="text-white">
          Templates
        </label>

        <div className="inline-flex items-center">
          <SlotTemplatesSelect />
        </div>
      </div>

      <div className="w-11/12 mx-auto mt-2 bg-deep-champagne p-2 rounded-lg">
        {templates.map((t, index) => (
          <div
            key={index}
            className="flex items-center justify-between w-full py-1 px-3 text-sm  my-1 bg-sage rounded-full"
          >
            <strong className="text-gunmetal">#{t}</strong>

            <button
              type="button"
              onClick={() => removeTemplate(t)}
              className="hover:text-gunmetal"
              title="Remove template"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SlotTemplates;
