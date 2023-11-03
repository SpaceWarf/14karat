import './Lore.scss';
import Header from '../Common/Header';
import { useEffect } from 'react';

function CeremoniesListing() {
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
    <div className="CeremoniesListing">
      <div className='Ceremony'>
        <Header id="bloodin" element={<p>Blood-in</p>} decorated />
        <div className='Description'>
          <p>
            TODO
          </p>
        </div>
      </div>
      <div className='Ceremony'>
        <Header id="bloodout" element={<p>Blood-out</p>} decorated />
        <div className='Description'>
          <p>
            TODO
          </p>
        </div>
      </div>
      <div className='Ceremony'>
        <Header id="senbiki-okami" element={<p>Senbiki ōkami (<span className='Kanji'>千疋狼</span>)</p>} decorated />
        <div className='Description'>
          <p>
            TODO
          </p>
        </div>
      </div>
    </div>
  );
}


export default CeremoniesListing;
