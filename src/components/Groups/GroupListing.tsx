import { useEffect, useState } from "react";
import Header from "../Common/Header";
import "./Groups.scss";
import { DatabaseTable, getItems } from "../../utils/firestore";
import Loading from "../Common/Loading";
import GroupCard from "./GroupCard";
import { useNavigate } from "react-router-dom";
import { Group } from "../../state/groups";

function GroupListing() {
  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      setGroups(await getItems<Group>(DatabaseTable.GROUPS));
      setLoading(false);
    }
    fetchGroups();
  }, []);

  return (
    <div className="GroupListing">
      <Header text="Group Listing" decorated />
      <div className="content">
        <div className="actions">
          <button className="ui button positive hover-animation" onClick={() => navigate("/members")}>
            <p className='label contrast'>View All Members</p>
            <p className='IconContainer contrast'><i className='group icon'></i></p>
          </button>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="CardsContainer">
            {groups.filter(group => group.cardColor).map(group => <GroupCard group={group} groups={groups} />)}
            {groups.filter(group => !group.cardColor).map(group => <GroupCard group={group} groups={groups} />)}
            <div
              className='AddGroupCard ui link card attached'
              onClick={() => navigate('/groups/new')}
            ><i className="add icon" /></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupListing;