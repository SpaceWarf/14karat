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
            The blood-in ceremony is the ritual in which an newcomer becomes a full-fledged member of the family. The ceremony takes place at the blood altar
            where all past blood-in ceremonies have taken place. The family will gather at the altar with the newcomer, and invite them to walk up
            the steps next to the Oyabun. The Oyabun then prompts the newcomer to hold their hand over the blade of the katana before reciting the blood rite:
          </p>
          <div className='poem'>
            <p>
              Amidst the blooms of cherry trees,<br />
              A breeze whispers, the spirits appease.<br />
              A newcomer we joyously embrace,<br />
              By blood bound, in this sacred space.<br />
              <br />
              In harmony and tradition we blend,<br />
              One family, one spirit, without end.<br />
              This newcomer joins the timeless fray,<br />
              Their spirit now, forever to stay.<br />
            </p>
          </div>
          <p>
            The Oyabun then invites the newcomer to run their hand over the blade, spilling their blood. The newcomer is then handed a chain which they should grasp
            tightly in their cut hand, and hold over the ceremonial bottle, letting the blood drip and mix with its content. Once the newcomer's blood has been added
            to the receptacle, they are now a blooded-in member of the family, and the Oyabun may introduce them as such:
          </p>
          <p className='quote'>
            "MEMBER'S NAME, we welcome you as a fully-fledged member. You have forgoed the bond between body and spirit, and chosen instead the bond of our family.
            Once Ikiryō, you are now Yokai. We grant you the protection of Inugami, may it aid you in your times of need. Take this chain, wear it at all times,
            it represents the link between your spirit and our family. Take this blade, carry it at all times, may it cut down your enemies with impunity."
          </p>
          <p>
            In the event that a newcomer refuses to go through with the blood-in, the Oyabun may explain their removal from the family:
          </p>
          <p className='quote'>
            "MEMBER'S NAME, you have refused the bond of our family. Once Ikiryō, you remain Ikiryō. You are not welcome within this family, from now on, and forever.
            Do not seek our aid, for it will not be granted. Remove our colours, and be on your way."
          </p>
        </div>
      </div>
      {/* <div className='Ceremony'>
        <Header id="bloodout" element={<p>Blood-out</p>} decorated />
        <div className='Description'>
          <p>
            TODO
          </p>
        </div>
      </div> */}
      {/* <div className='Ceremony'>
        <Header id="senbiki-okami" element={<p>Senbiki ōkami (<span className='Kanji'>千疋狼</span>)</p>} decorated />
        <div className='Description'>
          <p>
            TODO
          </p>
        </div>
      </div> */}
    </div>
  );
}


export default CeremoniesListing;
