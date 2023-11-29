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
          <Filters tags={[]} onUpdate={handleFiltersUpdate} />
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
            <div
              className='AddGroupCard ui link card attached'
              onClick={() => navigate('/members/new')}
            ><i className="add icon" /></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MembersListing;