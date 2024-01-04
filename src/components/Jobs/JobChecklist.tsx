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
    </div>
  );
}

export default JobChecklist;
