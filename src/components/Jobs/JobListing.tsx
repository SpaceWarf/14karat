import "./Jobs.scss";
import Header from "../Common/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import { Job } from "../../state/jobs";
import JobDetailsModal from "./JobDetailsModal";
import { useSearchParams } from "react-router-dom";
import CreateJobModal from "./CreateJobModal";

function JobListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const jobs = useSelector((state: RootState) => state.jobs.active);
  const [job, setJob] = useState<Job>();
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);

  useEffect(() => {
    if (!jobs.length) {
      return;
    }

    if (searchParams.has('view')) {
      const job = jobs.find(job => job.id === searchParams.get('view'));

      if (job) {
        setJob(job);
        setOpenViewModal(true);
      } else {
        setSearchParams({});
      }
    }
  }, [jobs, searchParams, setSearchParams]);

  const handleSelectJob = (job: Job) => {
    setSearchParams({ view: job.id });
  }

  return (
    <div className="JobListing">
      <div className="content">
        <Header text='Jobs' decorated />
        <div className="Actions"><CreateJobModal /></div>
        {openViewModal && job && (
          <JobDetailsModal
            job={job}
            open={openViewModal}
            onClose={() => { setSearchParams({}); setOpenViewModal(false); }}
          />
        )}
        {jobs.map(job => (
          <JobCard job={job} onSelect={handleSelectJob} />
        ))}
      </div>
    </div>
  );
}

export default JobListing;