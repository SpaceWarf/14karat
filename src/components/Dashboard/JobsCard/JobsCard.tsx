import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import './JobsCard.scss';
import { useNavigate } from 'react-router-dom';
import { Job } from '../../../state/jobs';
import { getRadioForJob } from '../../../redux/selectors/radios';

function JobsCard() {
  const navigate = useNavigate();
  const jobs = useSelector((state: RootState) => state.jobs.active);
  const profileInfo = useSelector((state: RootState) => state.profile.info);

  const getCrew = (job: Job): string[] => {
    return Object.keys(job.crew).reduce((crew: string[], role) => {
      return [...crew, ...job.crew[role]]
    }, [])
  }

  const getJobsMemberIsOn = (): Job[] => {
    return jobs.filter(job => getCrew(job).includes(profileInfo.id));
  }

  const getOtherJobs = (): Job[] => {
    return jobs.filter(job => !getCrew(job).includes(profileInfo.id));
  }

  return (
    <div className="JobsCard ui card attached external">
      <div className="content">
        <div className='header'>
          <p><i className='dollar alternate icon' /> Active Jobs</p>
          <button className="ui icon button" onClick={() => navigate('/jobs')}>
            <i className='external alternate icon' />
          </button>
        </div>
        <div className='JobsContainer'>

          <p className='JobSectionHeader'>Jobs you are on</p>
          {getJobsMemberIsOn().length === 0 && (
            <p>You are not on any jobs.</p>
          )}
          {getJobsMemberIsOn().map(job => (
            <JobListing job={job} />
          ))}
          {getOtherJobs().length === 0 && (
            <p>No other jobs to show...</p>
          )}
          <p className='JobSectionHeader'>Other jobs</p>
          {getOtherJobs().map(job => (
            <JobListing job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface JobListingProps {
  job: Job;
}

function JobListing(props: JobListingProps) {
  const radio = useSelector((state: RootState) => getRadioForJob(state, props.job.id));

  return (
    <div className='JobListing'>
      <p className='JobLabel'>{props.job.name} {props.job.index}</p>
      {radio && <p className='RadioLabel'><i className="microphone icon" />{radio.channel}</p>}
    </div>
  )
}

export default JobsCard;
