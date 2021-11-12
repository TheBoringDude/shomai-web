import { SimpleAssetIngredient } from '../../../../typings/blends/ingredients';

type SimpleBlendingActions = {
  type: 'set-ingredient';
  index: number;
  value: SimpleAssetIngredient | undefined;
};

const SimpleBlendingReducer = (
  state: Record<number, SimpleAssetIngredient | undefined>,
  action: SimpleBlendingActions
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

export default SimpleBlendingReducer;
export type { SimpleBlendingActions };
