import { SlotIngredients } from '../../../typings/blends/ingredients';

type SlotBlendIngredientsReducerActions =
  | { type: 'add'; slot: SlotIngredients }
  | { type: 'remove'; index: number };

const SlotBlendIngredientsReducer = (
  state: SlotIngredients[],
  action: SlotBlendIngredientsReducerActions
) => {
  switch (action.type) {
    case 'add': {
      return [action.slot, ...state];
    }

    case 'remove': {
      return state.filter((_, index) => index !== action.index);
    }

    default: {
      return state;
    }
  }
};

export default SlotBlendIngredientsReducer;
export type { SlotBlendIngredientsReducerActions };
