import logo from '../../assets/images/logo.png';
import { useEffect, useState } from 'react';

interface LogoProps {
  interactive?: boolean;
  randomize?: boolean;
  onClick?: () => void;
}

function Logo({ interactive, randomize, onClick }: LogoProps) {
  const [rdmLogo, setRdmLogo] = useState<string>(logo);

  // useEffect(() => {
  //   if (randomize && Math.random() >= 0.9) {
  //     const context = require.context("../../assets/images/alternate-logos", false, /.*\.png$/);
  //     const images = context.keys().map((key) => context(key));
  //     setRdmLogo(images[Math.floor(Math.random() * images.length)]);
  //   }
  // }, [randomize]);

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
