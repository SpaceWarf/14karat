import logo from '../../assets/images/logo.png';
import logoAlt1 from '../../assets/images/logo-alt-1.png';
import logoAlt2 from '../../assets/images/logo-alt-2.png';
import logoAlt3 from '../../assets/images/logo-alt-3.png';
import { useEffect, useState } from 'react';

interface LogoProps {
  interactive?: boolean;
  onClick?: () => void;
}

function Logo({ interactive, onClick }: LogoProps) {
  const [rdmLogo, setRdmLogo] = useState<string>(logo);

  useEffect(() => {
    if (Math.random() >= 0.9) {
      const alts = [logoAlt1, logoAlt2, logoAlt3];
      setRdmLogo(alts[Math.floor(Math.random() * alts.length)])
    }
  }, []);

  return (
    interactive ? (
      <div
        className='Logo interactive'
        onClick={onClick}
      >
        <img src={rdmLogo} alt='Logo Icon' />
      </div>
    ) : (
      <div className='Logo'>
        <img src={rdmLogo} alt='Logo Icon' />
      </div>
    )
  );
}

export default Logo;
