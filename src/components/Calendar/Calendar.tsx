import './Calendar.scss';
import Header from '../Common/Header';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AddEventModal from './AddEventModal/AddEventModal';
import { ReactBigCalendarEvent } from '../../state/event';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import EditEventModal from './EditEventModal/EditEventModal';
import ViewEventModal from './ViewEventModal/ViewEventModal';
import { Webhook } from '../../state/webhook';
import { getWebhookById } from '../../utils/firestore';

const localizer = dayjsLocalizer(dayjs);

function EventCalendar() {
  const { isAdmin } = useAuth();
  const { events } = useSelector((state: RootState) => state.events);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [slotStart, setSlotStart] = useState<Date>(new Date());
  const [slotEnd, setSlotEnd] = useState<Date>(new Date());
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [event, setEvent] = useState<ReactBigCalendarEvent | null>(null);
  const [webhook, setWebhook] = useState<Webhook>();

  useEffect(() => {
    const fetchWebhook = async () => {
      setWebhook(await getWebhookById('event-update'));
    }

    if (isAdmin) {
      fetchWebhook();
    }
  }, [isAdmin]);

  const getEvents = (): ReactBigCalendarEvent[] => {
    return events.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  }

  const handleEventSelection = (event: ReactBigCalendarEvent) => {
    setEvent(event);
    setOpenViewModal(true);
  }

  const handleSelectSlot = (event: any) => {
    if (isAdmin) {
      setSlotStart(event.start);
      setSlotEnd(event.end);
      setOpenCreateModal(true);
    }
  }

  return (
    <div className="Calendar">
      <Header text="Calendar" decorated />
      <div className='content'>
        {openCreateModal && <AddEventModal
          open={openCreateModal}
          start={slotStart}
          end={slotEnd}
          webhook={webhook}
          onClose={() => setOpenCreateModal(false)}
        />}
        {openViewModal && event && <ViewEventModal
          open={openViewModal}
          event={event}
          webhook={webhook}
          onEdit={() => setOpenEditModal(true)}
          onClose={() => setOpenViewModal(false)}
        />}
        {openEditModal && event && <EditEventModal
          open={openEditModal}
          event={event}
          webhook={webhook}
          onSave={setEvent}
          onClose={() => setOpenEditModal(false)}
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
