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
        <Header text='Jobs' decorated />
        <div className="JobsContainer">
          {[...jobs]
            .sort((a, b) => new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime())
            .map(job => (
              <JobCard job={job} />
            ))
          }
          <div
            className='AddJobCard ui link card attached'
            onClick={() => navigate('/jobs/editor/new')}
          >
            Start a Job
            <i className="add icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListing;