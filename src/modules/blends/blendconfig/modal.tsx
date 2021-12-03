import Dialogs from '../../../components/Dialogs';
import BlendConfigModalContainer from './container';
import BlendConfigProvider from './provider';

type BlendConfigModalProps = {
  open: boolean;
  onClose: () => void;
  blenderid: number;
};
const BlendConfigModal = ({ open, onClose, blenderid }: BlendConfigModalProps) => {
  return (
    <BlendConfigProvider blenderid={blenderid}>
      <Dialogs
        open={open}
        onClose={onClose}
        className="inline-block w-full max-w-3xl p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-gunmetal shadow-xl rounded-2xl"
      >
        <BlendConfigModalContainer />
      </Dialogs>
    </BlendConfigProvider>
  );
};

export default BlendConfigModal;
