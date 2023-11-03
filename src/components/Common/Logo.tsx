import logo from '../../assets/images/logo.png';
import { useEffect, useState } from 'react';

interface LogoProps {
  interactive?: boolean;
  onClick?: () => void;
}

function Logo({ interactive, onClick }: LogoProps) {
  const [rdmLogo, setRdmLogo] = useState<string>(logo);

  useEffect(() => {
    if (Math.random() >= 0.01) {
      const context = require.context("../../assets/images/alternate-logos", false, /.*\.png$/);
      const images = context.keys().map((key) => context(key));
      setRdmLogo(images[Math.floor(Math.random() * images.length)]);
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
