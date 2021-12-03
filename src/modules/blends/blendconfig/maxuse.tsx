const BlendConfigMaxUses = () => {
  return (
    <div className="my-2">
      <h4 className="text-lg uppercase underline text-sage font-bold">Max Uses</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-11/12 mt-4 mx-auto">
        <div className="my-1 sm:my-0">
          <p className="text-gray-200 mb-1">Maximum Use</p>
          <input
            type="number"
            name="maxuse"
            className="py-2 px-4 rounded-lg w-full"
            placeholder="Set max use"
          />
        </div>

        <div className="my-1 sm:my-0">
          <p className="text-gray-200 mb-1">Max User Use</p>
          <input
            type="number"
            name="maxuse"
            className="py-2 px-4 rounded-lg w-full"
            placeholder="Set max user use"
          />
        </div>
      </div>

      <div className="text-right mt-2">
        <button
          type="button"
          className="py-2 px-6 rounded-lg bg-sage hover:bg-deep-champagne text-sm text-gunmetal"
        >
          Update Max Use
        </button>
      </div>
    </div>
  );
};

export default BlendConfigMaxUses;
