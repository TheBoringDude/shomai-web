import { SlotBlendTargetProps } from '../../../typings/blends/targets';

type SlotBlendTargetsReducerActions =
  | { type: 'add'; target: SlotBlendTargetProps }
  | { type: 'remove'; template: number }
  | { type: 'set-odds'; template: number; odds: number };

const SlotBlendTargetsReducer = (
  state: SlotBlendTargetProps[],
  action: SlotBlendTargetsReducerActions
) => {
  switch (action.type) {
    case 'add': {
      return [action.target, ...state];
    }
    case 'remove': {
      return state.filter((i) => i.templateid !== action.template);
    }
    case 'set-odds': {
      return state.map((i) => {
        if (i.templateid === action.template) {
          const x = i;
          x.odds = action.odds;

          return x;
        }

        return i;
      });
    }
    default: {
      return state;
    }
  }
};

export default SlotBlendTargetsReducer;
export type { SlotBlendTargetsReducerActions };
