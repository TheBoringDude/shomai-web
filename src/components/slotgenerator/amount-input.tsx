import { useSlotGenerator } from './provider';

const SlotAmount = () => {
  const {
    dispatch,
    state: { amount }
  } = useSlotGenerator();

  return (
    <div className="flex flex-row items-center my-3 w-4/5 mx-auto">
      <label htmlFor="amount" className="text-white mr-2">
        Amount
      </label>
      <input
        type="number"
        name="amount"
        defaultValue={amount}
        className="bg-deep-champagne rounded-lg py-3 px-6 text-sm placeholder-charcoal font-bold tracking-wide"
        placeholder="Enter amount of ingredient"
        onChange={(e) => {
          const v = e.currentTarget.valueAsNumber;
          if (v < 1) return;

          dispatch({ type: 'set', key: 'amount', value: v });
        }}
      />
    </div>
  );
};

export default SlotAmount;
