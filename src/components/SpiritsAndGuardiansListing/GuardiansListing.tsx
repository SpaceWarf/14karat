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
            <a href='https://yokai.com/yatagarasu/' target='_blank' rel="noreferrer">Yatagarasu (八咫烏)</a>
          </p>
        </div>
      </div>
      <div className='Guardian'>
        <Header id="houou" element={<p>Hōō (<span className='Kanji'>鳳凰</span>)</p>} decorated />
        <div className='Description'>
          <p>
            <a href='https://yokai.com/houou/' target='_blank' rel="noreferrer">Hōō (鳳凰)</a>
          </p>
          <img src={houou} alt='Houou' />
        </div>
      </div>
      <div className='Guardian'>
        <Header id="byakko" element={<p>Byakko (<span className='Kanji'>白虎</span>)</p>} decorated />
        <div className='Description'>
          <img src={byakko} alt='Byakko' />
          <p>
            <a href='https://yokai.com/byakko-tiger/' target='_blank' rel="noreferrer">Byakko (白虎)</a>
          </p>
        </div>
      </div>
      <div className='Guardian'>
        <Header id="inugami" element={<p>Inugami (<span className='Kanji'>犬神</span>)</p>} decorated />
        <div className='Description'>
          <p>
            <a href='https://yokai.com/inugami/' target='_blank' rel="noreferrer">Inugami (犬神)</a>
          </p>
          <img src={inugami} alt='Inugami' />
        </div>
      </div>
      <div className='Guardian'>
        <Header id="raijuu" element={<p>Raijū (<span className='Kanji'>雷獣</span>)</p>} decorated />
        <div className='Description'>
          <img src={raiju} alt='Raijū' />
          <p>
            <a href='https://yokai.com/raijuu/' target='_blank' rel="noreferrer">Raijū (雷獣)</a>
          </p>
        </div>
      </div>
      <div className='Guardian'>
        <Header id="kyourinrin" element={<p>Kyōrinrin (<span className='Kanji'>経凛々</span>)</p>} decorated />
        <div className='Description'>
          <p>
            <a href='https://yokai.com/kyourinrin/' target='_blank' rel="noreferrer">Kyōrinrin (経凛々)</a>
          </p>
          <img src={kyourinrin} alt='Kyōrinrin' />
        </div>
      </div>
      <div className='Guardian'>
        <Header id="ryuuguuwarashi" element={<p>Ryūgū warashi (<span className='Kanji'>竜宮童子</span>)</p>} decorated />
        <div className='Description'>
          <img src={ryuuguuwarashi} alt='Ryūgū warashi' />
          <p>
            <a href='https://yokai.com/ryuuguuwarashi/' target='_blank' rel="noreferrer">Ryūgū warashi (竜宮童子)</a>
          </p>
        </div>
      </div>
    </div>
  );
}


export default GuardiansListing;
