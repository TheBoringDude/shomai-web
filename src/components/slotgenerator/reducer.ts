import { SlotIngredientAttributes, SlotIngredients } from '../../typings/blends/ingredients';

type SlotGeneratorReducerActions<T extends keyof SlotIngredients> =
  | {
      type: 'set';
      key: T;
      value: SlotIngredients[T];
    }
  | { type: 'add-attrib'; attrib: SlotIngredientAttributes }
  | { type: 'remove-attrib'; index: number };

const SlotGeneratorReducer = <T extends keyof SlotIngredients>(
  state: SlotIngredients,
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

    case 'add-attrib': {
      return {
        ...state,
        attributes: [...state.attributes, action.attrib]
      };
    }

    case 'remove-attrib': {
      const newAttribs = state.attributes.filter((i, index) => index !== action.index);

      return {
        ...state,
        attributes: newAttribs
      };
    }

    default: {
      return state;
    }
  }
};

export default SlotGeneratorReducer;
export type { SlotGeneratorReducerActions };
