import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface SidebarProps {
  onCollapse: () => void;
  collapsed: boolean;
}

function Sidebar({ onCollapse, collapsed }: SidebarProps) {
  const { logout, isAdmin } = useAuth();
  const pfpUrl = useSelector((state: RootState) => state.profile.pfpUrl);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className={`ui sidebar inverted vertical menu visible ${collapsed ? 'collapsed' : ''}`}>
      <div className="Header">
        <Logo
          interactive
          onClick={() => navigate('/')}
        />
      </div>
      <div className="Nav">
        <SidebarItem name='Dashboard' icon='chart bar' path='/' onClick={() => navigate('/')} />
        <SidebarItem name='Driver Strats' icon='car' path='/driver-strats' onClick={() => navigate('/driver-strats')} />
        {isAdmin && (
          <div className='AdminRoutes'>
            <div className='Divider'></div>
            <SidebarItem name='Roster' icon='address book' path='/roster' onClick={() => navigate('/roster')} />
          </div>
        )}
      </div>
      <div className="Footer">
        <div className='Divider'></div>
        <SidebarItem name='Profile' icon='user circle' image={pfpUrl} path='/profile' onClick={() => navigate('/profile')} />
        <SidebarItem name='Log Out' icon='sign-out' onClick={handleLogout} />
      </div>
      <button className='ui icon button Collapse' onClick={onCollapse}>
        {collapsed ? <i className='angle double right icon'></i> : <i className='angle double left icon'></i>}
      </button>
    </div>
  );
}

export default Sidebar;
