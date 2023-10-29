import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import './JobsCard.scss';
import { useNavigate } from 'react-router-dom';
import { Job } from '../../../state/jobs';
import { getRadioForJob } from '../../../redux/selectors/radios';
import JobListing from './JobListing';

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

  return (
    <div className="JobsCard ui card attached external">
      <div className="content">
        <div className='header'>
          <p><i className='dollar alternate icon' /> My Jobs</p>
          <button className="ui icon button" onClick={() => navigate('/jobs')}>
            <i className='external alternate icon' />
          </button>
        </div>
        <div className='JobsContainer'>
          {getJobsMemberIsOn().length === 0 && (
            <p className='NoJobsLabel'>You are not on any jobs.</p>
          )}
          {getJobsMemberIsOn().map(job => (
            <JobListing job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobsCard;
