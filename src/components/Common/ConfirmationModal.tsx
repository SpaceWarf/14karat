import { Header, Modal } from "semantic-ui-react";
import { ReactElement, useState } from "react";

interface ConfirmationModalProps {
  title: string,
  icon?: string,
  content: ReactElement,
  trigger: ReactElement,
  onCancel?: () => void,
  onConfirm: () => void,
}

function ConfirmationModal(props: ConfirmationModalProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setOpen(false);

    if (props.onCancel) {
      props.onCancel();
    }
  }

  const handleConfirm = () => {
    setOpen(false);
    props.onConfirm();
  }

  return (
    <Modal
      className="ConfirmationModal Modal"
      size="small"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={props.trigger}
    >
      <Header icon={props.icon || 'warning sign'} content={props.title} />
      <Modal.Content>
        {props.content}
      </Modal.Content>
      <Modal.Actions>
        <button className="ui button negative hover-animation" onClick={handleCancel}>
          <p className='label contrast'>Cancel</p>
          <p className='IconContainer contrast'><i className='close icon'></i></p>
        </button>
        <button className="ui button positive hover-animation" onClick={handleConfirm}>
          <p className='label contrast'>Confirm</p>
          <p className='IconContainer contrast'><i className='check icon'></i></p>
        </button>
      </Modal.Actions>
    </Modal>
  );
}

export default ConfirmationModal;