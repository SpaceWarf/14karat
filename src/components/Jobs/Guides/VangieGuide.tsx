import './Guides.scss'
import { useNavigate } from "react-router-dom";
import Header from "../../Common/Header";
import map from "../../../assets/images/vangie-map.png"
import { useEffect, useState } from 'react';
import { getAllBlackMarketUrlsForType } from '../../../utils/storage';
import { BlackMarketType } from '../../../state/black-markets';

function VangieGuide() {
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
      <Header text="Vangelico Guide" decorated />
      <div className='content'>
        <div className="actions">
          <p className="hyperlink-button" onClick={() => navigate('/information-center/jobs')}><i className='arrow left icon' /> back</p>
        </div>
        <div className="GuideContent">
          <p>
            The first step to hitting Vangelico is to disable both power boxes that can be found on the sidewalk around the store (Specific locations found on the map
            below). Both boxes can be hit at the same time to reduce the delay between hacks and robbing the jewelry. Each hacker will need a hacking tool, a universal
            cable, and a couple of lockpicks.
          </p>
          <p>
            The hacking sequence will start with around 15 lockpicking skill checks, which require one lockpick per failure. Once you are past the lockpicking phase,
            you will need to do one Symbol Match hack. Succeeding the Symbol Match hack will consume your hacking tool, universal cable, and one lockpick.
          </p>
          <div className='Media'>
            <img src={map} alt='Map' />
            <iframe
              title='Vangie Hacking'
              width='640'
              height='360'
              style={{ border: 'none' }}
              src='https://medal.tv/clip/1EkIVx9EdOYARd/vp3d0ipS8?invite=cr-MSxBWUYsMTkzNTA2NDc2LA'
              allow='autoplay'
              allowFullScreen
            />
          </div>
          <p>
            Once both power boxes are disabled, the robbers can start grabbing jewelry from the cases. Simply hold a crowbar and third eye the cases to smash them
            open. There are a total of 20 cases to smash; 12 on the right side, and 8 on the left side. The person smashing the cases on the left side will be done
            earlier, and can lockpick the cash register to get an additional small sum of money.
          </p>
          <div className='Media'>
            <iframe
              title='Vangie Robbing'
              width='640'
              height='360'
              src='https://medal.tv/clip/1EkO6gTrLZbHyV/vpivrOIc3?invite=cr-MSxFMVAsMTkzNTA2NDc2LA'
              allow='autoplay'
              allowFullScreen
            />
          </div>
          <p>
            Once all cases are smashed and the register emptied, the only step left is to escape from the police. The jewelry can then be sold at a jewelery black
            market. The known locations of jewelry black markets can be found below. We have found that the average payout for a Vangelico is around $75,000 if
            you don't get any rare pristine jewels (which can sell for around half a million dollars).
          </p>
          <div className='Media'>
            {jewelers.map((jeweler, i) => (
              <img className='JewelerImg' src={jeweler} alt={`Jeweler ${i}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VangieGuide;
