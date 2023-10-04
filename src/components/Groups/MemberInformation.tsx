import "./Groups.scss";
import { useState, useEffect } from "react";
import { createMember, deleteMember, getMembersForGroup, updateMember } from "../../utils/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Common/Loading";
import Input from "../Common/Input";
import Textarea from "../Common/Textarea";
import { useAuth } from "../../contexts/AuthContext";
import { Member, MemberUpdate } from "../../state/members";

const MemberInformation = () => {
  const { groupId, memberId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  const [member, setMember] = useState<Member>();
  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [identifiers, setIdentifiers] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    const fetchMember = async (groupId: string, memberId: string) => {
      setLoading(true);
      const members = await getMembersForGroup(groupId);
      const member = members.find(member => member.id === memberId);

      if (member) {
        setDefaults(member);
      } else {
        navigate(`/groups/${groupId}?active=1`);
      }

      setLoading(false);
    }

    if (groupId === 'new') {
      navigate('/groups/new')
    } else if (groupId && memberId && memberId !== 'new') {
      fetchMember(groupId, memberId);
    } else if (groupId && memberId) {
      setName("New Member");
      setLoading(false);
    }
  }, [groupId, memberId, navigate]);

  const setDefaults = (member: Member | undefined) => {
    if (member) {
      setMember(member);
      setName(member.name);
      setPosition(member.position);
      setPhone(member.phone);
      setIdentifiers(member.identifiers);
      setNotes(member.notes);
    }
  }

  const isDataUpdated = (): boolean => {
    const isEdited = !!member && (
      name !== member.name
      || position !== member.position
      || phone !== member.phone
      || identifiers !== member.identifiers
      || notes !== member.notes
    );
    return memberId === "new" || isEdited;
  }

  const canSave = (): boolean => {
    return !!name
  }

  const handleSave = async () => {
    if (groupId) {
      setSaving(true);
      const update: MemberUpdate = {
        name,
        group: groupId,
        position,
        phone,
        identifiers,
        notes,
      };

      if (memberId === "new" && canSave()) {
        const createdMember = await createMember(update, user);
        navigate(`/groups/${groupId}/members/${createdMember.id}`);
      } else if (member && canSave()) {
        await updateMember(member.id, update, user);
        setMember({
          id: member.id,
          group: member.group,
          name,
          position,
          phone,
          identifiers,
          notes,
        });
      }

      setSaving(false);
    }
  }

  const handleDelete = async () => {
    if (member) {
      setSaving(true);
      await deleteMember(member.id, user);
      navigate(`/groups/${groupId}?active=1`);
      setSaving(false);
    }
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
                  icon="sticky note outline"
                  value={notes}
                  onChange={setNotes}
                  disabled={saving}
                />
              </div>
              <div className="Row">
                <button
                  className='ui button negative hover-animation'
                  disabled={saving || !isDataUpdated()}
                  onClick={() => memberId === 'new' ? navigate(`/groups/${groupId}?active=1`) : setDefaults(member)}
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