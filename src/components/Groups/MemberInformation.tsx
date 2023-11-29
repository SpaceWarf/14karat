import "./Groups.scss";
import { useState, useEffect } from "react";
import { DatabaseTable, createItem, deleteItem, getItemById, getItems, updateItem } from "../../utils/firestore";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loading from "../Common/Loading";
import Input from "../Common/Input";
import Textarea from "../Common/Textarea";
import { useAuth } from "../../contexts/AuthContext";
import { Member, MemberUpdate } from "../../state/member";
import { Checkbox } from "semantic-ui-react";
import Dropdown, { DropdownOption } from "../Common/Dropdown";
import { Group } from "../../state/groups";

const MemberInformation = () => {
  const { memberId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [groupId, setGroupId] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [groups, setGroups] = useState<Group[]>([]);

  const [member, setMember] = useState<Member>();
  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [identifiers, setIdentifiers] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [leader, setLeader] = useState<boolean>(false);
  const [dead, setDead] = useState<boolean>(false);
  const [group, setGroup] = useState<string>("");

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      setGroups(await getItems<Group>(DatabaseTable.GROUPS));
      setLoading(false);
    }
    fetchGroups();
  }, []);

  useEffect(() => {
    const group = searchParams.get('group')
    if (group) {
      setGroupId(group);
      setGroup(group);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchMember = async (memberId: string) => {
      setLoading(true);
      const member = await getItemById<Member>(DatabaseTable.MEMBERS, memberId);

      if (member) {
        setDefaults(member);
      } else {
        navigate(`/groups/${groupId}?active=1`);
      }

      setLoading(false);
    }

    if (memberId && memberId !== 'new') {
      fetchMember(memberId);
    } else if (memberId) {
      setName("New Member");
      setLoading(false);
    }
  }, [memberId, navigate]);

  const setDefaults = (member: Member | undefined) => {
    if (member) {
      setMember(member);
      setName(member.name);
      setPosition(member.position);
      setPhone(member.phone);
      setIdentifiers(member.identifiers);
      setNotes(member.notes);
      setLeader(member.leader);
      setDead(member.dead);
      setGroup(member.group);
    }
  }

  const isDataUpdated = (): boolean => {
    const isEdited = !!member && (
      name !== member.name
      || position !== member.position
      || phone !== member.phone
      || identifiers !== member.identifiers
      || notes !== member.notes
      || leader !== member.leader
      || dead !== member.dead
      || group !== member.group
    );
    return memberId === "new" || isEdited;
  }

  const canSave = (): boolean => {
    return !!name && !!group;
  }

  const handleSave = async () => {
    if (group) {
      setSaving(true);
      const update: MemberUpdate = {
        name,
        group,
        position,
        phone,
        identifiers,
        notes,
        leader,
        dead
      };

      if (memberId === "new" && canSave()) {
        const createdMember = await createItem<MemberUpdate, Member>(DatabaseTable.MEMBERS, update, user);
        navigate(`/members/${createdMember.id}`);
      } else if (member && canSave()) {
        await updateItem<MemberUpdate>(DatabaseTable.MEMBERS, member.id, update, user);

        setMember({
          id: member.id,
          group,
          name,
          position,
          phone,
          identifiers,
          notes,
          leader,
          dead,
        });
      }

      setSaving(false);
    }
  }

  const handleDelete = async () => {
    if (member) {
      setSaving(true);
      await deleteItem(DatabaseTable.MEMBERS, member.id, user);
      navigate(`/groups/${member.group}?active=1`);
      setSaving(false);
    }
  }

  const getGroupsDropdownOptions = (): DropdownOption[] => {
    return groups
      .map(group => ({
        key: group.id,
        text: group.name,
        value: group.id,
      }));
  }

  return (
    loading ? (
      <Loading />
    ) : (
      <div className="MemberInformation">
        <div className="MemberInformationCard ui card">
          <div className="content">
            <div className='header'>
              <p>General Information</p>
              <div>
                {memberId !== 'new' && (
                  <button className="ui icon negative button" onClick={handleDelete}>
                    <i className="trash icon"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="ui form">
              <div className="Row">
                <Dropdown
                  placeholder='Group'
                  disabled={saving}
                  options={getGroupsDropdownOptions()}
                  value={group || ''}
                  onChange={value => setGroup(value)}
                />
                <div className="field-container">
                  <Checkbox checked={leader} label="Leader?" toggle onChange={() => setLeader(!leader)} />
                  <Checkbox checked={dead} label="Dead?" toggle onChange={() => setDead(!dead)} />
                </div>
              </div>
              <div className="Row">
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  icon="address card outline"
                  value={name}
                  onChange={setName}
                  disabled={saving}
                />
                <Input
                  type="text"
                  name="position"
                  placeholder="Position"
                  icon="sitemap"
                  value={position}
                  onChange={setPosition}
                  disabled={saving}
                />
              </div>
              <div className="Row">
                <Input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  icon="phone"
                  value={phone}
                  onChange={setPhone}
                  disabled={saving}
                />
                <Input
                  type="text"
                  name="identifiers"
                  placeholder="Identifiers"
                  icon="tags"
                  value={identifiers}
                  onChange={setIdentifiers}
                  disabled={saving}
                />
              </div>
              <div className='Row large'>
                <Textarea
                  name="notes"
                  placeholder="Notes"
                  value={notes}
                  onChange={setNotes}
                  disabled={saving}
                />
              </div>
              <div className="Row">
                <button
                  className='ui button negative hover-animation'
                  disabled={saving || !isDataUpdated()}
                  onClick={() => memberId === 'new' ? navigate(`/groups/${groupId}`) : setDefaults(member)}
                >
                  <p className='label contrast'>{memberId === 'new' ? 'Cancel' : 'Reset'}</p>
                  <p className='IconContainer contrast'><i className='close icon'></i></p>
                </button>
                <button
                  className='ui button positive hover-animation'
                  disabled={saving || !isDataUpdated() || !canSave()}
                  onClick={handleSave}
                >
                  <p className='label contrast'>Save</p>
                  <p className='IconContainer contrast'><i className='check icon'></i></p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default MemberInformation;