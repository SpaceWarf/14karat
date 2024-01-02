import "./Jobs.scss";
import Header from "../Common/Header";
import { useNavigate } from "react-router-dom";
import CompletedJobCard from "./CompletedJobCard";
import { useSelector } from "react-redux";
import { getCompletedJobs } from "../../redux/selectors/jobs";
import { Pagination } from "semantic-ui-react";
import { useState } from "react";

function CompletedJobListing() {
  const navigate = useNavigate();
  const jobs = useSelector(getCompletedJobs);
  const [activePage, setActivePage] = useState<number>(0);
  const PAGE_SIZE = 6;

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
              .slice(activePage * PAGE_SIZE, (activePage * PAGE_SIZE) + PAGE_SIZE)
              .sort((a, b) => new Date(b.updatedAt || '').getTime() - new Date(a.updatedAt || '').getTime())
              .map(job => (
                <CompletedJobCard job={job} />
              ))
          ) : (
            <p>No completed jobs to show...</p>
          )
          }
        </div>
        <div className="pagination">
          <Pagination
            activePage={activePage + 1}
            onPageChange={(_, { activePage }) => setActivePage(Number(activePage) - 1)}
            totalPages={Math.ceil(jobs.length / PAGE_SIZE)}
          />
        </div>
      </div>
    </div>
  );
}

export default CompletedJobListing;