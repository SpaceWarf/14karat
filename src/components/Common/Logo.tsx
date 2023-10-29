import logo from '../../assets/images/logo-icon.png';

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
        <img src={logo} alt='Logo Icon' />
      </div>
    ) : (
      <div className='Logo'>
        <img src={logo} alt='Logo Icon' />
      </div>
    )
  );
}

export default Logo;
