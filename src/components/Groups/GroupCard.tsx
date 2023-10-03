import "./Groups.scss";
import { Group } from "../../redux/reducers/groups";
import { useNavigate } from "react-router-dom";

interface GroupCardProps {
  group: Group
}

function GroupCard(props: GroupCardProps) {
  const navigate = useNavigate()

  return (
    <div
      className={`${props.group.cardColor} GroupCard ui link card attached`}
      onClick={() => navigate(`/groups/${props.group.id}`)}
    >
      <div className="content">
        <div className="header">
          {props.group.name}
        </div>
        <div className="Details">
          <div className="DetailsRow">
            <div className="Detail centered large">
              <i className="map marker alternate icon" />
              <p>{props.group.hq || "-"}</p>
            </div>
          </div>
          <div className="DetailsRow">
            <div className="Detail">
              <i className="flag outline icon" />
              <p>{props.group.flag || "-"}</p>
            </div>
            <div className="Detail">
              <i className="tags icon" />
              <p>{props.group.identifiers || "-"}</p>
            </div>
          </div>
          <div className="DetailsRow">
            <div className="Detail">
              <i className="handshake outline icon" />
              <p>{props.group.allies.join(", ") || "-"}</p>
            </div>
            <div className="Detail">
              <i className="thumbs down outline icon" />
              <p>{props.group.enemies.join(", ") || "-"}</p>
            </div>
          </div>
          <div className="DetailsRow large">
            <div className="Detail">
              <i className="sticky note outline icon" />
              <p>{props.group.notes || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupCard;