import { useEffect, useState } from "react";
import Header from "../Common/Header";
import "./Groups.scss";
import { getGroups } from "../../utils/firestore";
import Loading from "../Common/Loading";
import { Group } from "../../redux/reducers/groups";
import GroupCard from "./GroupCard";

function GroupsListing() {
  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<Group[]>([]);

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
            {groups.filter(group => group.cardColor).map(group => <GroupCard group={group} />)}
            {groups.filter(group => !group.cardColor).map(group => <GroupCard group={group} />)}
          </>
        )}
      </div>
    </div>
  );
}

export default GroupsListing;