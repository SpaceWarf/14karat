import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getMainRadio } from '../../redux/selectors/radios';

interface SidebarProps {
  onCollapse: () => void;
  collapsed: boolean;
}

function Sidebar({ onCollapse, collapsed }: SidebarProps) {
  const { logout, isAdmin } = useAuth();
  const pfpUrl = useSelector((state: RootState) => state.profile.pfpUrl);
  const mainRadio = useSelector(getMainRadio);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className={`ui sidebar inverted vertical menu visible ${collapsed ? 'collapsed' : ''}`}>
      <div className='CollapseContainer'>
        <button className='ui icon button Collapse' onClick={onCollapse}>
          {collapsed ? <i className='angle double right icon'></i> : <i className='angle double left icon'></i>}
        </button>
      </div>
      <div className='SidebarContent'>
        <div className="Header">
          <Logo
            interactive
            randomize
            onClick={() => navigate('/')}
          />
        </div>
        <div className="Nav">
          <SidebarItem name='Dashboard' icon='chart bar' path='/' onClick={() => navigate('/')} />
          <SidebarItem name='Calendar' icon='calendar alternate' path='/calendar' onClick={() => navigate('/calendar')} />
          <SidebarItem name='Jobs' icon='dollar sign' path='/jobs' onClick={() => navigate('/jobs')} />
          <SidebarItem name='Radios' icon='microphone circle' path='/radios' onClick={() => navigate('/radios')}>
            {mainRadio && <p className='SidebarItemDetail'>{mainRadio.channel}</p>}
          </SidebarItem>
          <SidebarItem name='Roster' icon='address book' path='/roster' onClick={() => navigate('/roster')} />
          <SidebarItem name='Driver Strats' icon='car' path='/driver-strats' onClick={() => navigate('/driver-strats')} />
          <SidebarItem name='Stash Search' icon='search' path='/stash-search' onClick={() => navigate('/stash-search')} />
          <SidebarItem name='War Info' icon='bomb alternate' path='/war' onClick={() => navigate('/war')} />
          <SidebarItem name='Information Center' icon='info circle' path='/information-center' onClick={() => navigate('/information-center')} />
          {isAdmin && (
            <div className='AdminRoutes'>
              <div className='Divider' />
              <SidebarItem name='Groups' icon='group' path='/groups' onClick={() => navigate('/groups')} />
            </div>
          )}
        </div>
        <div className="Footer">
          <div className='Divider' />
          <SidebarItem name='Profile' icon='user circle' image={pfpUrl} path='/profile' onClick={() => navigate('/profile')} />
          <SidebarItem name='Log Out' icon='sign-out' onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
