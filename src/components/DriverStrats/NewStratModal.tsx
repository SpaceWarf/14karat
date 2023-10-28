import "./DriverStrats.scss";
import { Checkbox, Modal } from "semantic-ui-react";
import { useEffect, useState } from "react";
import Input from "../Common/Input";
import Dropdown, { DropdownOption } from "../Common/Dropdown";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { createDriverStrat, getWebhookById } from "../../utils/firestore";
import { DriverStratTag } from "../../redux/reducers/driverStrats";
import { useAuth } from "../../contexts/AuthContext";
import Textarea from "../Common/Textarea";
import { Webhook } from "../../state/webhook";
import { triggerDiscordWebhook } from "../../services/functions";

interface NewStratModalProps {
  neighbourhood: string;
}

function NewStratModal(props: NewStratModalProps) {
  const { user, isAdmin } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [embed, setEmbed] = useState<string>("");
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [webhook, setWebhook] = useState<Webhook>();
  const [notification, setNotification] = useState<boolean>(false);
  const neighbourhoods = useSelector((state: RootState) => state.neighbourhoods.neighbourhoods);

  useEffect(() => {
    const fetchWebhook = async () => {
      setWebhook(await getWebhookById('strats-update'));
    }

    if (isAdmin) {
      fetchWebhook();
    }
  }, [isAdmin]);

  useEffect(() => {
    setSelectedNeighbourhood(props.neighbourhood || (neighbourhoods[0]?.id ?? ''));
  }, [props.neighbourhood, neighbourhoods])

  const handleAdd = async () => {
    setLoading(true);
    await createDriverStrat({
      neighbourhood: selectedNeighbourhood,
      embed,
      notes,
      tags,
    }, user);

    if (notification) {
      sendWebhook();
    }

    setLoading(false);
    setOpen(false);
  }

  const getNeighbouhoodOptions = (): DropdownOption[] => {
    return neighbourhoods.map(hood => ({
      key: hood.id,
      text: hood.name,
      value: hood.id,
    }));
  }

  const getTagsOptions = (): DropdownOption[] => {
    return Object.values(DriverStratTag).map(tag => ({
      key: tag,
      text: tag,
      value: tag,
    }));
  }

  const canAdd = () => {
    return webhook && selectedNeighbourhood !== "" && embed !== "";
  }

  const sendWebhook = () => {
    if (webhook) {
      const hood = neighbourhoods.find(neighbourhood => neighbourhood.id === selectedNeighbourhood);
      const regex = /src=["']([^\s]+)['"]/
      const match = regex.exec(embed);
      let url = match ? match[1] : '';

      if (url && hood) {
        triggerDiscordWebhook({
          url: webhook.url,
          content: `A new strat was added!\n${url}`,
          embeds: []
        }).then(() => {
          setTimeout(() => {
            triggerDiscordWebhook({
              url: webhook.url,
              content: '',
              embeds: [
                {
                  type: "rich",
                  title: "",
                  description: "",
                  fields: [
                    {
                      name: 'Neighbourhood',
                      value: hood.name,
                      inline: true,
                    },
                    {
                      name: 'Tags',
                      value: tags.join(', '),
                      inline: true,
                    },
                    {
                      name: 'Notes',
                      value: notes,
                    }
                  ]
                }
              ]
            }).catch(error => {
              console.error(error);
            });
          }, 1000);
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

  return (
    <Modal
      className="NewStratModal Modal"
      size="small"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <button className="ui button positive hover-animation" onClick={() => setOpen(true)}>
          <p className='label contrast'>Add Strat</p>
          <p className='IconContainer contrast'><i className='add icon'></i></p>
        </button>
      }
    >
      <Modal.Header>Add a new strat</Modal.Header>
      <Modal.Content>
        <div className='ui form'>
          <div className="Row">
            <Dropdown
              placeholder="Neighbourhood *"
              disabled={loading}
              options={getNeighbouhoodOptions()}
              value={selectedNeighbourhood}
              onChange={value => setSelectedNeighbourhood(value)}
            />
            <div className="field-container">
              <Checkbox
                checked={notification}
                label="Send Notification?"
                toggle
                onChange={() => setNotification(!notification)}
              />
            </div>
          </div>
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
          <Dropdown
            placeholder="Tags"
            disabled={loading}
            options={getTagsOptions()}
            value={tags}
            clearable
            multiple
            onChange={value => setTags(value)}
          />
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