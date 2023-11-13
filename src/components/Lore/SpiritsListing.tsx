import './Lore.scss';
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
        <Header id="ikiryou" element={<p>Ikiryo (<span className='Kanji'>生霊</span>)</p>} decorated />
        <div className='Description'>
          <img src={ikiryou} alt='Ikiryō' />
          <p>
            <a href='https://yokai.com/ikiryou/' target='_blank' rel="noreferrer">Ikiryō (生霊)</a>, or Living Spirit, are spirits that leave the physical body while the person is
            still alive. Ikiryō appear as either a translucent version of the living person from which they spawn, or a perfect representation of them. Ikiryō most commonly appear
            due to some intense emotion or trauma, and the owner of the soul is almost always unaware of the ikiryō's existence. The departure of an Ikiryō is temporary, and the
            spirit eventually returns to the body. When the person wakes up or regains consciousness, they may have little or no memory of their actions as an Ikiryō.
            <br />
            <br />
            Ikiryō are associated with members that have not yet undergone their blood-in ceremony. The connection to their spirit has not yet been severed and bound
            in service to the family and, in the event that they do not wish to undergo the blood-in ceremony, their spirit can go back to their body unharmed, leaving them with no
            memories of their time with the family.
          </p>
        </div>
      </div>
      <div className='Spirit'>
        <Header id="shiryou" element={<p>Shiryo (<span className='Kanji'>死霊</span>)</p>} decorated />
        <div className='Description'>
          <p>
            <a href='https://yokai.com/shiryou/' target='_blank' rel="noreferrer">Shiryō (死霊)</a>, or Dead Spirit, are the spirits of the deceased that have not found peace in the
            afterlife. A shiryō appears in the moments just after death most often to give one last goodbye before departing. However, shiryō do not always appear in order to say
            goodbye; sometimes they come to take their loved ones away with them into the world of the dead.
            <br />
            <br />
            Shiryō are associated with ex-members who have undergone the blood-out ceremony, and are no longer part of the family. Their physical body is killed, and their spirit
            released from its bind to the family, never to be welcomed back again.
          </p>
          <img src={shiryou} alt='Shiryō' />
        </div>
      </div>
      <div className='Spirit'>
        <Header id="onryou" element={<p>Onryo (<span className='Kanji'>怨霊</span>)</p>} decorated />
        <div className='Description'>
          <img src={onryou} alt='Onryō' />
          <p>
            <a href='https://yokai.com/onryou/' target='_blank' rel="noreferrer">Onryō (怨霊)</a>, or Vengeful Spirit, are spirits associated with strong feelings of ander, hatred, and
            a desire for revenge. Onryō are born from injustice, unresolved grudges, or unfulfilled desires, which cause the spirit to linger as a vengeful entity. An Onryō only desire
            is to achieve retribution on those responsible for their suffering, and they will not rest until vengeance is achieved.
            <br />
            <br />
            Onryō are associated with the Raijū as they are the members tasked with righting the wrongs, and taking care of individuals that have wronged the family. Onryō manifest during
            the blood-out ceremonies to sever the connection of a spirit to the family and birth a new Shiryō.
          </p>
        </div>
      </div>
    </div>
  );
}


export default SpiritsListing;
