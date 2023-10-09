import "./Groups.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Member } from "../../state/members";
import { getMembersForGroup } from "../../utils/firestore";
import Loading from "../Common/Loading";
import MemberCard from "./MemberCard";

function GroupMembers() {
  const { groupId } = useParams();
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

  const getOrderedMembers = (): Member[] => {
    const leaders: Member[] = [];
    const hasPosition: Member[] = []
    const ordinary: Member[] = [];
    const dead: Member[] = [];
    members
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(member => {
        if (member.leader) {
          leaders.push(member);
        } else if (member.dead) {
          dead.push(member);
        } else if (member.position) {
          hasPosition.push(member);
        } else {
          ordinary.push(member);
        }
      });
    return [...leaders, ...hasPosition, ...ordinary, ...dead];
  }

  return (
    loading ? (
      <Loading />
    ) : (
      <div className="GroupMembers">
        <div className="content">
          {getOrderedMembers().map(member => <MemberCard member={member} />)}
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