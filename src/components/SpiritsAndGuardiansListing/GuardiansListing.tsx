import './SpiritsAndGuardiansListing.scss';
import Header from '../Common/Header';
import komainu from '../../assets/images/spirits/komainu.jpg';
import kitsune from '../../assets/images/spirits/kitsune.jpg';
import yatagarasu from '../../assets/images/spirits/yatagarasu.jpg';
import houou from '../../assets/images/spirits/houou.jpg';
import byakko from '../../assets/images/spirits/byakko.jpg';
import inugami from '../../assets/images/spirits/inugami.jpg';
import raiju from '../../assets/images/spirits/raijuu.jpg';
import kyourinrin from '../../assets/images/spirits/kyourinrin.jpg';
import ryuuguuwarashi from '../../assets/images/spirits/ryuuguuwarashi.jpg';
import { useEffect } from 'react';

function GuardiansListing() {
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
    <div className="GuardiansListing">
      <div className='Guardian'>
        <Header id="komainu" element={<p>Koma inu (<span className='Kanji'>狛犬</span>)</p>} decorated />
        <div className='Description'>
          <img src={komainu} alt='Koma inu' />
          <p>
            <a href='https://yokai.com/komainu/' target='_blank' rel="noreferrer">Koma inu (狛犬)</a> are a pair of lion-like guardians with canine features that
            possess fierce expressions and stylized manes. Koma inu are depicted as a pair, one with an open mouth (representing the sound "a-gyo" or "阿形") and
            the other with a closed mouth (representing the sound "un-gyo" or "吽形"). They serve as guardians, both to keep out evil spirits and to ensure tranquility.
            The open mouth is said to scare away malevolent forces, and is associated with courage and strength, while the closed mouth is meant to keep positive energy
            inside, and is associated with wisdom and prudence. This duality embodies the concept of yin and yang, or death and life.
          </p>
        </div>
      </div>
      <div className='Guardian'>
        <Header id="kitsune" element={<p>Kitsune (<span className='Kanji'>狐</span>)</p>} decorated />
        <div className='Description'>
          <p>
            <a href='https://yokai.com/kitsune/' target='_blank' rel="noreferrer">Kitsune (狐)</a> are fox spirits known for their shapeshifting abilities and intelligence.
            They have the ability to change appearance at will, often taking on the form of beautiful women or other animals, and using it for either benevolent or
            mischievious purposes. Kitsune are exceptionally intelligent and cunning creatures, and are often known to outsmart humans and other supernatural beings. They are
            categorized by the number of tails they possess, which indicates their age and power. A one-tailed Kitsune is relatively young and less powerful, while a
            nine-tailed Kitsune is considered ancient and extremely powerful.
          </p>
          <img src={kitsune} alt='Kitsune' />
        </div>
      </div>
      <div className='Guardian'>
        <Header id="yatagarasu" element={<p>Yatagarasu (<span className='Kanji'>八咫烏</span>)</p>} decorated />
        <div className='Description'>
          <img src={yatagarasu} alt='Yatagarasu' />
          <p>
            <a href='https://yokai.com/yatagarasu/' target='_blank' rel="noreferrer">Yatagarasu (八咫烏)</a> is a crow spirit characterized by its three legs, which symbolize the
            sun and its movement across the sky. Yatagarasu is closely tied to the sun and is associated with the sun goddess Amaterasu who it guides when she withdraws into a cave,
            symbolizing the return of light after a period of darkness. Yatagarasu is also depicted as a divine guide said to appear during times of crisis or when individuals or
            communities are in need of guidance. The crow is believed to lead people in the right direction and help them find their way.
          </p>
        </div>
      </div>
      <div className='Guardian'>
        <Header id="houou" element={<p>Hōō (<span className='Kanji'>鳳凰</span>)</p>} decorated />
        <div className='Description'>
          <p>
            <a href='https://yokai.com/houou/' target='_blank' rel="noreferrer">Hōō (鳳凰)</a> are majestic phoenix spirits with colourful plumage, typically portrayed with brilliant
            red feathers on their heads, a white bodies, and green tail feathers. Hōō are a symbol of rebirth, immortality, and renewal, and their ability to rise from their own ashes
            after death represents the cyclical nature of life. As such, Hōō are associated with the concept of eternal life and the renewal of hope. Hōō are creatures of peace and
            never cause harm to other living things. It is said that when a Hōō flies, the wind stops, dust settles, and birds and insects grow quiet.
          </p>
          <img src={houou} alt='Houou' />
        </div>
      </div>
      <div className='Guardian'>
        <Header id="byakko" element={<p>Byakko (<span className='Kanji'>白虎</span>)</p>} decorated />
        <div className='Description'>
          <img src={byakko} alt='Byakko' />
          <p>
            <a href='https://yokai.com/byakko-tiger/' target='_blank' rel="noreferrer">Byakko (白虎)</a> the White Tiger is depicted as a majestic and powerful tiger with gleaming white
            fur and a commanding presence. He is one of the Four Symbols (Seiryu, Suzaku, Genbu, and Byakko), each associated with a cardinal direction. Its white color symbolizes purity,
            protection, and the west, which is the cardinal direction it represents. Byakko is considered a guardian and protector, bound to safeguard against evil forces and negative influences.
            Its presence brings balance and harmony to the west and to the land in general.
          </p>
        </div>
      </div>
      <div className='Guardian'>
        <Header id="inugami" element={<p>Inugami (<span className='Kanji'>犬神</span>)</p>} decorated />
        <div className='Description'>
          <p>
            <a href='https://yokai.com/inugami/' target='_blank' rel="noreferrer">Inugami (犬神)</a> are spirits originating from dogs and their loyalty to their master. They look identical to an ordinary
            dog in order to blend in, however, their true form is that of a desiccated, mummified dog's head, often dressed up in ceremonial trappings. Inugamis are created from the manipulation
            of dog spirits though occult rituals, which involve capturing and confining a dog, and subjecting it to cruelty or death to bind its spirit to its conjurer. Inugamis are historically
            used for curses, vengeance, and causing harm to ennemies, and are bound to carry out their conjurer's wishes.
          </p>
          <img src={inugami} alt='Inugami' />
        </div>
      </div>
      <div className='Guardian'>
        <Header id="raijuu" element={<p>Raijū (<span className='Kanji'>雷獣</span>)</p>} decorated />
        <div className='Description'>
          <img src={raiju} alt='Raijū' />
          <p>
            <a href='https://yokai.com/raijuu/' target='_blank' rel="noreferrer">Raijū (雷獣)</a> are wild beasts depicted as wolves with bright blue claws and a body surrounded by electrical sparks.
            They are associated with storms, and have the ability to generate and control lightning. Raijū live in the sky and ride down lightning bolts to earth when they are needed. Whenever thunder
            strikes, a Raijū was sent to achieve a dark deed. They take great pleasure in cause chaos and mayhem wherever they land, and will stop at nothing to cause mass desctruction.
          </p>
        </div>
      </div>
      <div className='Guardian'>
        <Header id="kyourinrin" element={<p>Kyōrinrin (<span className='Kanji'>経凛々</span>)</p>} decorated />
        <div className='Description'>
          <p>
            <a href='https://yokai.com/kyourinrin/' target='_blank' rel="noreferrer">Kyōrinrin (経凛々)</a> are spirits of knowledge formed from ancient scrolls, books, and scriptures which have been left
            unstudied by their owners and gathering dust. They are extravagant; decorating themselves with the most ornate volumes and scrolls, wearing them like a kimono. A scroll with tassels becomes the
            headpiece, and they develop bird-like beaks and long, extendible arms.
          </p>
          <img src={kyourinrin} alt='Kyōrinrin' />
        </div>
      </div>
      <div className='Guardian'>
        <Header id="ryuuguuwarashi" element={<p>Ryūgū warashi (<span className='Kanji'>竜宮童子</span>)</p>} decorated />
        <div className='Description'>
          <img src={ryuuguuwarashi} alt='Ryūgū warashi' />
          <p>
            <a href='https://yokai.com/ryuuguuwarashi/' target='_blank' rel="noreferrer">Ryūgū warashi (竜宮童子)</a> are water-dwelling spirits associated with the underwater palace of Ryūgū-jō (The Dragon Palace),
            which is located beneath the sea, and is ruled by the sea deity Ryūjin. The Ryūgū warashi are the childlike inhabitants of this opulent palace filled with treasures. Ryūgū warashi are given like gifts
            to people in return for offerings made to their underwater parents. They are talented, magical children who are able to fulfill almost any wish their adoptive parents might desire. They are excellent cooks,
            and their meals taste better than anything known to humans. Homes with Ryūgū warashi never run out of food or money, and quickly become prosperous and wealthy. However, the ugliness of these children
            eventually becomes more than their parents can stand. Inevitably, Ryūgū warashi are forced to bathe or are kicked out by their human parents, after which they return to the sea, and the family loses all
            of the wealth the Ryūgū warashi brought with it.
          </p>
        </div>
      </div>
    </div>
  );
}


export default GuardiansListing;
