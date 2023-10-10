import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './Dashboard.scss';
import { useNavigate } from 'react-router-dom';
import RecentStratCard from './RecentStratCard/RecentStratCard';
import UpcomingEventsCard from './UpcomingEventsCard/UpcomingEventsCard';

function Dashboard() {
  const profile = useSelector((state: RootState) => state.profile);
  const { divisions } = useSelector((state: RootState) => state.divisions);
  const navigate = useNavigate();

  const getDivision = (): string => {
    return divisions.find(division => division.id === profile.info.division)?.name ?? '';
  }

  return (
    <div className="Dashboard">
      <div className='PageHeader'>
        <div className='UserInfo' onClick={() => navigate('/profile')}>
          <img src={profile.pfpUrl} alt="Profile" />
          <div>
            <h1 className='Name'>{profile.info.name}</h1>
            <h4 className='Division'>{getDivision()}</h4>
          </div>
        </div>
      </div>
      <div className='content'>
        <div><RecentStratCard /></div>
        <div><UpcomingEventsCard /></div>
      </div>
    </div>
  );
}


export default Dashboard;
