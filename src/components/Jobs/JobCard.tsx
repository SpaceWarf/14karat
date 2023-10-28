import "./Jobs.scss";
import { Job } from "../../state/jobs";
import { deleteActiveJob, updateActiveJob } from "../../utils/firestore";
import JobChecklistCard from "./JobChecklist";
import { useAuth } from "../../contexts/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import JobCrew from "./JobCrew";

interface JobCardProps {
  job: Job;
}

function JobCard(props: JobCardProps) {
  const { user, isAdmin } = useAuth();
  const jobInfos = useSelector((state: RootState) => state.jobs.info)

  const handleDelete = () => {
    deleteActiveJob(props.job.id, user);
  }

  const handleComplete = () => {
    updateActiveJob(props.job.id, {
      ...props.job,
      completed: true,
    }, user);
  }

  const handleSendDiscordNotification = () => {
    console.log("discord notification")
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
          <JobCrew job={props.job} />
          <div className="seperator" />
          <JobChecklistCard job={props.job} />
        </div>
      </div>
      <div className="extra content">
        <button className="ui button hover-animation" onClick={handleSendDiscordNotification}>
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