import "./Jobs.scss";
import Header from "../Common/Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import JobInfoCard from "./JobInfoCard";

function JobPicker() {
  const navigate = useNavigate();
  const jobInfos = useSelector((state: RootState) => state.jobs.info);

  return (
    <div className='JobPicker'>
      <div className="content">
        <div className="NewJob">
          <Header text='Create New Job' decorated />
          <div className="content">
            <div className="actions">
              <p className="back-button" onClick={() => navigate('/jobs')}><i className='arrow left icon' /> back</p>
            </div>
            <div className="JobInfoContainer">
              {[...jobInfos].sort((a, b) => a.order - b.order).map(info => (
                <JobInfoCard info={info} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default JobPicker;