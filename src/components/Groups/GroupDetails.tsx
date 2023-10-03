import "./Groups.scss";
import { useState, useEffect } from "react";
import { Group } from "../../redux/reducers/groups";
import { getGroups, updateGroup } from "../../utils/firestore";
import Header from "../Common/Header";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Common/Loading";
import Input from "../Common/Input";
import Dropdown, { DropdownOption } from "../Common/Dropdown";
import Textarea from "../Common/Textarea";
import { isEqual } from "lodash";

const COLOURS = ["red", "orange", "yellow", "olive", "green", "teal", "blue", "violet", "purple", "pink", "brown", "grey", "black"];

function GroupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [groups, setGroups] = useState<Group[]>([]);

  const [group, setGroup] = useState<Group>();
  const [name, setName] = useState<string>("");
  const [hq, setHq] = useState<string>("");
  const [flag, setFlag] = useState<string>("");
  const [identifiers, setIdentifiers] = useState<string>("");
  const [allies, setAllies] = useState<string[]>([]);
  const [enemies, setEnemies] = useState<string[]>([]);
  const [cardColour, setColour] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    const fetchGroup = async () => {
      setLoading(true);
      const groups = await getGroups();
      setGroups(groups);
      const group = groups.find(group => group.id === id);

      if (group) {
        setDefaults(group);
      } else {
        navigate("/groups");
      }

      setLoading(false);
    }

    fetchGroup();
  }, [id, navigate]);

  const setDefaults = (group: Group | undefined) => {
    if (group) {
      setGroup(group);
      setName(group.name);
      setHq(group.hq);
      setFlag(group.flag);
      setIdentifiers(group.identifiers);
      setAllies(group.allies);
      setEnemies(group.enemies);
      setColour(group.cardColor);
      setNotes(group.notes);
    }
  }

  const getColoursDropdownOptions = (): DropdownOption[] => {
    return COLOURS
      .map(colour => ({
        key: colour,
        text: colour,
        value: colour,
      }));
  }

  const getGroupsDropdownOptions = (): DropdownOption[] => {
    return groups
      .map(group => ({
        key: group.id,
        text: group.name,
        value: group.id,
      }));
  }

  const isDataUpdated = (): boolean => {
    return !!group && (
      name !== group.name
      || hq !== group.hq
      || flag !== group.flag
      || identifiers !== group.identifiers
      || !isEqual(allies, group.allies)
      || !isEqual(enemies, group.enemies)
      || cardColour !== group.cardColor
      || notes !== group.notes
    );
  }

  const handleSave = async () => {
    if (group) {
      setSaving(true);
      const update: Partial<Group> = {
        name,
        hq,
        flag,
        identifiers,
        allies,
        enemies,
        cardColor: cardColour,
        notes,
      };
      await updateGroup(group.id, update);
      setGroup({
        id: group.id,
        name,
        hq,
        flag,
        identifiers,
        allies,
        enemies,
        cardColor: cardColour,
        notes,
      });
      setSaving(false);
    }
  }

  return (
    <div className="GroupDetails">
      <Header text={name} decorated />
      <div className="content">
        <div className="actions">
          <p className="back-button" onClick={() => navigate('/groups')}><i className='arrow left icon' /> back</p>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="GroupDetailsContainer">
            <div className="DetailsCard ui card">
              <div className="content">
                <div className='header'>
                  Group Details
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
                      name="hq"
                      placeholder="HQ"
                      icon="map marker alternate"
                      value={hq}
                      onChange={setHq}
                      disabled={saving}
                    />
                    <Dropdown
                      placeholder='Card Color'
                      disabled={saving}
                      options={getColoursDropdownOptions()}
                      value={cardColour}
                      clearable
                      onChange={(_, { value }) => setColour(value)}
                    />
                    <Input
                      type="text"
                      name="flag"
                      placeholder="Flag"
                      icon="flag outline"
                      value={flag}
                      onChange={setFlag}
                      disabled={saving}
                    />
                  </div>
                  <div className="Row">
                    <Input
                      type="text"
                      name="identifiers"
                      placeholder="Identifiers"
                      icon="tags"
                      value={identifiers}
                      onChange={setIdentifiers}
                      disabled={saving}
                    />
                    <Dropdown
                      placeholder='Allies'
                      disabled={saving}
                      options={getGroupsDropdownOptions()}
                      value={allies}
                      clearable
                      multiple
                      onChange={(_, { value }) => setAllies(value)}
                    />
                    <Dropdown
                      placeholder='Enemies'
                      disabled={saving}
                      options={getGroupsDropdownOptions()}
                      value={enemies}
                      clearable
                      multiple
                      onChange={(_, { value }) => setEnemies(value)}
                    />
                  </div>
                  <div className='Row large'>
                    <Textarea
                      name="notes"
                      placeholder="Notes"
                      icon="sticky note outline outline"
                      value={notes}
                      onChange={setNotes}
                      disabled={saving}
                    />
                  </div>
                  <div className="Row">
                    <button
                      className='ui button negative hover-animation'
                      disabled={saving || !isDataUpdated()}
                      onClick={() => setDefaults(group)}
                    >
                      <p className='label contrast'>Reset</p>
                      <p className='IconContainer contrast'><i className='close icon'></i></p>
                    </button>
                    <button
                      className='ui button positive hover-animation'
                      disabled={saving || !isDataUpdated()}
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
        )}
      </div>
    </div>
  );
}

export default GroupDetails;