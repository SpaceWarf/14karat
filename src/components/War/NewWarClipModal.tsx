import "./War.scss";
import { Modal } from "semantic-ui-react";
import { useState } from "react";
import Input from "../Common/Input";
import { createWarClip } from "../../utils/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { useSelector } from "react-redux";
import { getMostRecentWar } from "../../redux/selectors/wars";
import Textarea from "../Common/Textarea";

interface NewWarClipModalProps {
  onAdd: () => void
}

function NewWarClipModal(props: NewWarClipModalProps) {
  const { user } = useAuth();
  const war = useSelector(getMostRecentWar);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [embed, setEmbed] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const handleAdd = async () => {
    setLoading(true);
    await createWarClip({
      war: war.id,
      embed,
      notes,
      tags: [],
    }, user);
    props.onAdd();
    reset();
    setLoading(false);
    setOpen(false);
  }

  const reset = () => {
    setEmbed('');
    setNotes('');
  }

  const canAdd = () => {
    return !!embed;
  }

  return (
    <Modal
      className="NewWarClipModal Modal"
      size="small"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <button className="trigger ui button positive hover-animation" onClick={() => setOpen(false)}>
          <p className='label contrast'>Add Clip</p>
          <p className='IconContainer contrast'><i className='add icon'></i></p>
        </button>
      }
    >
      <Modal.Header>Add a new war clip</Modal.Header>
      <Modal.Content>
        <div className='ui form'>
          <Input
            type="text"
            name="embed"
            placeholder="Embed *"
            icon="code"
            value={embed}
            onChange={e => setEmbed(e)}
            disabled={loading}
          />
          <p className="small">
            To find your video's embed, click on the share button and select "Embed".
            The embed should look something like: &lt;iframe <i>gibberish</i>&gt;&lt;/iframe&gt;.
          </p>
          <Textarea
            name="notes"
            placeholder="Notes"
            value={notes}
            onChange={setNotes}
            disabled={loading}
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <button className="ui button negative hover-animation" onClick={() => { reset(); setOpen(false); }}>
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

export default NewWarClipModal;