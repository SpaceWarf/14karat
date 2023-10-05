import "./Groups.scss";
import { Modal } from "semantic-ui-react";
import { useState } from "react";
import Input from "../Common/Input";
import Dropdown from "../Common/Dropdown";
import { createIntel } from "../../utils/firestore";
import { useAuth } from "../../contexts/AuthContext";
import Textarea from "../Common/Textarea";
import { IntelType } from "../../state/intel";

interface NewStratModalProps {
  groupId: string;
  memberId?: string;
  onAdd: () => void
}

function NewIntelModal(props: NewStratModalProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<IntelType>(IntelType.IMAGE);
  const [url, setUrl] = useState<string>('');
  const [embed, setEmbed] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const getDropdownOptions = () => {
    return [IntelType.IMAGE, IntelType.VIDEO].map(type => ({
      key: type,
      text: type,
      value: type,
    }));
  }

  const handleAdd = async () => {
    setLoading(true);
    await createIntel({
      group: props.memberId ? '' : props.groupId,
      member: props.memberId ? props.memberId : '',
      url,
      embed,
      notes,
    }, user);
    props.onAdd();
    reset();
    setLoading(false);
    setOpen(false);
  }

  const reset = () => {
    setType(IntelType.IMAGE);
    setUrl('');
    setEmbed('');
    setNotes('');
  }

  const canAdd = () => {
    return type === IntelType.IMAGE && !!url || type === IntelType.VIDEO && !!embed;
  }

  return (
    <Modal
      className="NewIntelModal Modal"
      size="small"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <button className="trigger ui button positive hover-animation" onClick={() => setOpen(false)}>
          <p className='label contrast'>Add Intel</p>
          <p className='IconContainer contrast'><i className='add icon'></i></p>
        </button>
      }
    >
      <Modal.Header>Add a new intel</Modal.Header>
      <Modal.Content>
        <div className='ui form'>
          <Dropdown
            placeholder="Type *"
            disabled={loading}
            options={getDropdownOptions()}
            value={type}
            onChange={(_, { value }) => setType(value)}
          />
          {type === IntelType.IMAGE && (
            <Input
              type="text"
              name="url"
              placeholder="URL *"
              icon="link"
              value={url}
              onChange={e => setUrl(e)}
              disabled={loading}
            />
          )}
          {type === IntelType.VIDEO && (
            <>
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
            </>
          )}
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

export default NewIntelModal;