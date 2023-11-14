import { useSelector } from "react-redux";
import { getRadioForJob } from "../../../redux/selectors/radios";
import { RootState } from "../../../redux/store";
import { Job } from "../../../state/jobs";
import { useState, useEffect } from "react";
import { ProfileInfo } from "../../../state/profile";
import { getProfiles, onProfilesSnapshot } from "../../../utils/firestore";

interface JobListingProps {
  job: Job;
  myJob?: boolean;
}

function JobListing(props: JobListingProps) {
  const radio = useSelector((state: RootState) => getRadioForJob(state, props.job.id));
  const [members, setMembers] = useState([] as ProfileInfo[]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const profiles = await getProfiles();
      setMembers(profiles);
      onProfilesSnapshot((profiles: ProfileInfo[]) => setMembers(profiles));
    }
    fetchProfiles();
  }, []);

  const getAllMembers = (): string[] => {
    const ids = Object.values(props.job.crew)
      .reduce((arr, members) => [...arr, ...members], [])
      .filter(member => member);
    return [...new Set(ids)].map(id => members.find(member => member.id === id)?.name ?? id);
  }

  return (
    <div className='JobListing'>
      <div className="header">
        <p className='JobLabel'>{props.job.name} {props.job.index} {props.myJob && <i className="star icon" />}</p>
        {radio && <p className='RadioLabel'><i className="microphone icon" />{radio.channel}</p>}
      </div>
      <div className="Crew">
        {getAllMembers().map(member => (
          <p>{member}</p>
        ))}
      </div>
    </div>
  )
}

export default JobListing;
