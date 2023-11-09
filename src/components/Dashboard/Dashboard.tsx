import './Dashboard.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import RecentStratCard from './RecentStratCard/RecentStratCard';
import UpcomingEventsCard from './UpcomingEventsCard/UpcomingEventsCard';
import WarCard from './WarCard/WarCard';
import RadiosCard from './RadiosCard/RadiosCard';
// import OtherJobsCard from './JobsCard/OtherJobsCard';
// import MyJobCard from './JobsCard/MyJobCard';
import banner from '../../assets/images/banner.png';
import QuoteCard from './QuoteCard/QuoteCard';
import NewFeatureCard from './NewFeatureCard/NewFeatureCard';

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
          {!profile.pfpUrl && <i className='user circle icon'></i>}
          {profile.pfpUrl && <img src={profile.pfpUrl} alt="Profile" />}
          <div>
            <h1 className='Name'>{profile.info.name}</h1>
            <h4 className='Division'>{getRoles().join(', ')}</h4>
          </div>
        </div>
        <img className='BannerDecorator' src={banner} alt='Chery Blossom Branch' />
      </div>
      <div className='content'>
        <div className='Col'><RecentStratCard /></div>
        <div className='Col'>
          <RadiosCard />
          <NewFeatureCard />
          {/* <MyJobCard />
          <OtherJobsCard /> */}
        </div>
        <div className='Col'>
          <UpcomingEventsCard />
          <WarCard />
          <QuoteCard />
        </div>
      </div>
    </div>
  );
}


export default Dashboard;
