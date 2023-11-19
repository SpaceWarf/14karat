import './Jobs.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Common/Header';
import { useEffect, useState } from 'react';
import { JobInfo } from '../../../state/jobs';
import { DatabaseTable, getItems } from '../../../utils/firestore';
import JobInfoCard from '../../Jobs/JobInfoCard';

function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobInfo[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      setJobs(await getItems<JobInfo>(DatabaseTable.JOB_INFO));
    }
    fetchJobs();
  }, []);

  return (
    <div className="Jobs">
      <Header text='Job Information' decorated />
      <div className='content'>
        <div className="actions">
          <p className="hyperlink-button" onClick={() => navigate('/information-center')}><i className='arrow left icon' /> back</p>
        </div>
        <div className='JobContainer'>
          {[...jobs].sort((a, b) => a.order - b.order).map(job => (
            <JobInfoCard info={job} showActionButton />
          ))}
        </div>
      </div>
    </div>
  );
}


export default Jobs;
