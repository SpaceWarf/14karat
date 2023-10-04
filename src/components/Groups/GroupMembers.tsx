import "./Groups.scss";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function GroupMembers() {
  const { id } = useParams();
  const { user } = useAuth();

  return (
    <div className="GroupMembers">
      TODO
    </div>
  );
}


export default GroupMembers;