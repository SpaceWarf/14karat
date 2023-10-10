import { useNavigate } from 'react-router-dom';
import './UpcomingEventsCard.scss';

function UpcomingEventsCard() {
  const navigate = useNavigate();

  return (
    <div className="UpcomingEventsCard ui card attached external">
      <div className="content">
        <div className='header'>
          <p>Upcoming Events</p>
          <button className="ui icon button" onClick={() => navigate('/calendar')}>
            <i className='external alternate icon' />
          </button>
        </div>
        <p>Nothing to show...</p>
      </div>
    </div>
  );
}

export default UpcomingEventsCard;
