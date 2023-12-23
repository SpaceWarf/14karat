import './Dashboard.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import RecentStratCard from './RecentStratCard/RecentStratCard';
import UpcomingEventsCard from './UpcomingEventsCard/UpcomingEventsCard';
import WarCard from './WarCard/WarCard';
import RadiosCard from './RadiosCard/RadiosCard';
import banner from '../../assets/images/banner.png';
import QuoteCard from './QuoteCard/QuoteCard';
import NewFeatureCard from './NewFeatureCard/NewFeatureCard';
import { useAuth } from '../../contexts/AuthContext';
import JobsCard from './JobsCard/JobsCard';
import { getAvatarBorder, getHeaderBackground, getHeaderDecoration, isThemeActive } from '../../utils/themes';
import UnchainedCard from './UnchainedCard/UnchainedCard';

function Dashboard() {
  const navigate = useNavigate();
  const { access } = useAuth();
  const profile = useSelector((state: RootState) => state.profile);
  const { roles } = useSelector((state: RootState) => state.roles);

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
      <div className='PageHeader' style={{ backgroundImage: `url(${getHeaderBackground()})` }}>
        <div className='UserInfo' onClick={() => navigate('/profile')}>
          {isThemeActive() && <img className='AvatarBorder' src={getAvatarBorder()} alt='Avatar Border' />}
          {!profile.pfpUrl && <i className='user circle icon'></i>}
          {profile.pfpUrl && <img src={profile.pfpUrl} alt="Profile" />}
          <div>
            <h1 className='Name'>{profile.info.name}</h1>
            <h4 className='Division'>{getRoles().join(', ')}</h4>
          </div>
        </div>
        {!isThemeActive() && <img className='BannerDecorator' src={banner} alt='Chery Blossom Branch' />}
        {isThemeActive() && <img className='HeaderDecoration' src={getHeaderDecoration()} alt='Decoration' />}
      </div>
      <div className='content'>
        <div className='Col'>
          {access.chainedAccess && <RecentStratCard />}
          {!access.chainedAccess && <UnchainedCard />}
        </div>
        <div className='Col'>
          <RadiosCard />
          <JobsCard />
        </div>
        <div className='Col'>
          <UpcomingEventsCard />
          <WarCard />
          <QuoteCard />
          {/* {access.chainedAccess && <NewFeatureCard />} */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
