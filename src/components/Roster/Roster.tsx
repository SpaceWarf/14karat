import "./Roster.scss";
import { useEffect, useState } from "react";
import { DatabaseTable, getItems, onItemsSnapshot } from "../../utils/firestore";
import ProfileCard from "../Common/ProfileCard";
import Loading from "../Common/Loading";
import Header from "../Common/Header";
import { getAlphabeticallyOrdered } from "../../utils/array";
import { useAuth } from "../../contexts/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Division } from "../../redux/reducers/divisions";
import { ProfileInfo } from "../../state/profile";

function Roster() {
  const { access } = useAuth();
  const { divisions } = useSelector((state: RootState) => state.divisions);
  const [members, setMembers] = useState([] as ProfileInfo[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      setMembers(await getItems<ProfileInfo>(DatabaseTable.PROFILES));
      onItemsSnapshot<ProfileInfo>(DatabaseTable.PROFILES, profiles => setMembers(profiles));
      setLoading(false);
    }
    fetchProfiles();
  }, []);

  function getEmployeesForDivision(division: Division): ProfileInfo[] {
    return getAlphabeticallyOrdered(members.filter(member => (
      !member.hidden && member.division === division.id
    )), 'name');
  }

  return (
    <div className="Roster">
      {loading ? (
        <Loading />
      ) : (
        <div className="content">
          {[...divisions].sort((a, b) => a.hierarchy - b.hierarchy).map(division => (
            <div className="Division">
              <Header text={division.name} decorated />
              <div className="content">
                {getEmployeesForDivision(division).map((member: ProfileInfo) => (
                  <ProfileCard
                    key={member.id}
                    profile={member}
                    editable={access.headAccess}
                    nameAsTitle
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Roster;