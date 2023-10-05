import { Modal } from "semantic-ui-react";
import "./DriverStrats.scss";
import { useEffect, useState } from "react";
import Input from "../Common/Input";
import Dropdown from "../Common/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { createDriverStrat } from "../../utils/firestore";
import { addDriverStrat } from "../../redux/reducers/driverStrats";
import { useAuth } from "../../contexts/AuthContext";
import Textarea from "../Common/Textarea";

interface NewStratModalProps {
  neighbourhood: string;
}

function NewStratModal(props: NewStratModalProps) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [embed, setEmbed] = useState<string>("");
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const neighbourhoods = useSelector((state: RootState) => state.neighbourhoods.neighbourhoods);

  useEffect(() => {
    setSelectedNeighbourhood(props.neighbourhood);
  }, [props.neighbourhood])

  const handleAdd = async () => {
    setLoading(true);
    const createdStrat = await createDriverStrat({
      neighbourhood: selectedNeighbourhood,
      embed,
      notes,
    }, user);
    dispatch(addDriverStrat(createdStrat));
    setLoading(false);
    setOpen(false);
  }

  const getDropdownOptions = () => {
    return neighbourhoods.map(hood => ({
      key: hood.id,
      text: hood.name,
      value: hood.id,
    }));
  }

  const canAdd = () => {
    return selectedNeighbourhood !== "" && embed !== "";
  }

  return (
    <Modal
      className="NewStratModal Modal"
      size="small"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <button className="ui button positive hover-animation" onClick={() => setOpen(false)}>
          <p className='label contrast'>Add Strat</p>
          <p className='IconContainer contrast'><i className='add icon'></i></p>
        </button>
      }
    >
      <Modal.Header>Add a new strat</Modal.Header>
      <Modal.Content>
        <div className='ui form'>
          <Dropdown
            placeholder="Neighbourhood *"
            disabled={loading}
            options={getDropdownOptions()}
            value={selectedNeighbourhood}
            onChange={(_, { value }) => setSelectedNeighbourhood(value)}
          />
          <Input
            type="text"
            name="name"
            placeholder="Embed *"
            icon="code"
            value={embed}
            onChange={e => setEmbed(e)}
            disabled={loading}
          />
          <p className="small">
            To find your clip's embed, click on the share button and select "Embed".
            The embed should look something like: &lt;iframe <i>gibberish</i>&gt;&lt;/iframe&gt;.
          </p>
          <Textarea
            name="notes"
            placeholder="Notes"
            value={notes}
            onChange={e => setNotes(e)}
            disabled={loading}
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <button className="ui button negative hover-animation" onClick={() => setOpen(false)}>
          <p className='label contrast'>Cancel</p>
          <p className='IconContainer contrast'><i className='close icon'></i></p>
        </button>
        <button className="ui button positive hover-animation" disabled={!canAdd()} onClick={handleAdd}>
          <p className='label contrast'>Confirm</p>
          <p className='IconContainer contrast'><i className='check icon'></i></p>
        </button>
      </Modal.Actions>
    </Modal>
  );
}

export default NewStratModal;