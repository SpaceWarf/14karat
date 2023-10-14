import './Calendar.scss';
import Header from '../Common/Header';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AddEventModal from './AddEventModal/AddEventModal';
import { ReactBigCalendarEvent } from '../../state/event';
import { useState } from 'react';

const localizer = dayjsLocalizer(dayjs);

function EventCalendar() {
  const { events } = useSelector((state: RootState) => state.events);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [slotStart, setSlotStart] = useState<Date>(new Date());
  const [slotEnd, setSlotEnd] = useState<Date>(new Date());

  const getEvents = (): ReactBigCalendarEvent[] => {
    return events.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  }

  const handleEventSelection = (event: ReactBigCalendarEvent) => {
    // open edit modal
  }

  const handleSelectSlot = (event: any) => {
    setSlotStart(event.start);
    setSlotEnd(event.end);
    setOpenModal(true);
  }

  return (
    <div className="Calendar">
      <Header text="Calendar" decorated />
      <div className='content'>
        {openModal && <AddEventModal
          open={openModal}
          start={slotStart}
          end={slotEnd}
          onClose={() => setOpenModal(false)}
        />}
        <Calendar
          localizer={localizer}
          events={getEvents()}
          onSelectEvent={handleEventSelection}
          onSelectSlot={handleSelectSlot}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day']}
          eventPropGetter={event => {
            const data = events.find(ev => ev.id === event.id);
            const backgroundColor = data && data.color;
            return { style: { backgroundColor } };
          }}
          selectable
        />
      </div>
    </div>
  );
}

export default EventCalendar;
