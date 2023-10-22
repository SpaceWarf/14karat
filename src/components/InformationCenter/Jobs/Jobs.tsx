import './Jobs.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Common/Header';
import { ReactElement, useEffect, useState } from 'react';
import { JobInfo } from '../../../state/jobs';
import { getJobInfos } from '../../../utils/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { currencyFormat } from '../../../utils/currency';

function Jobs() {
  const navigate = useNavigate();
  const gear = useSelector((state: RootState) => state.jobs.gear);
  const cards = useSelector((state: RootState) => state.jobs.cards);
  const usbs = useSelector((state: RootState) => state.jobs.usbs);
  const { hacks } = useSelector((state: RootState) => state.hacks);
  const [jobs, setJobs] = useState<JobInfo[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      setJobs(await getJobInfos());
    }
    fetchJobs();
  }, []);

  const getGearList = (gearMap: Map<string, number>): ReactElement[] => {
    const components: ReactElement[] = [];

    for (const [key, value] of Object.entries(gearMap)) {
      const gearData = gear.find(g => g.id === key);

      if (gearData) {
        components.push(
          <li>{gearData.name} x {value}</li>
        )
      }
    }

    return components;
  }

  const getCardList = (cardMap: Map<string, number>): ReactElement[] => {
    const components: ReactElement[] = [];


    for (const [key, value] of Object.entries(cardMap)) {
      switch (key) {
        case "any-bank":
          components.push(<li>Any Bank Card x {value}</li>);
          break;
        case "all-bank":
          components.push(<li>All Bank Cards (6 total)</li>);
          break;
        case "any-security":
          components.push(<li>Any Security Card x {value}</li>);
          break;
        case "any-humane":
          components.push(<li>Any Humane Card x {value}</li>);
          break;
        default:
          const cardData = cards.find(data => data.id === key);
          if (cardData) {
            components.push(
              <li>{cardData.name} x {value}</li>
            )
          }
      }
    }

    return components;
  }

  const getUsbsList = (usbMap: Map<string, number>): ReactElement[] => {
    const components: ReactElement[] = [];

    for (const [key, value] of Object.entries(usbMap)) {
      const usbData = usbs.find(u => u.id === key);

      if (usbData) {
        components.push(
          <li>{usbData.name} x {value}</li>
        )
      }
    }

    return components;
  }

  const getHacksList = (hackList: string[]): ReactElement[] => {
    const components: ReactElement[] = [];

    hackList.forEach(id => {
      const hackData = hacks.find(data => data.id === id);

      if (hackData) {
        components.push(
          <li>{hackData.name}</li>
        )
      }
    });

    return components;
  }

  // const handleCreateJob = (jobInfo: JobInfo) => {
  // }

  return (
    <div className="Jobs">
      <Header text='Job Information' decorated />
      <div className='content'>
        <div className="actions">
          <p className="back-button" onClick={() => navigate('/information-center')}><i className='arrow left icon' /> back</p>
        </div>
        <div className='JobContainer'>
          {[...jobs].sort((a, b) => a.order - b.order).map(job => (
            <div>
              <div className={`JobInfoCard ui card attached external ${job.colour}`}>
                <div className="content">
                  <div className="header">
                    <p><i className={`${job.icon} icon`} /> {job.name}</p>
                    <p>{isNaN(job.payout) ? job.payout : `~${currencyFormat(job.payout)}`}</p>
                  </div>
                  <div className="Details ui form">
                    <div className='Row'>
                      <div className='Field'>
                        <p className='Label'>Crew Size</p>
                        <p className='Value'>{job.squadMin === job.squadMax ? job.squadMin : `${job.squadMin} - ${job.squadMax}`}</p>
                      </div>
                      <div className='Field'>
                        <p className='Label'>Hostages</p>
                        <p className='Value'>At least {job.hostages}</p>
                      </div>
                    </div>
                    <div className='Row'>
                      <div className='Field'>
                        <p className='Label'>Gear</p>
                        {Object.keys(job.gear).length ? (
                          <ul className='Value'>
                            {getGearList(job.gear)}
                          </ul>
                        ) : (
                          <p className='Value'>-</p>
                        )}
                      </div>
                      <div className='Field'>
                        <p className='Label'>Cards</p>
                        {Object.keys(job.cards).length ? (
                          <ul className='Value'>
                            {getCardList(job.cards)}
                          </ul>
                        ) : (
                          <p className='Value'>-</p>
                        )}
                      </div>
                    </div>
                    <div className='Row'>
                      <div className='Field'>
                        <p className='Label'>Usbs</p>
                        {Object.keys(job.usbs).length ? (
                          <ul className='Value'>
                            {getUsbsList(job.usbs)}
                          </ul>
                        ) : (
                          <p className='Value'>-</p>
                        )}
                      </div>
                      <div className='Field'>
                        <p className='Label'>Hacks</p>
                        {job.hacks.length ? (
                          <ul className='Value'>
                            {getHacksList(job.hacks)}
                          </ul>
                        ) : (
                          <p className='Value'>-</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className='extra content'>
                  <button className="ui button positive hover-animation" onClick={() => handleCreateJob(job)}>
                    <p className='label contrast'>Create Job</p>
                    <p className='IconContainer contrast'><i className='add icon'></i></p>
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default Jobs;
