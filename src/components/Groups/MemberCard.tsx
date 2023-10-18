import "./Groups.scss";
import { Member } from "../../state/member";
import { useNavigate, useParams } from "react-router-dom";

interface MemberCardProps {
  member: Member
}

function MemberCard(props: MemberCardProps) {
  const { groupId } = useParams();
  const navigate = useNavigate();

  return (
    <div
      className={`MemberCard ui link card attached ${props.member.dead ? 'red' : ''}`}
      onClick={() => navigate(`/groups/${groupId}/members/${props.member.id}`)}
    >
      <div className="content">
        <div className={`header ${props.member.dead ? 'negative' : ''}`}>
          <p>{props.member.name}</p>
          {props.member.dead ? <p> - DECEASED</p> : <></>}
          {props.member.leader ? <i className="chess king icon" /> : <></>}
        </div>
        <div className="Details">
          <div className="DetailsRow">
            <div className="Detail centered large">
              <i className="sitemap icon" />
              <p>{props.member.position || "-"}</p>
            </div>
          </div>
          <div className="DetailsRow">
            <div className="Detail">
              <i className="phone icon" />
              <p>{props.member.phone || "-"}</p>
            </div>
            <div className="Detail">
              <i className="tags icon" />
              <p>{props.member.identifiers || "-"}</p>
            </div>
          </div>
          <div className="DetailsRow large">
            <div className="Detail">
              <i className="sticky note outline icon" />
              <p>{props.member.notes || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberCard;