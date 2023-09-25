import logo from '../../assets/images/logo-icon.png';
import text from '../../assets/images/logo-text.png';

interface LogoProps {
  interactive?: boolean;
  onClick?: () => void;
}

function Logo({ interactive, onClick }: LogoProps) {
  return (
    interactive ? (
      <div
        className='Logo interactive'
        onClick={onClick}
      >
        <img className='LogoIcon' src={logo} alt='Logo Icon' />
        <img className='LogoText' src={text} alt='Logo Text' />
      </div>
    ) : (
      <div className='Logo'>
        <img className='LogoIcon' src={logo} alt='Logo Icon' />
        <img className='LogoText' src={text} alt='Logo Text' />
      </div>
    )
  );
}

export default Logo;
