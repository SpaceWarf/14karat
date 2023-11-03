import './PublicLore.scss';
import Logo from '../Common/Logo';
import LoreMenu from '../Lore/LoreMenu';

function PublicLore() {
  return (
    <div className="PublicLore">
      <div className='content'>
        <div className='Header'>
          <Logo />
        </div>
        <LoreMenu />
      </div>
    </div>
  );
}


export default PublicLore;
