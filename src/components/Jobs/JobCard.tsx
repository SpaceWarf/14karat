import "./Jobs.scss";
import { Job, JobInfo } from "../../state/jobs";
import { useEffect, useState } from "react";
import { getJobInfoById } from "../../utils/firestore";
import Loading from "../Common/Loading";

interface JobCardProps {
  job: Job;
  onSelect: (job: Job) => void;
}

function JobCard(props: JobCardProps) {
  const [jobInfo, setJobInfo] = useState<JobInfo>();

  useEffect(() => {
    const fetchJobInfo = async () => {
      setJobInfo(await getJobInfoById(props.job.job));
    }

    if (props.job) {
      fetchJobInfo();
    }
  }, [props.job]);

  return (
    <div
      className='JobCard ui link card attached'
      onClick={() => props.onSelect(props.job)}
    >
      <div className="content">
        {jobInfo ? (
          <>
            <div className="header">
              {jobInfo.name}
            </div>
            <div className="Details">
              {/* roles */}
              {/* checklist */}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default JobCard;