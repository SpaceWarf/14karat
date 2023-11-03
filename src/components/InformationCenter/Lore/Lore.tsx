import './Lore.scss';
import Header from '../../Common/Header';
import { useNavigate } from 'react-router-dom';
import LoreMenu from '../../Lore/LoreMenu';

function Lore() {
  const navigate = useNavigate();

  return (
    <div className="Lore">
      <Header text='Spirits & Guardians' decorated />
      <div className="actions">
        <p className="back-button" onClick={() => navigate('/information-center')}><i className='arrow left icon' /> back</p>
      </div>
      <div className='content'>
        <LoreMenu />
      </div>
    </div>
  );
}


export default Lore;
