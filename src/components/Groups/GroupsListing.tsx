import { useEffect, useState } from "react";
import Header from "../Common/Header";
import "./Groups.scss";
import { getGroups } from "../../utils/firestore";
import Loading from "../Common/Loading";
import { Group } from "../../redux/reducers/groups";
import GroupCard from "./GroupCard";
import { useNavigate } from "react-router-dom";

function GroupsListing() {
  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      setGroups(await getGroups());
      setLoading(false);
    }
    fetchGroups();
  }, []);

  return (
    <div className="GroupsListing">
      <Header text="Group Listing" decorated />
      <div className="content">
        {loading ? (
          <Loading />
        ) : (
          <>
            {groups.filter(group => group.cardColor).map(group => <GroupCard group={group} groups={groups} />)}
            {groups.filter(group => !group.cardColor).map(group => <GroupCard group={group} groups={groups} />)}
            <div
              className='AddGroupCard ui link card attached'
              onClick={() => navigate('/groups/new')}
            ><i className="add icon" /></div>
          </>
        )}
      </div>
    </div>
  );
}

export default GroupsListing;