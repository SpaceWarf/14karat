import './WarCard.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { getTimeSince } from '../../../utils/time';

function WarCard() {
  const navigate = useNavigate();
  const { warInfo } = useSelector((state: RootState) => state.warInfo);

  const getTimeString = (): string => {
    return warInfo.endedAt ? getTimeSince(new Date(), new Date(warInfo.endedAt)) : '0 days';
  }

  const getScoreClass = (): string => {
    if (warInfo.kills === undefined || warInfo.deaths === undefined) {
      return '';
    }

    if (warInfo.kills > warInfo.deaths) {
      return 'green';
    } else if (warInfo.kills < warInfo.deaths) {
      return 'red';
    }
    return 'yellow';
  }

  return (
    <div className={warInfo.endedAt ? "WarCard ui card attached external green" : "WarCard ui card attached external red"}>
      <div className="content">
        <div className='header'>
          <p><i className='bomb icon' /> War Info</p>
          <button className="ui icon button" onClick={() => navigate('/war')}>
            <i className='external alternate icon' />
          </button>
        </div>
        {warInfo.endedAt && (
          <div className='LastWar'>
            <h2>{getTimeString()}</h2>
            <h3>Since Last War</h3>
          </div>
        )}
        {!warInfo.endedAt && (
          <>
            <div className='CurrentWar'>
              <div className='Label'>
                <h2>{warInfo.group}</h2>
                <h1 className={getScoreClass()}>{warInfo.kills} - {warInfo.deaths}</h1>
              </div>
            </div>
            <div className='Rules'>
              <h4>Standard War Procedure</h4>
              <ul>
                <li>No bleets related to the war.</li>
                <li>Working at businesses is allowed.</li>
                <li>Do not hangout alone at the block.</li>
                <li>Always carry a gun & armour.</li>
                <li>Do not wear your katana or chain.</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WarCard;
