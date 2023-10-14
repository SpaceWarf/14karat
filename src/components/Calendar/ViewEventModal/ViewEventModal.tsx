import "./ViewEventModal.scss";
import { Modal } from "semantic-ui-react";
import { ReactBigCalendarEvent } from "../../../state/event";
import dayjs from "dayjs";
import { LocalizationProvider, DateTimePicker, renderTimeViewClock, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAuth } from "../../../contexts/AuthContext";
import { deleteEvent } from "../../../utils/firestore";

interface ViewEventModalProps {
  open: boolean,
  event: ReactBigCalendarEvent,
  onEdit: () => void
  onClose: () => void
}

function ViewEventModal(props: ViewEventModalProps) {
  const { user, isAdmin } = useAuth();

  const handleDelete = async () => {
    await deleteEvent(props.event.id, user);
    props.onClose();
  }

  return (
    <Modal
      className="ViewEventModal Modal"
      size="small"
      onClose={props.onClose}
      open={props.open}
    >
      <Modal.Header>
        <div className="Title">
          <div className="Label" style={{ backgroundColor: props.event.color }} />
          {props.event.title}
        </div>
        {isAdmin && (
          <div className="Actions">
            <button className="ui icon button" onClick={props.onEdit}>
              <i className="pencil icon"></i>
            </button>
            <button className="ui icon negative button" onClick={handleDelete}>
              <i className="trash icon"></i>
            </button>
          </div>
        )}
      </Modal.Header>
      <Modal.Content>
        <div className='ui form'>
          <div className="Row">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {props.event.allDay ? (
                <DatePicker
                  label="Starts On"
                  value={dayjs(props.event.start)}
                  disabled
                />
              ) : (
                <DateTimePicker
                  label="Starts On"
                  value={dayjs(props.event.start)}
                  disabled
                />
              )}
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {props.event.allDay ? (
                <DatePicker
                  label="Ends On"
                  value={dayjs(props.event.end)}
                  disabled
                />
              ) : (
                <DateTimePicker
                  label="Ends On"
                  value={dayjs(props.event.end)}
                  disabled
                />
              )}
            </LocalizationProvider>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
}

export default ViewEventModal;