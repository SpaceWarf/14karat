import "./ViewEventModal.scss";
import { Modal } from "semantic-ui-react";
import { ReactBigCalendarEvent } from "../../../state/event";
import dayjs from "dayjs";
import { LocalizationProvider, DateTimePicker, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAuth } from "../../../contexts/AuthContext";
import { DatabaseTable, deleteItem } from "../../../utils/firestore";
import { Webhook } from "../../../state/webhook";
import { triggerDiscordWebhook } from "../../../services/functions";
import Textarea from "../../Common/Textarea";
import { DiscordWebhook } from "../../../state/discordWebhook";
import ConfirmationModal from "../../Common/ConfirmationModal";

interface ViewEventModalProps {
  open: boolean,
  event: ReactBigCalendarEvent,
  webhook?: Webhook,
  onEdit: () => void
  onClose: () => void
}

function ViewEventModal(props: ViewEventModalProps) {
  const { user, access } = useAuth();

  const handleDelete = async () => {
    await deleteItem(DatabaseTable.EVENTS, props.event.id, user);
    props.onClose();
  }

  const sendWebhook = () => {
    if (props.webhook) {
      const payload: DiscordWebhook = {
        url: props.webhook.url,
        content: `@everyone Event reminder`,
        embeds: [
          {
            type: "rich",
            title: props.event.title,
            description: `This event starts <t:${props.event.start.getTime() / 1000}:R>`,
            fields: [
              {
                name: 'Starts On',
                value: `\n<t:${props.event.start.getTime() / 1000}:F>`,
                inline: true
              },
              {
                name: 'Ends On',
                value: `\n<t:${props.event.end.getTime() / 1000}:F>`,
                inline: true
              }
            ]
          }
        ]
      };

      if (props.event.poster) {
        payload.embeds.push({
          type: "rich",
          image: {
            url: props.event.poster,
          }
        })
      }

      triggerDiscordWebhook(payload).catch(error => {
        console.error(error);
      });
    }
  }

  return (
    <Modal
      className="ViewEventModal Modal"
      size="small"
      onClose={props.onClose}
      open={props.open}
    >
      <Modal.Header>
        <div className="Title">
          <div className="Label" style={{ backgroundColor: props.event.color }} />
          {props.event.title}
        </div>
        {access.seniorOpAccess && (
          <div className="Actions">
            <button className="ui icon button" disabled={!props.webhook} onClick={sendWebhook}>
              <i className="discord icon" />
            </button>
            <button className="ui icon button" onClick={props.onEdit}>
              <i className="pencil icon" />
            </button>
            <ConfirmationModal
              title='Confirm Delete Event'
              content={
                <>
                  <p>You are about to delete the following event: <b>{props.event.title}</b>. <b>This cannot be undone.</b></p>
                  <p>Are you sure you want to proceed?</p>
                </>
              }
              trigger={
                <button className="ui icon negative button">
                  <i className="trash icon" />
                </button>
              }
              onConfirm={handleDelete}
            />
          </div>
        )}
      </Modal.Header>
      <Modal.Content>
        <div className='ui form'>
          <div className="Row">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {props.event.allDay ? (
                <DatePicker
                  label="Starts On"
                  value={dayjs(props.event.start)}
                  disabled
                />
              ) : (
                <DateTimePicker
                  label="Starts On"
                  value={dayjs(props.event.start)}
                  disabled
                />
              )}
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {props.event.allDay ? (
                <DatePicker
                  label="Ends On"
                  value={dayjs(props.event.end)}
                  disabled
                />
              ) : (
                <DateTimePicker
                  label="Ends On"
                  value={dayjs(props.event.end)}
                  disabled
                />
              )}
            </LocalizationProvider>
          </div>
          <div className="Row">
            <div>
              <Textarea
                name="notes"
                placeholder="Notes"
                value={props.event.notes || ''}
                disabled
              />
            </div>
            {props.event.poster && <img className="Poster" src={props.event.poster} alt="Poster" />}
          </div>
          {props.event.poster && (
            <div className="Row PosterRow">
            </div>
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
}

export default ViewEventModal;