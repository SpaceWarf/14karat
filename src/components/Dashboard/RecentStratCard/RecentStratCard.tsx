import { useSelector } from 'react-redux';
import './RecentStratCard.scss';
import { RootState } from '../../../redux/store';
import { DriverStrat } from '../../../redux/reducers/driverStrats';
import AssetCard from '../../Common/AssetCard';
import { useNavigate } from 'react-router-dom';
import ExpandStratModal from '../../DriverStrats/ExpandStratModal';

function RecentStratCard() {
  const navigate = useNavigate();
  const { driverStrats } = useSelector((state: RootState) => state.driverStrats);

  const getRecentStrats = (): DriverStrat[] => {
    return [...driverStrats]
      .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
      .slice(0, 3);
  }

  return (
    <div className="RecentStratCard ui card attached external">
      <div className="content">
        <div className='header'>
          <p>Recently Added Strats</p>
          <button className="ui icon button" onClick={() => navigate('/driver-strats')}>
            <i className='external alternate icon' />
          </button>
        </div>
        <div className='embeds'>
          {getRecentStrats().length === 0 && <p>Nothing to show...</p>}
          {getRecentStrats().map(strat => (
            <AssetCard item={strat} expandModal={<ExpandStratModal />} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentStratCard;
