import "./Jobs.scss";
import Header from "../Common/Header";
import { useNavigate } from "react-router-dom";
import CompletedJobCard from "./CompletedJobCard";
import { useSelector } from "react-redux";
import { getCompletedJobs } from "../../redux/selectors/jobs";

function CompletedJobListing() {
  const navigate = useNavigate();
  const jobs = useSelector(getCompletedJobs);

  return (
    <div className="CompletedJobListing">
      <div className="content">
        <Header text='Completed Jobs' decorated />
        <div className="Actions">
          <p className="hyperlink-button" onClick={() => navigate('/jobs')}><i className='arrow left icon' /> back</p>
        </div>
        <div className="JobsContainer">
          {jobs.length > 0 ? (
            [...jobs]
              .sort((a, b) => new Date(b.updatedAt || '').getTime() - new Date(a.updatedAt || '').getTime())
              .map(job => (
                <CompletedJobCard job={job} />
              ))
          ) : (
            <p>No completed jobs to show...</p>
          )
          }
        </div>
      </div>
    </div>
  );
}

export default CompletedJobListing;