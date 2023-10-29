import "./Jobs.scss";
import Header from "../Common/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";

function JobListing() {
  const navigate = useNavigate();
  const jobs = useSelector((state: RootState) => state.jobs.active);

  return (
    <div className="JobListing">
      <div className="content">
        <Header text='Active Jobs' decorated />
        <div className="Actions">
          <button className="ui button hover-animation" onClick={() => navigate('/information-center/jobs')}>
            <p className='label pale'>View job info</p>
            <p className='IconContainer pale'><i className='info circle icon'></i></p>
          </button>
          <button className="ui button positive hover-animation" onClick={() => navigate('/jobs/new')}>
            <p className='label contrast'>Create a job</p>
            <p className='IconContainer contrast'><i className='add icon'></i></p>
          </button>
        </div>
        <div className="JobsContainer">
          {jobs.length > 0 ? (
            [...jobs]
              .sort((a, b) => new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime())
              .map(job => (
                <JobCard job={job} />
              ))
          ) : (
            <p>No active jobs to show...</p>
          )
          }
        </div>
      </div>
    </div>
  );
}

export default JobListing;