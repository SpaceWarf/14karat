import { useEffect, useState } from "react";
import { Job } from "../../state/jobs";
import Dropdown, { DropdownOption } from "../Common/Dropdown";
import { getProfiles, onProfilesSnapshot, updateActiveJob } from "../../utils/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { ProfileInfo } from "../../state/profile";

interface JobCrewProps {
  job: Job;
}

function JobCrew(props: JobCrewProps) {
  const { user } = useAuth();
  const [members, setMembers] = useState([] as ProfileInfo[]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      const profiles = await getProfiles();
      setMembers(profiles);
      onProfilesSnapshot((profiles: ProfileInfo[]) => setMembers(profiles));
      setLoading(false);
    }
    fetchProfiles();
  }, []);

  const getMemberDropdownOptions = (role: string): DropdownOption[] => {
    return [
      ...members
        .filter(member => member.roles.includes(role))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(member => ({
          key: member.id,
          text: member.name,
          value: member.id,
          description: role,
        })),
      ...members
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

  const getRoleName = (role: string): string => {
    switch (role) {
      case "hacker":
        return "Hackers";
      case "driver":
        return "Drivers";
      case "hostages":
        return "Hostages";
      default:
        return "Other";
    }
  }

  return (
    <div className='JobCrew'>
      <div className='header'>
        <p><i className='group icon' /> Crew</p>
      </div>
      {Object.keys(props.job.crew).map((role) => (
        <>
          <div className="ListHeader">
            <h4>{getRoleName(role)}</h4>
          </div>
          <div className="CrewSelector">
            {props.job.crew[role].map((member, i) => (
              <Dropdown
                key={`${member}-${i}`}
                placeholder="Empty Spot"
                disabled={loading || editing}
                options={getMemberDropdownOptions(role)}
                value={member}
                onChange={value => handleUpdateMember(role, value, i)}
                clearable
                noLabel
              />
            ))}
          </div>
        </>
      ))}
    </div>
  )
}

export default JobCrew