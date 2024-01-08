import "./Jobs.scss";
import { Checklist, Job, JobUpdate } from "../../state/jobs";
import { Checkbox } from "semantic-ui-react";
import { DatabaseTable, updateItem } from "../../utils/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import GearListItem from "./GearListItem";

interface JobChecklistProps {
  job: Job;
}

function JobChecklist(props: JobChecklistProps) {
  const { user } = useAuth();
  const [editing, setEditing] = useState<boolean>(false);

  const handleCheckGearItem = async (id: string, checked: boolean) => {
    setEditing(true);
    await updateItem<JobUpdate>(
      DatabaseTable.JOBS,
      props.job.id,
      {
        ...props.job,
        gearChecklist: {
          ...props.job.gearChecklist,
          [id]: {
            ...props.job.gearChecklist[id],
            checked,
          },
        }
      },
      user
    );
    setEditing(false);
  }

  const handleCheckCardItem = async (id: string, checked: boolean) => {
    setEditing(true);
    await updateItem<JobUpdate>(
      DatabaseTable.JOBS,
      props.job.id,
      {
        ...props.job,
        cardsChecklist: {
          ...props.job.cardsChecklist,
          [id]: {
            ...props.job.cardsChecklist[id],
            checked,
          },
        }
      },
      user
    );
    setEditing(false);
  }

  const handleCheckUsbItem = async (id: string, checked: boolean) => {
    setEditing(true);
    await updateItem<JobUpdate>(
      DatabaseTable.JOBS,
      props.job.id,
      {
        ...props.job,
        usbsChecklist: {
          ...props.job.usbsChecklist,
          [id]: {
            ...props.job.usbsChecklist[id],
            checked,
          },
        }
      },
      user
    );
    setEditing(false);
  }

  const isAllChecked = (list: Checklist) => {
    return Object.values(list).every(value => value.checked);
  }

  return (
    <div className='JobChecklist'>
      <div className='header'>
        <p><i className='list icon' /> Checklist</p>
      </div>
      {Object.keys(props.job.gearChecklist).length > 0 && (
        <>
          <div className="ListHeader">
            <h4>Gear</h4>
            {isAllChecked(props.job.gearChecklist) && <i className='check icon' />}
          </div>
          {Object.keys(props.job.gearChecklist).sort((a, b) => a.localeCompare(b)).map(id => (
            <div className={`CheckLine ${props.job.gearChecklist[id].checked ? 'checked' : ''}`}>
              <GearListItem id={id} quantity={props.job.gearChecklist[id].quantity} />
              <Checkbox
                checked={props.job.gearChecklist[id].checked}
                disabled={editing}
                onChange={() => handleCheckGearItem(id, !props.job.gearChecklist[id].checked)}
              />
            </div>
          ))}
        </>
      )}
      {Object.keys(props.job.cardsChecklist).length > 0 && (
        <>
          <div className="ListHeader">
            <h4>Cards</h4>
            {isAllChecked(props.job.cardsChecklist) && <i className='check icon' />}
          </div>
          {Object.keys(props.job.cardsChecklist).map(id => (
            <div className={`CheckLine ${props.job.cardsChecklist[id].checked ? 'checked' : ''}`}>
              <GearListItem id={id} quantity={props.job.cardsChecklist[id].quantity} />
              <Checkbox
                checked={props.job.cardsChecklist[id].checked}
                disabled={editing}
                onChange={() => handleCheckCardItem(id, !props.job.cardsChecklist[id].checked)}
              />
            </div>
          ))}
        </>
      )}
      {Object.keys(props.job.usbsChecklist).length > 0 && (
        <>
          <div className="ListHeader">
            <h4>Usbs</h4>
            {isAllChecked(props.job.usbsChecklist) && <i className='check icon' />}
          </div>
          {Object.keys(props.job.usbsChecklist).map(id => (
            <div className={`CheckLine ${props.job.usbsChecklist[id].checked ? 'checked' : ''}`}>
              <GearListItem id={id} quantity={props.job.usbsChecklist[id].quantity} />
              <Checkbox
                checked={props.job.usbsChecklist[id].checked}
                disabled={editing}
                onChange={() => handleCheckUsbItem(id, !props.job.usbsChecklist[id].checked)}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default JobChecklist;
