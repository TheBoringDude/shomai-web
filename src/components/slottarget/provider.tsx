import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import { useSlotBlend } from '../../modules/blends/slotblend/provider';
import SlotBlendTargetsReducer, {
  SlotBlendTargetsReducerActions
} from '../../modules/blends/slotblend/reducer-targets';
import { SlotBlendTargetProps } from '../../typings/blends/targets';

type SlotTargetPickerProviderProps = {
  children: ReactNode;
  defCollection: string;
  pick: (targets: SlotBlendTargetProps[]) => void;
};

type SlotTargetPickerContextProps = {
  defCollection: string;
  pick: (targets: SlotBlendTargetProps[]) => void;
  state: SlotBlendTargetProps[];
  dispatch: Dispatch<SlotBlendTargetsReducerActions>;
};

const SlotTargetPickerContext = createContext<SlotTargetPickerContextProps>({
  defCollection: '',
  pick: () => {},
  state: [],
  dispatch: () => {}
});

const SlotTargetPickerProvider = ({
  children,
  defCollection,
  pick
}: SlotTargetPickerProviderProps) => {
  const { targets } = useSlotBlend();
  const [state, dispatch] = useReducer(SlotBlendTargetsReducer, targets);

  return (
    <SlotTargetPickerContext.Provider
      value={{
        defCollection,
        pick,
        state,
        dispatch
      }}
    >
      {children}
    </SlotTargetPickerContext.Provider>
  );
};

const useSlotTargetPicker = () => {
  const context = useContext<SlotTargetPickerContextProps>(SlotTargetPickerContext);
  if (context === undefined) {
    throw new Error('<SlotTargetPickerProvider></SlotTargetPickerProvider>');
  }

  return context;
};

export default SlotTargetPickerProvider;
export { SlotTargetPickerContext, useSlotTargetPicker };
