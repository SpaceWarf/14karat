import "./Jobs.scss";
import { Checklist, Job } from "../../state/jobs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Checkbox } from "semantic-ui-react";
import { updateActiveJob } from "../../utils/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

interface JobChecklistProps {
  job: Job;
}

function JobChecklist(props: JobChecklistProps) {
  const { user } = useAuth();
  const { gear, cards, usbs } = useSelector((state: RootState) => state.jobs);
  const [editing, setEditing] = useState<boolean>(false);

  const handleCheckGearItem = async (id: string, checked: boolean) => {
    setEditing(true);
    await updateActiveJob(props.job.id, {
      ...props.job,
      gearChecklist: {
        ...props.job.gearChecklist,
        [id]: {
          ...props.job.gearChecklist[id],
          checked,
        },
      }
    }, user);
    setEditing(false);
  }

  const getItemName = (id: string): string => {
    switch (id) {
      case "any-bank":
      case "all-bank":
        return 'Bank Cards';
      case "any-security":
        return 'Security Cards';
      case "any-humane":
        return 'Humane Cards';
      default:
        return [...gear, ...cards, ...usbs].find(item => item.id === id)?.name ?? '';
    }
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
              <p>{props.job.gearChecklist[id].quantity} {getItemName(id)}</p>
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
