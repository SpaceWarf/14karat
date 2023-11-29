import { useEffect, useState } from "react";
import Header from "../Common/Header";
import "./Groups.scss";
import { DatabaseTable, getItems } from "../../utils/firestore";
import Loading from "../Common/Loading";
import { useNavigate } from "react-router-dom";
import { Member } from "../../state/member";
import MemberCard from "./MemberCard";

function MembersListing() {
  const [loading, setLoading] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setMembers(await getItems<Member>(DatabaseTable.MEMBERS));
      setLoading(false);
    }
    fetchMembers();
  }, []);

  return (
    <div className="MembersListing">
      <Header text="Members Listing" decorated />
      <div className="content">
        <div className="actions">
          <p className="hyperlink-button" onClick={() => navigate('/groups')}><i className='arrow left icon' /> back</p>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="CardsContainer">
            {members.sort((a, b) => a.name.localeCompare(b.name)).map(member => <MemberCard member={member} />)}
            {/* <div
              className='AddGroupCard ui link card attached'
              onClick={() => navigate('/groups/new')}
            ><i className="add icon" /></div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default MembersListing;