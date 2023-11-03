import './SpiritsAndGuardiansListing.scss';
import Header from '../Common/Header';
import ikiryou from '../../assets/images/spirits/ikiryou.jpg';
import onryou from '../../assets/images/spirits/onryou.jpg';
import shiryou from '../../assets/images/spirits/shiryou.jpg';
import { useEffect } from 'react';

function SpiritsListing() {
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const element = document.getElementById(hash.split('#')[1]);

      if (element) {
        element.scrollIntoView();
      }
    }
  }, []);

  return (
    <div className="SpiritsListing">
      <div className='Spirit'>
        <Header id="ikiryou" element={<p>Ikiryō (<span className='Kanji'>生霊</span>)</p>} decorated />
        <div className='Description'>
          <img src={ikiryou} alt='Ikiryō' />
          <p>
            <a href='https://yokai.com/ikiryou/' target='_blank' rel="noreferrer">Ikiryō (生霊)</a>
          </p>
        </div>
      </div>
      <div className='Spirit'>
        <Header id="shiryou" element={<p>Shiryō (<span className='Kanji'>死霊</span>)</p>} decorated />
        <div className='Description'>
          <p>
            <a href='https://yokai.com/shiryou/' target='_blank' rel="noreferrer">Shiryō (死霊)</a>
          </p>
          <img src={shiryou} alt='Shiryō' />
        </div>
      </div>
      <div className='Spirit'>
        <Header id="onryou" element={<p>Onryō (<span className='Kanji'>怨霊</span>)</p>} decorated />
        <div className='Description'>
          <img src={onryou} alt='Onryō' />
          <p>
            <a href='https://yokai.com/onryou/' target='_blank' rel="noreferrer">Onryō (怨霊)</a>
          </p>
        </div>
      </div>
    </div>
  );
}


export default SpiritsListing;
