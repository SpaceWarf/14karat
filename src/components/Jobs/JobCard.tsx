import "./Jobs.scss";
import { CrewRoleMap, Job, JobInfo } from "../../state/jobs";
import { DatabaseTable, deleteItem, getItemById, getItems, onItemsSnapshot } from "../../utils/firestore";
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
import JobLootModal from "./JobLootModal";
import ConfirmationModal from "../Common/ConfirmationModal";

interface JobCardProps {
  job: Job;
}

function JobCard(props: JobCardProps) {
  const { user } = useAuth();
  const [jobWebhook, setJobWebhook] = useState<Webhook>();
  const [radioWebhook, setRadioWebhook] = useState<Webhook>();
  const [members, setMembers] = useState([] as ProfileInfo[]);
  const [loading, setLoading] = useState<boolean>(false);
  const [jobInfo, setJobInfo] = useState<JobInfo>();
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

  useEffect(() => {
    const fetchJobInfo = async () => {
      setJobInfo(await getItemById<JobInfo>(DatabaseTable.JOB_INFO, props.job.job));
    }

    fetchJobInfo();
  }, [props.job]);

  const handleDelete = async () => {
    deleteItem(DatabaseTable.JOBS, props.job.id, user);

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
              return `<@${profile.discord}>`;
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
          <div className="HeaderContent">
            <p><i className={`${props.job.icon} icon`} /> {props.job.name} {props.job.index}</p>
            {["vangelico", "fleeca"].includes(props.job.job) && (
              <p className="HeaderDetail hyperlink-button" onClick={() => window.open(`/information-center/jobs/${props.job.job}`, '_blank')}>view guide</p>
            )}
          </div>
          <div className="Actions">
            <ConfirmationModal
              title='Confirm Delete Job'
              content={
                <>
                  <p>You are about to delete the following active job: <b>{props.job.name} {props.job.index}</b>. <b>This cannot be undone.</b></p>
                  <p>Are you sure you want to proceed?</p>
                </>
              }
              trigger={
                <button className="ui icon negative button">
                  <i className="trash icon" />
                </button>
              }
              onConfirm={handleDelete}
            />
          </div>
        </div>
        <div className="Details">
          <div className="Section">
            <JobCrew
              job={props.job}
              jobInfo={jobInfo}
              members={members}
              loading={loading}
            />
          </div>
          <div className="seperator" />
          <div className="Section">
            <JobChecklist
              job={props.job}
              jobInfo={jobInfo}
            />
            <JobRadio job={props.job} />
          </div>
        </div>
      </div>
      <div className="extra content">
        <button className="ui button hover-animation" onClick={sendWebhook}>
          <p className='label pale'>Send Notification</p>
          <p className='IconContainer pale'><i className='discord icon'></i></p>
        </button>
        <JobLootModal job={props.job} radio={radio} />
      </div>
    </div>
  );
}

export default JobCard;