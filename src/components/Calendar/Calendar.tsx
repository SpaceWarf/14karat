import './Calendar.scss';
import Header from '../Common/Header';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AddEventModal from './AddEventModal/AddEventModal';
import { ReactBigCalendarEvent } from '../../state/event';

const localizer = dayjsLocalizer(dayjs);

function EventCalendar() {
  const { events } = useSelector((state: RootState) => state.events);

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

  return (
    <div className="Calendar">
      <Header text="Calendar" decorated />
      <div className='content'>
        <div className='Actions'>
          <AddEventModal />
        </div>
        <Calendar
          localizer={localizer}
          events={getEvents()}
          onSelectEvent={handleEventSelection}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={event => {
            const data = events.find(ev => ev.id === event.id);
            const backgroundColor = data && data.color;
            return { style: { backgroundColor } };
          }}
        />
      </div>
    </div>
  );
}


export default EventCalendar;
