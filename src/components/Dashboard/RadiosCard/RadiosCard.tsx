import { useSelector } from 'react-redux';
import { getMainRadio } from '../../../redux/selectors/radios';
import './RadiosCard.scss';
import { useNavigate } from 'react-router-dom';
import RadioChannel from '../../Common/RadioChannel';

function RadiosCard() {
  const navigate = useNavigate();
  const mainRadio = useSelector(getMainRadio);

  return (
    <div className="RadiosCard ui card attached external">
      <div className="content">
        <div className='header'>
          <p><i className='microphone alternate icon' /> Main Radio</p>
          <button className="ui icon button" onClick={() => navigate('/radios')}>
            <i className='external alternate icon' />
          </button>
        </div>
        <div className='Listing'>
          {mainRadio && <RadioChannel radio={mainRadio} />}
        </div>
      </div>
    </div>
  );
}

export default RadiosCard;
