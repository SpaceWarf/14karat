import { useSelector } from "react-redux";
import { getRadioForJob } from "../../../redux/selectors/radios";
import { RootState } from "../../../redux/store";
import { Job } from "../../../state/jobs";

interface JobListingProps {
  job: Job;
}

function JobListing(props: JobListingProps) {
  const radio = useSelector((state: RootState) => getRadioForJob(state, props.job.id));

  return (
    <div className='JobListing'>
      <div className="header">
        <p className='JobLabel'>{props.job.name} {props.job.index}</p>
        {radio && <p className='RadioLabel'><i className="microphone icon" />{radio.channel}</p>}
      </div>
    </div>
  )
}

export default JobListing;
