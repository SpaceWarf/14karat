import "./Jobs.scss";
import Header from "../Common/Header";
import { useNavigate } from "react-router-dom";

function JobEditor() {
  const navigate = useNavigate();

  return (
    <div className='JobEditor'>
      <div className="content">
        <Header text='Job Editor' decorated />
      </div>
    </div>
  );
}

export default JobEditor;