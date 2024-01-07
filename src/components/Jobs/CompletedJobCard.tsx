import "./Jobs.scss";
import { CrewRoleMap, Job, JobUpdate } from "../../state/jobs";
import { DatabaseTable, deleteItem, getItems, onItemsSnapshot, updateItem } from "../../utils/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { ProfileInfo } from "../../state/profile";
import { getDateTimeString } from "../../utils/time";
import { getAllLootUrlsForJob } from "../../utils/storage";
import ConfirmationModal from "../Common/ConfirmationModal";

interface JobCardProps {
  job: Job;
}

function CompletedJobCard(props: JobCardProps) {
  const { user } = useAuth();
  const [members, setMembers] = useState([] as ProfileInfo[]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loot, setLoot] = useState<string[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      setMembers(await getItems<ProfileInfo>(DatabaseTable.PROFILES));
      onItemsSnapshot<ProfileInfo>(DatabaseTable.PROFILES, profiles => setMembers(profiles));
      setLoading(false);
    }
    fetchProfiles();
  }, []);

  useEffect(() => {
    const fetchLoot = async () => {
      setLoot(await getAllLootUrlsForJob(props.job.id));
    }
    fetchLoot();
  }, [props.job]);

  const handleDelete = async () => {
    deleteItem(DatabaseTable.JOBS, props.job.id, user);
  }

  const getCrew = () => {
    return Object.keys(props.job.crew)
      .sort((a, b) => a.localeCompare(b))
      .map((role) => (
        <div className="CrewRole">
          <div className="ListHeader">
            <h4>{CrewRoleMap[role]}</h4>
          </div>
          <p>
            {props.job.crew[role].map(member => {
              const profile = getProfileInfo(member);
              const customMember = props.job.customCrew?.find(customMember => customMember.id === member);

              if (profile) {
                return profile.name;
              } else if (customMember) {
                return customMember.name;
              }
              return member;
            }).filter(member => member).join(', ')}
          </p>
        </div>
      ))
  }

  const getProfileInfo = (id: string): ProfileInfo | undefined => {
    return members.find(member => member.id === id);
  }

  const handleUncompleteJob = async () => {
    setLoading(true);
    await updateItem<JobUpdate>(
      DatabaseTable.JOBS,
      props.job.id,
      {
        ...props.job,
        completed: false,
      },
      user
    );
    setLoading(false);
  }

  return (
    <div className='CompletedJobCard ui card attached external'>
      <div className="content">
        <div className='header'>
          <p><i className={`${props.job.icon} icon`} /> {props.job.name} {props.job.index}</p>
          <div className="Actions">
            <ConfirmationModal
              title='Confirm Delete Job'
              content={
                <>
                  <p>You are about to delete the following compelted job: <b>{props.job.name} {props.job.index}</b>. <b>This cannot be undone.</b></p>
                  <p>Are you sure you want to proceed?</p>
                </>
              }
              trigger={
                <button className="ui icon negative button" disabled={loading}>
                  <i className="trash icon" />
                </button>
              }
              onConfirm={handleDelete}
            />
          </div>
        </div>
        <div className="Details">
          <div className="Section">
            <div className='JobCrew'>
              <div className='header'>
                <p><i className='group icon' /> Crew</p>
              </div>
              <p className="CrewRoles">
                {getCrew()}
              </p>
            </div>
          </div>
          <div className="Section">
            <div className='JobCompletedData'>
              <div className='header'>
                <p><i className='clock icon' /> Finished On</p>
              </div>
              <p>{getDateTimeString((new Date(props.job.updatedAt || '')))}</p>
            </div>
          </div>
          <div className="Section">
            <div className='JobLoot'>
              <div className='header'>
                <p><i className='dollar icon' /> Loot</p>
              </div>
              <div className="LootContainer">
                {loot.length === 0 && (
                  <p>No loot to show...</p>
                )}
                {loot.map((url, i) => (
                  <div key={`loot-${props.job.id}-${i}`} className="Thumbnail" onClick={() => window.open(url, "_blank")}>
                    <img src={url} alt={`Loot ${props.job.name} ${i}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="extra content">
        <button className="ui button positive hover-animation" disabled={loading} onClick={handleUncompleteJob}>
          <p className='label contrast'>Revert Finish Job</p>
          <p className='IconContainer contrast'><i className='reply icon'></i></p>
        </button>
      </div>
    </div>
  );
}

export default CompletedJobCard;