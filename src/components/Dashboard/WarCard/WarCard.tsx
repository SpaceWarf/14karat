import './WarCard.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OUR_TIMER_UP, THEIR_TIMER_UP, getSlideTimer, getTimeSince } from '../../../utils/time';
import { getMostRecentWar } from '../../../redux/selectors/wars';
import { getSlideRadio } from '../../../redux/selectors/radios';
import RadioChannel from '../../Common/RadioChannel';
import { useEffect, useState } from 'react';

function WarCard() {
  const navigate = useNavigate();
  const [now, setNow] = useState<Date>(new Date())
  const war = useSelector(getMostRecentWar);
  const slideRadio = useSelector(getSlideRadio);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNow(new Date())
    }, 60000)

    return () => clearTimeout(timeout)
  }, [])

  const getTimeString = (): string => {
    return war.endedAt ? getTimeSince(new Date(), new Date(war.endedAt)) : '0 days';
  }

  const getScoreClass = (): string => {
    if (war.kills === undefined || war.deaths === undefined) {
      return '';
    }

    if (war.kills > war.deaths) {
      return 'green';
    } else if (war.kills < war.deaths) {
      return 'red';
    }
    return 'yellow';
  }

  return war ? (
    <div className={war.endedAt ? "WarCard ui card attached external green" : "WarCard ui card attached external red"}>
      <div className="content">
        <div className='header'>
          <p><i className='bomb icon' /> War Info</p>
          <button className="ui icon button" onClick={() => navigate('/war')}>
            <i className='external alternate icon' />
          </button>
        </div>
        {war.endedAt && (
          <div className='LastWar'>
            <h3>We officially made it</h3>
            <h2>{getTimeString()}</h2>
            <h3>since the last war!</h3>
          </div>
        )}
        {!war.endedAt && (
          <>
            <div className='CurrentWar'>
              <div className='Label'>
                <h2>{war.group}</h2>
                <h1 className={getScoreClass()}>{war.kills} - {war.deaths}</h1>
              </div>
            </div>
            <div className='Timers'>
              <div className='OurTimer'>
                <h3>Our Timer</h3>
                <h2 className={getSlideTimer(now, war.ourSlide, OUR_TIMER_UP) === OUR_TIMER_UP ? 'green' : 'red'}>
                  {getSlideTimer(now, war.ourSlide, OUR_TIMER_UP)}
                </h2>
              </div>
              <div className='TheirTimer'>
                <h3>Their Timer</h3>
                <h2 className={getSlideTimer(now, war.theirSlide, THEIR_TIMER_UP) === THEIR_TIMER_UP ? 'red' : 'green'}>
                  {getSlideTimer(now, war.theirSlide, THEIR_TIMER_UP)}
                </h2>
              </div>
            </div>
            {slideRadio && (
              <div className='Radio'>
                <RadioChannel radio={slideRadio} />
                <p className='RadioLabel'>Slide Radio</p>
              </div>
            )}
            <div className='Rules'>
              <h4>Standard War Procedure</h4>
              <ul>
                <li>No bleets related to the war.</li>
                <li>Working at businesses is allowed.</li>
                <li>Do not hangout alone at the block.</li>
                <li>Always carry a gun & armour.</li>
                <li>Do not wear your katana or chain.</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  ) : <></>;
}

export default WarCard;
