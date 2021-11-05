import { ITemplate } from 'atomicassets/build/API/Explorer/Objects';
import Image from 'next/image';
import { GET_COLLECTION_TEMPLATES } from '../../lib/account/getauthcol';
import useCallAPI from '../../lib/hooks/useCallAPI';
import { useSlotTargetPicker } from './provider';

const SlotTargetTemplates = () => {
  const { defCollection, state, dispatch } = useSlotTargetPicker();

  const data = useCallAPI<ITemplate[]>(
    defCollection ? GET_COLLECTION_TEMPLATES(defCollection) : null
  );

  const isSelected = (template: string) => {
    const check = state.filter((i) => i.templateid === Number(template))[0];

    return check !== undefined;
  };

  return (
    <div className="mt-3 mx-auto w-11/12 grid grid-cols-4 gap-4 max-h-screen overflow-auto">
      {data?.map((i, index) => (
        <button
          onClick={() => {
            if (isSelected(i.template_id)) {
              dispatch({ type: 'remove', template: Number(i.template_id) });
              return;
            }

            dispatch({
              type: 'add',
              target: {
                odds: 0,
                templateid: Number(i.template_id),
                image: i.immutable_data.img
              }
            });
          }}
          type="button"
          key={index}
          className={`${
            isSelected(i.template_id) ? `border-2 border-deep-champagne` : ''
          } bg-charcoal p-2 rounded-lg`}
        >
          <Image
            src={`https://ipfs.io/ipfs/${i.immutable_data.img}`}
            alt={i.immutable_data.name}
            height="300"
            width="200"
          />
        </button>
      ))}
    </div>
  );
};

export default SlotTargetTemplates;
