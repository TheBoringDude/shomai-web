import { SlotBlendTargets } from '../../../typings/blends/targets';

type SlotBlendTargetsReducerActions = { type: 'add'; target: SlotBlendTargets };

const SlotBlendTargetsReducer = (
  state: SlotBlendTargets[],
  action: SlotBlendTargetsReducerActions
) => {
  switch (action.type) {
    case 'add': {
      return [action.target, ...state];
    }
    default: {
      return state;
    }
  }
};

export default SlotBlendTargetsReducer;
export type { SlotBlendTargetsReducerActions };
