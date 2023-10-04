import "./Groups.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Member } from "../../state/members";
import { getMembersForGroup } from "../../utils/firestore";
import Loading from "../Common/Loading";
import MemberCard from "./MemberCard";

function GroupMembers() {
  const { groupId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (groupId) {
        setLoading(true);
        setMembers(await getMembersForGroup(groupId));
        setLoading(false);
      }
    }
    fetchMembers();
  }, [groupId]);

  return (
    loading ? (
      <Loading />
    ) : (
      <div className="GroupMembers">
        <div className="content">
          {members.map(member => <MemberCard member={member} />)}
          <div
            className='AddMemberCard ui link card attached'
            onClick={() => navigate(`/groups/${groupId}/members/new`)}
          ><i className="add icon" /></div>
        </div>
      </div>
    )
  );
}


export default GroupMembers;