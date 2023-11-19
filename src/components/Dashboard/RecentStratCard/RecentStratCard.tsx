import { useSelector } from 'react-redux';
import './RecentStratCard.scss';
import { RootState } from '../../../redux/store';
import { DriverStrat } from '../../../redux/reducers/driverStrats';
import AssetCard from '../../Common/AssetCard';
import { useNavigate } from 'react-router-dom';
import ExpandStratModal from '../../DriverStrats/ExpandStratModal';
import { DatabaseTable, deleteItem } from '../../../utils/firestore';
import { useAuth } from '../../../contexts/AuthContext';

function RecentStratCard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { driverStrats } = useSelector((state: RootState) => state.driverStrats);

  const getRecentStrats = (): DriverStrat[] => {
    return [...driverStrats]
      .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
      .slice(0, 3);
  }

  const handleDelete = async (id: string) => {
    await deleteItem(DatabaseTable.DRIVER_STRATS, id, user);
  }

  return (
    <div className="RecentStratCard ui card attached external">
      <div className="content">
        <div className='header'>
          <p><i className='car icon' /> Recently Added Strats</p>
          <button className="ui icon button" onClick={() => navigate('/driver-strats')}>
            <i className='external alternate icon' />
          </button>
        </div>
        <div className='embeds'>
          {getRecentStrats().length === 0 && <p>Nothing to show...</p>}
          {getRecentStrats().map(strat => (
            <AssetCard item={strat} expandModal={<ExpandStratModal />} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentStratCard;
