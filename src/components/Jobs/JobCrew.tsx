import { useState } from "react";
import { CrewRoleMap, Job } from "../../state/jobs";
import Dropdown, { DropdownOption } from "../Common/Dropdown";
import { updateActiveJob } from "../../utils/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { ProfileInfo } from "../../state/profile";

interface JobCrewProps {
  job: Job;
  members: ProfileInfo[];
  loading: boolean;
}

function JobCrew(props: JobCrewProps) {
  const { user } = useAuth();
  const [editing, setEditing] = useState<boolean>(false);

  const getMemberDropdownOptions = (role: string): DropdownOption[] => {
    return [
      ...props.members
        .filter(member => member.roles.includes(role))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(member => ({
          key: member.id,
          text: member.name,
          value: member.id,
          description: role,
        })),
      ...props.members
        .filter(member => !member.roles.includes(role))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(member => ({
          key: member.id,
          text: member.name,
          value: member.id,
        })),
    ]
  }

  const handleUpdateMember = async (role: string, member: string, index: number) => {
    setEditing(true);
    const update = [...props.job.crew[role]]
    update[index] = member
    await updateActiveJob(props.job.id, {
      ...props.job,
      crew: {
        ...props.job.crew,
        [role]: update
      }
    }, user);
    setEditing(false);
  }

  return (
    <div className='JobCrew'>
      <div className='header'>
        <p><i className='group icon' /> Crew</p>
      </div>
      <div className="CrewRoles">
        {Object.keys(props.job.crew)
          .sort((a, b) => a.localeCompare(b))
          .map((role) => (
            <div className="CrewRole">
              <div className="ListHeader">
                <h4>{CrewRoleMap[role]}</h4>
              </div>
              <div className="CrewSelector">
                {props.job.crew[role].map((member, i) => (
                  <Dropdown
                    key={`${member}-${i}`}
                    placeholder="Empty Spot"
                    disabled={props.loading || editing}
                    options={getMemberDropdownOptions(role)}
                    value={member}
                    onChange={value => handleUpdateMember(role, value, i)}
                    clearable
                    noLabel
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default JobCrew