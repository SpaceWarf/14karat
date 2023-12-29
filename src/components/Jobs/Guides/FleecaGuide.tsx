import './Guides.scss'
import { useNavigate } from "react-router-dom";
import Header from "../../Common/Header";
import { useEffect, useState } from 'react';
import { getAllBlackMarketUrlsForType } from '../../../utils/storage';
import { BlackMarketType } from '../../../state/black-markets';

function FleecaGuide() {
  const navigate = useNavigate();
  const [jewelers, setJewelers] = useState<string[]>([]);

  useEffect(() => {
    const fetchJewlers = async () => {
      setJewelers(await getAllBlackMarketUrlsForType(BlackMarketType.JEWELERS));
    }
    fetchJewlers();
  }, []);

  return (
    <div className='JobGuide'>
      <Header text="Fleeca Guide" decorated />
      <div className='content'>
        <div className="actions">
          <p className="hyperlink-button" onClick={() => navigate('/information-center/jobs')}><i className='arrow left icon' /> back</p>
        </div>
        <div className="GuideContent">
          <p>
            The first step to hitting a Fleeca is to disable the power boxe outside of the bank. The power boxes are gonna be at different locations depending on which
            bank you hit, but for example the power box of the bank in front of the block is on top of the bank, in the parking lot. To disable the box you need lockpicks,
            a screwdriver, an advanced hacking tool, and a universal cable.
          </p>
          <p>
            The hacking sequence will start with around 20 lockpicking skill checks, which require one lockpick per failure. Once you are past the lockpicking phase,
            you will need to do one Circle Swap hack. Succeeding the Circle Swap hack will consume your advanced hacking tool, universal cable, and screwdriver.
          </p>
          <div className='Media'>
            <iframe
              title='Fleeca Power Box Hacking'
              width='640'
              height='360'
              style={{ border: 'none' }}
              src='https://medal.tv/clip/1LVB3Jp_pricLc/vpujC7xic'
              allow='autoplay'
              allowFullScreen
            />
          </div>
          <p>
            After disabling the power box, you will be able to lockpick into the registers at the front of the bank. These require around 20 successful lockpicking checks.
            You then need to hack the vault panel situated on the side of the vault door. To hack the vault panel you need to use a cryptographic sequencer on it.
          </p>
          <p>
            The hacking sequence will start with around 25 lockpicking skill checks, which require one lockpick per failure. Once you are past the lockpicking phase,
            you will need to do one Symbol Match hack. Succeeding the Symbol Match hack will start a 4 minute timer to open the vault door.
          </p>
          <div className='Media'>
            <iframe
              title='Fleeca Vault Hacking'
              width='640'
              height='360'
              src='https://medal.tv/clip/1LVB3Jp_pricLc/vpujC7xic'
              allow='autoplay'
              allowFullScreen
            />
          </div>
          <p>
            Once you are in the vault, there will be some strongboxes you can drill into, which require around 20 successful lockpicking checks. You will need to have a drill and
            drill bits on you. You then need to use a thermite on the barred door and succeed a Thermite hack to access the back of the vault. There will be more strongboxes to
            lockpick in there.
          </p>
          <div className='Media'>
            <iframe
              title='Fleeca Strongbox Drilling'
              width='640'
              height='360'
              src='https://medal.tv/clip/1LVB3Jp_pricLc/vpujC7xic'
              allow='autoplay'
              allowFullScreen
            />
          </div>
          <p>
            Once all lockboxes are emptied, the only step left is to escape from the police. You will get out with three different types of loot; marked bill bags, rolled
            bills, and valuable goods. The marked bill bags and rolled bills need to be cleaned through the usual process, and the valuable goods can then be sold at a jewelery black
            market. The known locations of jewelry black markets can be found below. We have found that the average payout for a Fleeca is around $250,000.
          </p>
          <div className='Media'>
            {jewelers.map((jeweler, i) => (
              <img src={jeweler} alt={`Jeweler ${i}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FleecaGuide;
