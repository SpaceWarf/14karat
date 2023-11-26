import { useSelector } from "react-redux";
import { getRadioForJob } from "../../../redux/selectors/radios";
import { RootState } from "../../../redux/store";
import { Job } from "../../../state/jobs";
import { useState, useEffect } from "react";
import { ProfileInfo } from "../../../state/profile";
import { DatabaseTable, getItems, onItemsSnapshot } from "../../../utils/firestore";

interface JobListingProps {
  job: Job;
  myJob?: boolean;
}

function JobListing(props: JobListingProps) {
  const radio = useSelector((state: RootState) => getRadioForJob(state, props.job.id));
  const [members, setMembers] = useState([] as ProfileInfo[]);

  useEffect(() => {
    const fetchProfiles = async () => {
      setMembers(await getItems<ProfileInfo>(DatabaseTable.PROFILES));
      onItemsSnapshot<ProfileInfo>(DatabaseTable.PROFILES, profiles => setMembers(profiles));
    }
    fetchProfiles();
  }, []);

  const getAllMembers = (): string[] => {
    const ids = Object.values(props.job.crew)
      .reduce((arr, members) => [...arr, ...members], [])
      .filter(member => member);
    return [...new Set(ids)].map(id => {
      const profile = members.find(member => member.id === id);
      const customMember = props.job.customCrew?.find(customMember => customMember.id === id);

      if (profile) {
        return profile.name;
      } else if (customMember) {
        return customMember.name;
      }
      return id;
    });
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
