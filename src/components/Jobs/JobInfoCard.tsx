import "./Jobs.scss";
import { JobInfo } from "../../state/jobs";
import { ReactElement } from "react";
import { currencyFormat } from "../../utils/currency";
import { createActiveJob } from "../../utils/firestore";
import { useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

interface JobInfoCardProps {
  info: JobInfo;
  showActionButton?: boolean;
}

function JobInfoCard(props: JobInfoCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const gear = useSelector((state: RootState) => state.jobs.gear);
  const cards = useSelector((state: RootState) => state.jobs.cards);
  const usbs = useSelector((state: RootState) => state.jobs.usbs);
  const { hacks } = useSelector((state: RootState) => state.hacks);
  const { active } = useSelector((state: RootState) => state.jobs);

  const getGearList = (gearMap: { [key: string]: number }): ReactElement[] => {
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

  const getCardList = (cardMap: { [key: string]: number }): ReactElement[] => {
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

  const getUsbsList = (usbMap: { [key: string]: number }): ReactElement[] => {
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

  const handleCreateJob = async (actionButton: boolean) => {
    if (actionButton || !props.showActionButton) {
      const indexes = active
        .filter(job => job.job === props.info.id)
        .map(job => job.index);

      await createActiveJob({
        job: props.info.id,
        crew: Object.keys(props.info.crew).reduce((obj, key) => ({
          ...obj,
          [key]: new Array(props.info.crew[key]).fill("")
        }), {}),
        gearChecklist: Object.keys(props.info.gear).reduce((obj, key) => ({
          ...obj,
          [key]: {
            checked: false,
            quantity: props.info.gear[key]
          },
        }), {}),
        cardsChecklist: Object.keys(props.info.cards).reduce((obj, key) => ({
          ...obj,
          [key]: {
            checked: false,
            quantity: props.info.cards[key]
          },
        }), {}),
        usbsChecklist: Object.keys(props.info.usbs).reduce((obj, key) => ({
          ...obj,
          [key]: {
            checked: false,
            quantity: props.info.usbs[key]
          },
        }), {}),
        notes: '',
        completed: false,
        name: props.info.name,
        index: indexes.length ? Math.max(...indexes) + 1 : 1,
        icon: props.info.icon,
      }, user);
      navigate("/jobs");
    }
  }

  return (
    <div
      className={`JobInfoCard ui card attached external ${props.info.colour} ${props.showActionButton ? '' : 'link'}`}
      onClick={() => handleCreateJob(false)}
    >
      <div className="content">
        <div className="header">
          <p><i className={`${props.info.icon} icon`} /> {props.info.name}</p>
          <p>{isNaN(props.info.payout) ? props.info.payout : `~${currencyFormat(props.info.payout)}`}</p>
        </div>
        <div className="Details ui form">
          <div className='Row'>
            <div className='Field'>
              <p className='Label'>Crew Size</p>
              <p className='Value'>
                {props.info.squadMin === props.info.squadMax ? props.info.squadMin : `${props.info.squadMin} - ${props.info.squadMax}`}
              </p>
            </div>
            <div className='Field'>
              <p className='Label'>Hostages</p>
              <p className='Value'>{props.info.hostages ? `At least ${props.info.hostages}` : "None"}</p>
            </div>
          </div>
          <div className='Row'>
            <div className='Field'>
              <p className='Label'>Gear</p>
              {Object.keys(props.info.gear).length ? (
                <ul className='Value'>
                  {getGearList(props.info.gear)}
                </ul>
              ) : (
                <p className='Value'>-</p>
              )}
            </div>
            <div className='Field'>
              <p className='Label'>Hacks</p>
              {props.info.hacks.length ? (
                <ul className='Value'>
                  {getHacksList(props.info.hacks)}
                </ul>
              ) : (
                <p className='Value'>-</p>
              )}
            </div>
          </div>
          <div className='Row'>
            <div className='Field'>
              <p className='Label'>Cards</p>
              {Object.keys(props.info.cards).length ? (
                <ul className='Value'>
                  {getCardList(props.info.cards)}
                </ul>
              ) : (
                <p className='Value'>-</p>
              )}
            </div>
            <div className='Field'>
              <p className='Label'>Usbs</p>
              {Object.keys(props.info.usbs).length ? (
                <ul className='Value'>
                  {getUsbsList(props.info.usbs)}
                </ul>
              ) : (
                <p className='Value'>-</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {props.showActionButton && (
        <div className='extra content'>
          <button className="ui button hover-animation" disabled>
            <p className='label'>View Guide - TODO</p>
            <p className='IconContainer'><i className='eye icon'></i></p>
          </button>
        </div>
      )}
    </div>
  );
}

export default JobInfoCard;