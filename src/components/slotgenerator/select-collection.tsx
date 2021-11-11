import { Dialog } from '@headlessui/react';
import { BadgeCheckIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { ICollection } from 'atomicassets/build/API/Explorer/Objects';
import { useRef, useState } from 'react';
import { AtomicRequest } from '../../typings/atomicrequest';
import Dialogs from '../Dialogs';
import { useSlotGenerator } from './provider';

const SlotSelectCollection = () => {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useSlotGenerator<'collection'>();

  const [confirmed, setConfirmed] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');
  const [col, setCol] = useState(state.collection);

  const inputCol = useRef<HTMLInputElement>(null);

  const select = () => {
    if (confirmed) {
      dispatch({ type: 'set', key: 'collection', value: col });

      setOpen(false);
      setConfirmed(false);
      setChecking(false);
      setError('');
    }
  };

  const search = async () => {
    const q = inputCol?.current?.value.trim();
    if (!q) return;

    if (q === state.collection) return;

    setChecking(true);

    const f: AtomicRequest<ICollection> = await fetch(
      `${process.env.NEXT_PUBLIC_ATOMICASSETS_API}/atomicassets/v1/collections/${q}`
    )
      .then((r) => r.json())
      .catch((e) => {
        console.error(e);
        setError(e);
        setChecking(false);
      });

    if (!f.success) {
      setError('Collection does not exist! If problem persists, please contract the dev.');
      setChecking(false);
      return;
    }

    if (f.data.collection_name === q) {
      setError('');
      setConfirmed(true);
      setCol(q);
      setChecking(false);
    }
  };

  return (
    <>
      <Dialogs
        open={open}
        onClose={() => setOpen(false)}
        className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-charcoal shadow-xl rounded-2xl"
      >
        <Dialog.Title as="h4" className="font-black text-white text-2xl">
          Change Collection
        </Dialog.Title>

        <Dialog.Description className="tracking-wide mt-2 text-white">
          Enter the name of the collection and click the button to check and verify
        </Dialog.Description>

        <div className="w-11/12 mx-auto mt-8">
          <p className="text-center text-sage">{error}</p>

          <div className="my-2 inline-flex items-center text-white">
            <strong
              className="font-bold tracking-wide underline"
              title="Current selected collection "
            >
              {col}
            </strong>
            <BadgeCheckIcon className="h-4 w-4 ml-1" />
          </div>

          <div className="flex">
            <input
              ref={inputCol}
              type="text"
              placeholder="What is the name of the collections?"
              defaultValue={state.collection}
              className="py-3 px-4 rounded-lg font-bold text-gunmetal border-2 border-sage w-full bg-deep-champagne"
            />
            <button
              disabled={checking}
              onClick={search}
              type="button"
              className="ml-1 bg-sage p-3 rounded-md text-gunmetal inline-flex items-center text-xs uppercase"
            >
              {checking ? (
                `...`
              ) : (
                <>
                  <CheckCircleIcon className="h-6 w-6 mr-1" />
                  CHECK
                </>
              )}
            </button>
          </div>

          <div className="my-6 text-center">
            <button
              disabled={!confirmed}
              type="button"
              onClick={select}
              className="py-3 px-8 rounded-lg bg-deep-champagne hover:bg-atomic-tangerine font-bold tracking-wide uppercase text-gunmetal text-sm disabled:opacity-80 disabled:hover:bg-deep-champagne"
            >
              Select
            </button>
          </div>
        </div>
      </Dialogs>

      <button
        onClick={() => {
          setOpen(true);
        }}
        type="button"
        className="py-2 px-4 rounded-lg text-xs bg-sage bg-opacity-80 hover:bg-opacity-100 ml-2"
      >
        Change Collection
      </button>
    </>
  );
};

export default SlotSelectCollection;
