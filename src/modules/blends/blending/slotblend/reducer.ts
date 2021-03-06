import { SlotAssetIngredient } from '../../../../typings/blends/ingredients';

type SlotBlendingActions = {
  type: 'set-ingredient';
  index: number;
  value: SlotAssetIngredient | undefined;
};

const SlotBlendingReducer = (
  state: Record<number, SlotAssetIngredient | undefined>,
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
