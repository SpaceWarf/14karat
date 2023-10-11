import { useSelector } from 'react-redux';
import './WarCard.scss';
import { RootState } from '../../../redux/store';

function WarCard() {
  const { warInfo } = useSelector((state: RootState) => state.warInfo);

  const getTimeString = (): string => {
    if (warInfo.endedAt) {
      const now = new Date();
      const lastEnd = new Date(warInfo.endedAt);
      const ms = (now.getTime() - lastEnd.getTime());
      const days = Math.floor(ms / 86400000);
      const hours = Math.floor((ms % 86400000) / 3600000);
      const minutes = Math.round(((ms % 86400000) % 3600000) / 60000);

      const daysStr = days ? days === 1 ? `${days} day` : `${days} days` : '';
      const hoursStr = hours ? hours === 1 ? `${hours} hour` : `${hours} hours` : '';
      const minutesStr = minutes ? minutes === 1 ? `${minutes} minute` : `${minutes} minutes` : '';
      return `${daysStr}${daysStr && (hoursStr || minutesStr) ? ', ' : ''}${hoursStr}${hoursStr && minutesStr ? ' and ' : ''}${minutesStr}`;
    }
    return '0 days';
  }

  return (
    <div className={warInfo.current ? "WarCard ui card attached red" : "WarCard ui card attached green"}>
      <div className="content">
        <div>
          <h3>Days Since Last War</h3>
          <h2>{getTimeString()}</h2>
        </div>
        {warInfo.current && (
          <div>
            <h3>At War With</h3>
            <h2>{warInfo.current} ({warInfo.kills} - {warInfo.deaths})</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default WarCard;
