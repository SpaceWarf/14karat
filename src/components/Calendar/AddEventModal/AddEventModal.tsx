import "./AddEventModal.scss";
import { Checkbox, Modal } from "semantic-ui-react";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import Input from "../../Common/Input";
import { EVENT_COLORS } from "../../../state/event";
import Dropdown from "../../Common/Dropdown";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider, DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createEvent } from "../../../utils/firestore";

function AddEventModal() {
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [color, setColor] = useState<string>(EVENT_COLORS[0].value);
  const [start, setStart] = useState<Dayjs>(dayjs());
  const [end, setEnd] = useState<Dayjs>(dayjs().add(1, "hour"));
  const [allDay, setAllDay] = useState<boolean>(false);

  const handleAdd = async () => {
    setLoading(true);
    await createEvent({
      title,
      color,
      start: start.toISOString(),
      end: end.toISOString(),
      allDay
    }, user);
    clear();
    setLoading(false);
    setOpen(false);
  }

  const clear = () => {
    setTitle('');
    setColor(EVENT_COLORS[0].value);
    setStart(dayjs());
    setEnd(dayjs().add(1, 'hour'));
    setAllDay(false);
  }

  const canAdd = (): boolean => {
    return !!title && !!start && !!end && !!color && start.isBefore(end);
  }

  const handleUpdateStart = (start: Dayjs) => {
    if (end.isBefore(start)) {
      setEnd(start.add(1, 'hour'));
    }
    setStart(start);
  }

  const handleUpdateEnd = (end: Dayjs) => {
    if (end.isBefore(start)) {
      setStart(end.subtract(1, 'hour'));
    }
    setEnd(end);
  }

  return (
    <Modal
      className="AddEventModal Modal"
      size="small"
      onClose={() => { clear(); setOpen(false); }}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <button className="ui button positive hover-animation" onClick={() => setOpen(false)}>
          <p className='label contrast'>Add Event</p>
          <p className='IconContainer contrast'><i className='add icon'></i></p>
        </button>
      }
    >
      <Modal.Header>Add an event</Modal.Header>
      <Modal.Content>
        <div className='ui form'>
          <div className="Row">
            <Input
              type="text"
              name="title"
              placeholder="Title *"
              icon="code"
              value={title}
              onChange={setTitle}
              disabled={loading}
            />
            <Dropdown
              placeholder="Color *"
              disabled={loading}
              options={EVENT_COLORS}
              value={color}
              onChange={(_, { value }) => setColor(value)}
            />
          </div>
          <div className="Row">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Event Start *"
                value={start}
                onChange={value => handleUpdateStart(dayjs(value))}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Event End *"
                value={end}
                onChange={value => handleUpdateEnd(dayjs(value))}
              />
            </LocalizationProvider>
          </div>
          <div className="Row">
            <Checkbox checked={allDay} label="All Day?" toggle onChange={() => setAllDay(!allDay)} />
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <button className="ui button negative hover-animation" onClick={() => { clear(); setOpen(false); }}>
          <p className='label contrast'>Cancel</p>
          <p className='IconContainer contrast'><i className='close icon'></i></p>
        </button>
        <button className="ui button positive hover-animation" disabled={!canAdd()} onClick={handleAdd}>
          <p className='label contrast'>Confirm</p>
          <p className='IconContainer contrast'><i className='check icon'></i></p>
        </button>
      </Modal.Actions>
    </Modal>
  );
}

export default AddEventModal;