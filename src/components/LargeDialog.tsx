import { ReactNode } from 'react';
import { SimpleModal } from 'unstyled-lightbox';

type LargeDialogProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};
const LargeDialog = ({ children, open, onClose }: LargeDialogProps) => {
  return (
    <SimpleModal
      open={open}
      onClose={onClose}
      className="fixed w-full h-full bg-black/60 z-50 inset-0 flex items-center justify-center"
      overlayClassname="absolute h-full w-full z-30"
    >
      <div className="max-w-3xl w-full bg-gunmetal">{children}</div>
    </SimpleModal>
  );
};

export default LargeDialog;
