import { Dispatch, ReactNode, SetStateAction } from 'react';
import ListBox from '../assetpicker/Listbox';

type AttribSelectSlotProps<T> = {
  showtext: string;
  label: string;
  selected: T;
  setSelected: Dispatch<SetStateAction<T>>;
  children: ReactNode;
};

const AttribSelectSlot = <T extends unknown>({
  selected,
  setSelected,
  showtext,
  label,
  children
}: AttribSelectSlotProps<T>) => {
  return (
    <ListBox selected={selected} showtext={showtext} setSelected={setSelected} label={label}>
      {children}
    </ListBox>
  );
};

export default AttribSelectSlot;
