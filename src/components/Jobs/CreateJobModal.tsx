import "./Jobs.scss";
import { Modal } from "semantic-ui-react";
import { useState } from "react";

function CreateJobModal() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Modal
      className="CreateJobModal Modal"
      size="large"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <button className="ui button positive hover-animation" onClick={() => setOpen(true)}>
          <p className='label contrast'>Create Job</p>
          <p className='IconContainer contrast'><i className='add icon'></i></p>
        </button>
      }
    >
      <Modal.Content>

      </Modal.Content>
    </Modal>
  );
}

export default CreateJobModal;