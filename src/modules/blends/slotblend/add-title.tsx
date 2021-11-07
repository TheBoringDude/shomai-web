import { CheckIcon } from '@heroicons/react/solid';
import { useRef } from 'react';
import { useSlotBlend } from './provider';

const SlotAddTitle = () => {
  const { title, setTitle } = useSlotBlend();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col">
      <label className="text-white mb-2 text-sm underline" htmlFor="title">
        Add a Title of your Blend
      </label>
      <div className="border-b-2 px-5 border-sage focus-within:border-deep-champagne flex items-center">
        <input
          ref={inputRef}
          type="text"
          name="title"
          maxLength={70}
          className="bg-transparent py-2 outline-none text-deep-champagne tracking-wide w-full pr-4 font-bold"
          placeholder="Title of your blend..."
        />

        <button
          type="button"
          onClick={() => {
            const v = inputRef.current?.value;
            if (!v) return;
            if (v.length > 70) return;
            if (v === title) return;

            setTitle(v);
          }}
          className="inline-flex items-center text-xs uppercase bg-sage hover:bg-deep-champagne py-1 px-4 rounded-lg"
        >
          <CheckIcon className="h-4 w-4 mr-1" />
          Save
        </button>
      </div>
    </div>
  );
};

export default SlotAddTitle;
