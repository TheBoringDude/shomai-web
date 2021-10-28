import { SimpleIngredients } from '../../../typings/blends/ingredients';

type SimpleBlendActions =
  | { type: 'add-ingredient'; data: SimpleIngredients }
  | { type: 'remove-ingredient'; template: string };

const SimpleBlendReducer = (state: SimpleIngredients[], action: SimpleBlendActions) => {
  switch (action.type) {
    case 'add-ingredient': {
      return [...state, action.data];
    }

    case 'remove-ingredient': {
      console.log('called!');
      return state.filter((n) => n.template !== action.template);
    }

    default: {
      return state;
    }
  }
};

export default SimpleBlendReducer;
export type { SimpleBlendActions };
