import "./Jobs.scss";
import { useNavigate } from "react-router-dom";
import { Job } from "../../state/jobs";
import { Modal } from "semantic-ui-react";
import { useEffect, useState } from "react";

interface JobDetailsModalProps {
  job: Job;
  open: boolean;
  onClose: () => void;
}

function JobDetailsModal(props: JobDetailsModalProps) {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen((props.open));
  }, [props.open]);

  return (
    <Modal
      className="JobDetailsModal Modal"
      size="large"
      onClose={props.onClose}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Content>

      </Modal.Content>
    </Modal>
  );
}

export default JobDetailsModal;