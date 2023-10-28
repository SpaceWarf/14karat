import "./Jobs.scss";
import { CrewRoleMap, Job } from "../../state/jobs";
import { deleteActiveJob, getProfiles, getWebhookById, onProfilesSnapshot, updateActiveJob } from "../../utils/firestore";
import JobChecklistCard from "./JobChecklist";
import { useAuth } from "../../contexts/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import JobCrew from "./JobCrew";
import { useState, useEffect } from "react";
import { Webhook } from "../../state/webhook";
import { triggerDiscordWebhook } from "../../services/functions";
import { ProfileInfo } from "../../state/profile";

interface JobCardProps {
  job: Job;
}

function JobCard(props: JobCardProps) {
  const { user, isAdmin } = useAuth();
  const jobInfos = useSelector((state: RootState) => state.jobs.info)
  const [webhook, setWebhook] = useState<Webhook>();
  const [members, setMembers] = useState([] as ProfileInfo[]);
  const [loading, setLoading] = useState<boolean>(false);

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

  useEffect(() => {
    const fetchWebhook = async () => {
      setWebhook(await getWebhookById('job-update'));
    }

    fetchWebhook();
  }, [isAdmin]);

  const handleDelete = () => {
    deleteActiveJob(props.job.id, user);
  }

  const handleComplete = () => {
    updateActiveJob(props.job.id, {
      ...props.job,
      completed: true,
    }, user);
  }

  const sendWebhook = () => {
    if (webhook) {
      triggerDiscordWebhook({
        url: webhook.url,
        content: `**__${getJobInfo()?.name} job details__**\n${getCrewAsString()}`,
      }).catch(error => {
        console.error(error);
      });
    }
  }

  const getCrewAsString = () => {
    return Object.keys(props.job.crew)
      .sort((a, b) => a.localeCompare(b))
      .reduce((str, role) => {
        const members = props.job.crew[role]
          .filter(member => getProfileInfo(member))
          .map(member => `<@${getProfileInfo(member)?.discord}>`)
          .join(" ");
        return `${str}**${CrewRoleMap[role]}**: ${members}\n`
      }, "");
  }

  const getProfileInfo = (id: string): ProfileInfo | undefined => {
    return members.find(member => member.id === id);
  }

  const getJobInfo = () => {
    return jobInfos.find(info => info.id === props.job.job);
  }

  return (
    <div className='JobCard ui card attached external'>
      <div className="content">
        <div className='header'>
          <p><i className={`${getJobInfo()?.icon ?? 'dollar'} icon`} /> {getJobInfo()?.name ?? 'Job Info'}</p>
          {isAdmin && (
            <div className="Actions">
              <button className="ui icon negative button" onClick={handleDelete}>
                <i className="trash icon" />
              </button>
            </div>
          )}
        </div>
        <div className="Details">
          <JobCrew
            job={props.job}
            members={members}
            loading={loading}
          />
          <div className="seperator" />
          <JobChecklistCard job={props.job} />
        </div>
      </div>
      <div className="extra content">
        <button className="ui button hover-animation" onClick={sendWebhook}>
          <p className='label contrast'>Send Notification</p>
          <p className='IconContainer contrast'><i className='discord icon'></i></p>
        </button>
        <button className="ui button positive hover-animation" onClick={handleComplete}>
          <p className='label contrast'>Complete</p>
          <p className='IconContainer contrast'><i className='check icon'></i></p>
        </button>
      </div>
    </div>
  );
}

export default JobCard;