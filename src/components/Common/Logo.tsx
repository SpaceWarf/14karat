import logo from '../../assets/images/logo-icon.png';
import text from '../../assets/images/logo-text.png';

interface LogoProps {
  size: string;
  interactive?: boolean;
  onClick?: () => void;
}

function Logo({ interactive, size, onClick }: LogoProps) {
  return (
    interactive ? (
      <div
        className='Logo interactive'
        onClick={onClick}
      >
        <img className={`LogoIcon ${size}`} src={logo} alt='Logo Icon' />
        <img className={`LogoText ${size}`} src={text} alt='Logo Text' />
      </div>
    ) : (
      <div className='Logo'>
        <img className={`LogoIcon ${size}`} src={logo} alt='Logo Icon' />
        <img className={`LogoText ${size}`} src={text} alt='Logo Text' />
      </div>
    )
  );
}

export default Logo;
