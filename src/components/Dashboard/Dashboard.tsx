import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './Dashboard.scss';
import { useNavigate } from 'react-router-dom';
import RecentStratCard from './RecentStratCard/RecentStratCard';
import UpcomingEventsCard from './UpcomingEventsCard/UpcomingEventsCard';
import WarCard from './WarCard/WarCard';

function Dashboard() {
  const profile = useSelector((state: RootState) => state.profile);
  const { roles } = useSelector((state: RootState) => state.roles);
  const navigate = useNavigate();

  const getRoles = (): string[] => {
    const foundRoles: string[] = [];
    profile.info.roles.forEach(roleId => {
      const foundRole = roles.find(role => role.id === roleId);
      if (foundRole) {
        foundRoles.push(foundRole.name);
      }
    });
    return foundRoles;
  }

  return (
    <div className="Dashboard">
      <div className='PageHeader'>
        <div className='UserInfo' onClick={() => navigate('/profile')}>
          <img src={profile.pfpUrl} alt="Profile" />
          <div>
            <h1 className='Name'>{profile.info.name}</h1>
            <h4 className='Division'>{getRoles().join(', ')}</h4>
          </div>
        </div>
      </div>
      <div className='content'>
        <div className='Row'><RecentStratCard /></div>
        <div className='Row'><UpcomingEventsCard /></div>
        <div className='Row'><WarCard /></div>
      </div>
    </div>
  );
}


export default Dashboard;
