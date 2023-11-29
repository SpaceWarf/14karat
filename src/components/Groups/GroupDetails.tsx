import "./Groups.scss";
import Header from "../Common/Header";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import GroupInformation from "./GroupInformation";
import { Tab } from "semantic-ui-react";
import GroupMembers from "./GroupMembers";
import { useEffect, useState } from "react";
import GroupIntel from "./GroupIntel";
import { Group } from "../../state/groups";
import { DatabaseTable, getItemById } from "../../utils/firestore";

function GroupDetails() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState<number>(0);
  const [group, setGroup] = useState<Group>();

  useEffect(() => {
    const fetchGroup = async () => {
      if (groupId) {
        setGroup(await getItemById(DatabaseTable.GROUPS, groupId))
      }
    }

    fetchGroup();
  }, [groupId]);

  useEffect(() => {
    if (searchParams.has('active') && !isNaN(Number(searchParams.get('active')))) {
      setActive(Number(searchParams.get('active')))
    }
  }, [searchParams]);

  const getPanes = () => (groupId === 'new' ? [
    {
      menuItem: { key: 'information', icon: 'address card', content: 'Information' },
      render: () => <GroupInformation />
    }
  ] : [
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
      render: () => <GroupIntel />
    },
  ]);

  const handleSetActive = (active: number) => {
    setActive(active);
    setSearchParams({ active: `${active}` });
  }

  return (
    <div className="GroupDetails">
      <Header text={group ? group.name : 'Group Details'} decorated />
      <div className="content">
        <div className="actions">
          <p className="hyperlink-button" onClick={() => navigate('/groups')}><i className='arrow left icon' />back</p>
        </div>
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={getPanes()}
          activeIndex={active}
          onTabChange={(_, { activeIndex }) => handleSetActive(Number(activeIndex))}
        />
      </div>
    </div>
  );
}


export default GroupDetails;