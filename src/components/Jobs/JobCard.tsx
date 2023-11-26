import "./Jobs.scss";
import { CrewRoleMap, Job, JobUpdate } from "../../state/jobs";
import { DatabaseTable, deleteItem, getItemById, getItems, onItemsSnapshot, updateItem } from "../../utils/firestore";
import JobChecklist from "./JobChecklist";
import { useAuth } from "../../contexts/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import JobCrew from "./JobCrew";
import { useState, useEffect } from "react";
import { Webhook } from "../../state/webhook";
import { triggerDiscordWebhook } from "../../services/functions";
import { ProfileInfo } from "../../state/profile";
import JobRadio from "./JobRadio";
import { getRadioForJob } from "../../redux/selectors/radios";

interface JobCardProps {
  job: Job;
}

function JobCard(props: JobCardProps) {
  const { user, access } = useAuth();
  const [jobWebhook, setJobWebhook] = useState<Webhook>();
  const [radioWebhook, setRadioWebhook] = useState<Webhook>();
  const [members, setMembers] = useState([] as ProfileInfo[]);
  const [loading, setLoading] = useState<boolean>(false);
  const radio = useSelector((state: RootState) => getRadioForJob(state, props.job.id));

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
    const fetchWebhooks = async () => {
      setJobWebhook(await getItemById<Webhook>(DatabaseTable.WEBHOOK, 'job-update'));
      setRadioWebhook(await getItemById<Webhook>(DatabaseTable.WEBHOOK, 'radio-update'));
    }

    fetchWebhooks();
  }, []);

  const handleDelete = async () => {
    deleteItem(DatabaseTable.JOBS, props.job.id, user);

    if (radio) {
      await deleteItem(DatabaseTable.RADIOS, radio.id, user);
    }
  }

  const handleComplete = async () => {
    await updateItem<JobUpdate>(
      DatabaseTable.JOBS,
      props.job.id,
      {
        ...props.job,
        completed: true,
      },
      user
    );

    if (radio) {
      await deleteItem(DatabaseTable.RADIOS, radio.id, user);
    }
  }

  const sendWebhook = () => {
    if (jobWebhook) {
      triggerDiscordWebhook({
        url: jobWebhook.url,
        content: `**__${props.job.name} ${props.job.index} job details__**\n${getCrewAsString()}\n${getRadioString()}`,
      }).catch(error => {
        console.error(error);
      });
    }

    if (radioWebhook && radio) {
      triggerDiscordWebhook({
        url: radioWebhook.url,
        content: `${getMembersAsString()} ${props.job.name} ${props.job.index} radio channel - **${radio.channel}**`,
      }).catch(error => {
        console.error(error);
      });
    }
  }

  const getMembersAsString = (): string => {
    const tags = Object.values(props.job.crew)
      .reduce((tags, roleMembers) => {
        const newTags = roleMembers
          .filter(member => getProfileInfo(member))
          .map(member => `<@${getProfileInfo(member)?.discord}>`);
        return [...tags, ...newTags];
      }, []);
    return [...new Set(tags)].join(", ");
  }

  const getCrewAsString = () => {
    return Object.keys(props.job.crew)
      .sort((a, b) => a.localeCompare(b))
      .reduce((str, role) => {
        const members = props.job.crew[role]
          .map(member => {
            const profile = getProfileInfo(member);
            const customMember = props.job.customCrew?.find(customMember => customMember.id === member);

            if (profile) {
              return `<@${getProfileInfo(member)?.discord}>`;
            } else if (customMember) {
              return customMember.name;
            }
            return member;
          })
          .filter(member => member)
          .join(", ");
        return `${str}**${CrewRoleMap[role]}**: ${members}\n`
      }, "");
  }

  const getRadioString = () => {
    return radio ? `**Radio Channel:** ${radio.channel}` : ""
  }

  const getProfileInfo = (id: string): ProfileInfo | undefined => {
    return members.find(member => member.id === id);
  }

  return (
    <div className='JobCard ui card attached external'>
      <div className="content">
        <div className='header'>
          <p><i className={`${props.job.icon} icon`} /> {props.job.name} {props.job.index}</p>
          {access.headAccess && (
            <div className="Actions">
              <button className="ui icon negative button" onClick={handleDelete}>
                <i className="trash icon" />
              </button>
            </div>
          )}
        </div>
        <div className="Details">
          <div className="Section">
            <JobCrew
              job={props.job}
              members={members}
              loading={loading}
            />
          </div>
          <div className="seperator" />
          <div className="Section">
            <JobChecklist job={props.job} />
            <JobRadio job={props.job} />
          </div>
        </div>
      </div>
      <div className="extra content">
        <button className="ui button hover-animation" onClick={sendWebhook}>
          <p className='label pale'>Send Notification</p>
          <p className='IconContainer pale'><i className='discord icon'></i></p>
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