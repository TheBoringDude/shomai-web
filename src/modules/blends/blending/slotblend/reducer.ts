import { SimpleAssetIngredient } from '../../../../typings/blends/ingredients';

type SlotBlendingActions = {
  type: 'set-ingredient';
  index: number;
  value: SimpleAssetIngredient;
};

const SlotBlendingReducer = (
  state: Record<number, SimpleAssetIngredient>,
  action: SlotBlendingActions
) => {
  switch (action.type) {
    case 'set-ingredient': {
      return {
        ...state,
        [action.index]: action.value
      };
    }

    default: {
      return state;
    }
  }
};

export default SlotBlendingReducer;
export type { SlotBlendingActions };
