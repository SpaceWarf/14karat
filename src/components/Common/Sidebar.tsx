import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getMainRadio } from '../../redux/selectors/radios';
import { Theme, getActiveTheme, getSidebarBackground } from '../../utils/themes';

interface SidebarProps {
  onCollapse: () => void;
  collapsed: boolean;
}

function Sidebar({ onCollapse, collapsed }: SidebarProps) {
  const { logout, access } = useAuth();
  const pfpUrl = useSelector((state: RootState) => state.profile.pfpUrl);
  const mainRadio = useSelector(getMainRadio);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div
      className={`ui sidebar inverted vertical menu visible ${collapsed ? 'collapsed' : ''}`}
      style={{ backgroundImage: `url(${getSidebarBackground()})` }}
    >
      {getActiveTheme() === Theme.CHRISTMAS && (
        <div className='Snowflakes'>
          {Array(40).fill(<div className='Snowflake' />)}
        </div>
      )}
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
          <SidebarItem name='Dashboard' icon='chart pie' path='/' onClick={() => navigate('/')} />
          {access.memberAccess && (
            <>
              <SidebarItem name='Calendar' icon='calendar alternate' path='/calendar' onClick={() => navigate('/calendar')} />
              <SidebarItem name='Jobs' icon='dollar sign' path='/jobs' onClick={() => navigate('/jobs')} />
            </>
          )}
          <SidebarItem name='Radios' icon='microphone circle' path='/radios' onClick={() => navigate('/radios')}>
            {mainRadio && <p className='SidebarItemDetail'>{mainRadio.channel}</p>}
          </SidebarItem>
          {access.memberAccess && (
            <SidebarItem name='Roster' icon='address book' path='/roster' onClick={() => navigate('/roster')} />
          )}
          {(access.chainedAccess || access.roninAccess) && (
            <>
              <SidebarItem name='Hacking' icon='code circle' path='/hacking' onClick={() => navigate('/hacking')} />
              <SidebarItem name='Driver Strats' icon='car' path='/driver-strats' onClick={() => navigate('/driver-strats')} />
            </>
          )}
          <SidebarItem name='War Info' icon='bomb alternate' path='/war' onClick={() => navigate('/war')} />
          {access.memberAccess && (
            <SidebarItem name='Information Center' icon='info circle' path='/information-center' onClick={() => navigate('/information-center')} />
          )}
          {access.seniorOpAccess && (
            <div className='AdminRoutes'>
              <div className='Divider' />
              <SidebarItem name='Inventory' icon='boxes' path='/inventory' onClick={() => navigate('/inventory')} />
              <SidebarItem name='Groups' icon='group' path='/groups' onClick={() => navigate('/groups')} />
              <SidebarItem name='Statistics' icon='chart bar' path='/statistics' onClick={() => navigate('/statistics')} />
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
