import { ReactElement } from 'react';
import headerDecoration from '../../assets/images/header-decoration.png';

interface HeaderProps {
  id?: string;
  text?: string;
  element?: ReactElement;
  contrast?: boolean;
  decorated?: boolean;
}

function Header({ id, text, element, contrast, decorated }: HeaderProps) {
  return (
    <div id={id} className='Header'>
      {decorated && (
        <div>
          <img className='HeaderDecorator left' src={headerDecoration} alt='Header Decoration'></img>
        </div>
      )}
      <h1 className={`ui header ${contrast ? 'contrast' : ''}`}>{text ? text : element}</h1>
      {decorated && (
        <div>
          <img className='HeaderDecorator right' src={headerDecoration} alt='Header Decoration'></img>
        </div>
      )}
    </div>
  );
}

export default Header;