import CollectionPicker from './collection';
import { useAssetPicker } from './provider';
import SchemaPicker from './schema';
import TemplatePicker from './template';

type AssetFormProps = {
  onClose: () => void;
};

const AssetForm = ({ onClose }: AssetFormProps) => {
  const { collection, schema, template, image, pick } = useAssetPicker();

  return (
    <form
      className="w-11/12 mx-auto flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();

        pick(collection, schema, template, image);
      }}
    >
      <div className="flex flex-col my-2">
        <CollectionPicker />
      </div>

      <div className="flex flex-col my-2">
        <SchemaPicker />
      </div>

      <div className="flex flex-col my-2">
        <TemplatePicker />
      </div>

      <div className="flex items-center justify-center mt-8">
        <button
          className="py-3 px-12 mx-1 rounded-lg bg-deep-champagne hover:bg-atomic-tangerine text-sm"
          type="submit"
        >
          Select
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

export default AssetForm;
