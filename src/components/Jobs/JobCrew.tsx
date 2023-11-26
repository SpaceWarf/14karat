import { useState } from "react";
import { CrewRoleMap, CustomMember, Job, JobUpdate } from "../../state/jobs";
import Dropdown, { DropdownOption } from "../Common/Dropdown";
import { DatabaseTable, updateItem } from "../../utils/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { ProfileInfo } from "../../state/profile";
import Input from "../Common/Input";
import { uniqueId } from "lodash";

interface JobCrewProps {
  job: Job;
  members: ProfileInfo[];
  loading: boolean;
}

function JobCrew(props: JobCrewProps) {
  const { user } = useAuth();
  const [editing, setEditing] = useState<boolean>(false);

  const getCustomCrew = (): CustomMember[] => {
    return props.job.customCrew ?? [];
  }

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
      ...getCustomCrew()
        .filter(member => member.name)
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
    await updateItem<JobUpdate>(
      DatabaseTable.JOBS,
      props.job.id,
      {
        ...props.job,
        crew: {
          ...props.job.crew,
          [role]: update
        }
      },
      user
    );
    setEditing(false);
  }

  const getUpdatedCrew = (customCrew: CustomMember[]) => {
    const updatedCrew: { [key: string]: string[] } = {};
    for (const [role, members] of Object.entries(props.job.crew)) {
      const updatedMembers: string[] = [];
      members.forEach(member => {
        if (
          [
            ...props.members.map(profile => profile.id),
            ...customCrew.map(member => member.id),
          ].includes(member)
        ) {
          updatedMembers.push(member);
        } else {
          updatedMembers.push("");
        }
      })
      updatedCrew[role] = updatedMembers;
    }
    return updatedCrew;
  }

  const handleCustomMemberChange = async (id: string, value: string) => {
    const index = getCustomCrew().findIndex(member => member.id === id);

    if (index !== -1) {
      const customCrew = [
        ...getCustomCrew().slice(0, index),
        { ...getCustomCrew()[index], name: value },
        ...getCustomCrew().slice(index + 1),
      ];
      await updateItem<JobUpdate>(
        DatabaseTable.JOBS,
        props.job.id,
        {
          ...props.job,
          crew: value ? props.job.crew : getUpdatedCrew(customCrew.filter(member => member.name)),
          customCrew,
        },
        user
      );
    }
  }

  const handleDeleteCustomMember = async (id: string) => {
    const index = getCustomCrew().findIndex(member => member.id === id);

    if (index !== -1) {
      const customCrew = [
        ...getCustomCrew().slice(0, index),
        ...getCustomCrew().slice(index + 1),
      ];
      await updateItem<JobUpdate>(
        DatabaseTable.JOBS,
        props.job.id,
        {
          ...props.job,
          crew: getUpdatedCrew(customCrew),
          customCrew,
        },
        user
      );
    }
  }

  const handleAddCustomMember = async () => {
    await updateItem<JobUpdate>(
      DatabaseTable.JOBS,
      props.job.id,
      {
        ...props.job,
        customCrew: [
          ...getCustomCrew(),
          { id: uniqueId("custom-crew-"), name: "" },
        ]
      },
      user
    );
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
      <div className="CustomMembers">
        <h4>Custom Crew</h4>
        <p className="Subheader pale">
          This section is used to add members that are unaffiliated with the gang. Once added, they will be available from the crew dropdowns.
        </p>
        <div className="CustomMemberSelector">
          <div className="ui form">
            {getCustomCrew().map(member => (
              <div className="InputContainer">
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  icon=""
                  value={member.name}
                  onChange={value => handleCustomMemberChange(member.id, value)}
                  disabled={props.loading}
                />
                <button className='ui icon button negative' onClick={() => handleDeleteCustomMember(member.id)}>
                  <i className='times icon' />
                </button>
              </div>
            ))}
            <button className="ui button positive hover-animation" onClick={handleAddCustomMember}>
              <p className='label contrast'>Add Member</p>
              <p className='IconContainer contrast'><i className='plus icon'></i></p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobCrew