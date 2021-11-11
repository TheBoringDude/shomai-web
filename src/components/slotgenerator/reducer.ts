import { SlotBlendAllIngredientProps } from '../../typings/blends/ingredients';

type SlotGeneratorReducerActions<T extends keyof SlotBlendAllIngredientProps> =
  | {
      type: 'set';
      key: T;
      value: SlotBlendAllIngredientProps[T];
    }
  | { type: 'reset' };

const SlotGeneratorReducer = <T extends keyof SlotBlendAllIngredientProps>(
  state: SlotBlendAllIngredientProps,
  action: SlotGeneratorReducerActions<T>
) => {
  switch (action.type) {
    case 'set': {
      const x = {
        ...state,
        [action.key]: action.value
      };

      return x;
    }

    case 'reset': {
      return {
        ...state,
        type: null,
        amount: 1,
        schema: '',
        templates: [],
        require_all_attribs: false,
        attributes: []
      };
    }

    default: {
      return state;
    }
  }
};

export default SlotGeneratorReducer;
export type { SlotGeneratorReducerActions };
