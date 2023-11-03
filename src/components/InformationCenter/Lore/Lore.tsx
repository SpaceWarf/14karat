import './Lore.scss';
import Header from '../../Common/Header';
import { useNavigate } from 'react-router-dom';
import LoreMenu from '../../Lore/LoreMenu';

function Lore() {
  const navigate = useNavigate();

  return (
    <div className="Lore">
      <Header text='Lore' decorated />
      <div className="actions">
        <p className="hyperlink-button" onClick={() => navigate('/information-center')}><i className='arrow left icon' /> back</p>
        <p className="hyperlink-button" onClick={() => window.open('/public/lore', "_blank")}> Public Lore Page <i className='external icon' /></p>
      </div>
      <div className='content'>
        <LoreMenu />
      </div>
    </div>
  );
}


export default Lore;
