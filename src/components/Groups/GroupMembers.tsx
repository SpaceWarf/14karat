import "./Groups.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Member } from "../../state/member";
import { getMembersForGroup } from "../../utils/firestore";
import Loading from "../Common/Loading";
import MemberCard from "./MemberCard";
import Filters, { FilterData } from "../Common/Filters";
import { Group } from "../../state/groups";

interface GroupMembersProps {
  groups: Group[];
}

function GroupMembers(props: GroupMembersProps) {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (groupId) {
        setLoading(true);
        const members = await getMembersForGroup(groupId)
        setMembers(members);
        setFilteredMembers(members);
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
    filteredMembers
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

  const handleFiltersUpdate = (update: FilterData) => {
    setFilteredMembers(getFilteredMembers(update));
  }

  const getFilteredMembers = (filters: FilterData): Member[] => {
    const filtered: Member[] = [];
    members.forEach(member => {
      const memberInfo = `${member.name} ${member.notes} ${member.phone} ${member.identifiers}`
      const isSearched = filters.search.length === 0
        || memberInfo.toLowerCase().includes(filters.search.toLowerCase());
      const isTagged = filters.tags.length === 0
        || (filters.tags.includes("leader") && member.leader)
        || (filters.tags.includes("dead") && member.dead);
      if (isSearched && isTagged) {
        filtered.push(member);
      }
    });
    return filtered;
  }

  return (
    loading ? (
      <Loading />
    ) : (
      <div className="GroupMembers">
        <Filters tags={['leader', 'dead']} onUpdate={handleFiltersUpdate} />
        <div className="content">
          <div className="CardsContainer">
            {getOrderedMembers().map(member => (
              <MemberCard
                key={member.id}
                member={member}
                groups={props.groups}
                fromGroup
              />
            ))}
            <div
              className='AddMemberCard ui link card attached'
              onClick={() => navigate(`/members/new?group=${groupId}`)}
            ><i className="add icon" /></div>
          </div>
        </div>
      </div>
    )
  );
}


export default GroupMembers;