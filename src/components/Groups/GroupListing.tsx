import { useEffect, useState } from "react";
import Header from "../Common/Header";
import "./Groups.scss";
import { DatabaseTable, getItems } from "../../utils/firestore";
import Loading from "../Common/Loading";
import GroupCard from "./GroupCard";
import { useNavigate } from "react-router-dom";
import { Group, GroupType } from "../../state/groups";
import Filters, { FilterData } from "../Common/Filters";

function GroupListing() {
  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      const groups = await getItems<Group>(DatabaseTable.GROUPS);
      setGroups(groups);
      setFilteredGroups(groups);
      setLoading(false);
    }
    fetchGroups();
  }, []);

  const handleFiltersUpdate = (update: FilterData) => {
    setFilteredGroups(groups.filter(group => group.name.toLowerCase().includes(update.search.toLowerCase())))
  }

  const getGroupCards = (type: GroupType, coloured = true): JSX.Element[] => {
    return filteredGroups
      .filter(group => group.type === type && !!group.cardColor === coloured)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(group => <GroupCard group={group} groups={groups} />);
  }

  return (
    <div className="GroupListing">
      <Header text="Group Listing" decorated />
      <div className="content">
        <div className="actions">
          <Filters tags={[]} onUpdate={handleFiltersUpdate} />
          <div className="Buttons">
            <button className="ui button hover-animation" onClick={() => navigate("/members")}>
              <p className='label'>View All Members</p>
              <p className='IconContainer'><i className='group icon'></i></p>
            </button>
            <button className="ui button positive hover-animation" onClick={() => navigate("/groups/new")}>
              <p className='label contrast'>Add Group</p>
              <p className='IconContainer contrast'><i className='add icon'></i></p>
            </button>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          Object.values(GroupType).map(type => (
            <div className="GroupTypeSection">
              <Header text={type} />
              <div key={type} className="CardsContainer centered">
                {getGroupCards(type)}
                {getGroupCards(type, false)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GroupListing;