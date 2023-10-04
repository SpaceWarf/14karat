import "./Groups.scss";
import Header from "../Common/Header";
import { useNavigate } from "react-router-dom";
import GroupInformation from "./GroupInformation";
import { Tab } from "semantic-ui-react";
import GroupMembers from "./GroupMembers";

const panes = [
  {
    menuItem: { key: 'information', icon: 'address card', content: 'Information' },
    render: () => <GroupInformation />
  },
  {
    menuItem: { key: 'members', icon: 'users', content: 'Members' },
    render: () => <GroupMembers />
  },
  {
    menuItem: { key: 'intel', icon: 'picture', content: 'Intel' },
    render: () => <div>TODO</div>
  },
];

function GroupDetails() {
  const navigate = useNavigate();

  return (
    <div className="GroupDetails">
      <Header text='Group Details' decorated />
      <div className="content">
        <div className="actions">
          <p className="back-button" onClick={() => navigate('/groups')}><i className='arrow left icon' />back</p>
        </div>
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
        />
      </div>
    </div>
  );
}


export default GroupDetails;