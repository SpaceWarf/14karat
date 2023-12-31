import { useEffect, useState } from "react";
import Header from "../Common/Header";
import "./Groups.scss";
import { DatabaseTable, getItems } from "../../utils/firestore";
import Loading from "../Common/Loading";
import { useNavigate } from "react-router-dom";
import { Member } from "../../state/member";
import MemberCard from "./MemberCard";
import Filters, { FilterData } from "../Common/Filters";
import { Group } from "../../state/groups";

function MembersListing() {
  const [loading, setLoading] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setGroups(await getItems<Group>(DatabaseTable.GROUPS))

      const members = await getItems<Member>(DatabaseTable.MEMBERS);
      setMembers(members);
      setFilteredMembers(members);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleFiltersUpdate = (update: FilterData) => {
    setFilteredMembers(members.filter(member => member.name.toLowerCase().includes(update.search.toLowerCase())))
  }

  return (
    <div className="MembersListing">
      <Header text="Members Listing" decorated />
      <div className="content">
        <div className="actions">
          <p className="hyperlink-button" onClick={() => navigate('/groups')}><i className='arrow left icon' /> back</p>
          <div className="Row">
            <Filters tags={[]} onUpdate={handleFiltersUpdate} />
            <button className="ui button positive hover-animation" onClick={() => navigate("/members/new")}>
              <p className='label contrast'>Add Member</p>
              <p className='IconContainer contrast'><i className='add icon'></i></p>
            </button>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="CardsContainer">
            {
              filteredMembers
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(member => <MemberCard member={member} groups={groups} />)
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default MembersListing;