import { useSlotGenerator } from './provider';

const DisplayTextSlot = () => {
  const { dispatch } = useSlotGenerator();

  return (
    <>
      <label htmlFor="display-text" className="text-white">
        Display Text
      </label>
      <input
        type="text"
        name="display-text"
        placeholder="Text placeholder for the slot..."
        className="py-3 px-5 rounded-lg bg-deep-champagne border-2 border-sage text-sm placeholder-coolGray-700 font-medium mt-1"
        onChange={(e) => {
          dispatch({ type: 'set', key: 'display_text', value: e.target.value });
        }}
      />
    </>
  );
};

export default DisplayTextSlot;
