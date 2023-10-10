import './Calendar.scss';
import Header from '../Common/Header';

function Calendar() {
  return (
    <div className="Calendar">
      <Header text="Calendar" decorated />
      <div className='content'>
        <div className='NotFoundLabel'>
          <i className='exclamation triangle icon'></i>
          <p>Under Construction</p>
        </div>
      </div>
    </div>
  );
}


export default Calendar;
