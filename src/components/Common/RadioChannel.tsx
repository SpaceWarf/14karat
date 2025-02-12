import { DatabaseTable, createItem, getItemById, updateItem } from "../../utils/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Radio, RadioType, RadioUpdate } from "../../state/radio";
import { generateRadioChannel } from "../../utils/radio";
import { Webhook } from "../../state/webhook";
import { Job } from "../../state/jobs";
import { triggerDiscordWebhook } from "../../services/functions";
import { useSelector } from "react-redux";
import { getAllUsedChannels } from "../../redux/selectors/radios";

interface RadioChannelProps {
  radio: Radio;
  job?: Job
}

function RadioChannel(props: RadioChannelProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [webhook, setWebhook] = useState<Webhook>();
  const [friendsWebhook, setFriendsWebhook] = useState<Webhook>();
  const [roninWebhook, setRoninWebhook] = useState<Webhook>();
  const allUsedChannels = useSelector(getAllUsedChannels);

  useEffect(() => {
    const fetchWebhook = async () => {
      setWebhook(await getItemById<Webhook>(DatabaseTable.WEBHOOK, 'radio-update'));
      setFriendsWebhook(await getItemById<Webhook>(DatabaseTable.WEBHOOK, 'friends-radio-update'));
      setRoninWebhook(await getItemById<Webhook>(DatabaseTable.WEBHOOK, 'ronin-radio-update'));
    }

    fetchWebhook();
  }, []);

  const sendWebhook = (newChannel?: string) => {
    const webhookStr = getWebhookString(newChannel)

    if (props.radio.type !== RadioType.FRIENDS && webhook) {
      triggerDiscordWebhook({
        url: webhook.url,
        content: webhookStr,
      }).catch(error => {
        console.error(error);
      });
    }

    if (props.radio.type === RadioType.MAIN && roninWebhook) {
      triggerDiscordWebhook({
        url: roninWebhook.url,
        content: webhookStr,
      }).catch(error => {
        console.error(error);
      });
    }

    if (props.radio.type === RadioType.FRIENDS && friendsWebhook) {
      triggerDiscordWebhook({
        url: friendsWebhook.url,
        content: webhookStr,
      }).catch(error => {
        console.error(error);
      });
    }
  }

  const getWebhookString = (newChannel?: string) => {
    if (props.radio.type === RadioType.JOB) {
      return props.job
        ? `@here burn ${props.job.name} ${props.job.index} radio ~~${props.radio.channel}~~`
        : `@here burn ${props.radio.type} radio ~~${props.radio.channel}~~!`;
    }
    return `@here burn ${props.radio.type} radio ~~${props.radio.channel}~~!\nNEW ${props.radio.type.toUpperCase()} RADIO - ${newChannel}`;
  }

  const handleBurnChannel = async () => {
    if (props.radio) {
      setLoading(true);

      if ([RadioType.MAIN, RadioType.FRIENDS, RadioType.SLIDE].includes(props.radio.type)) {
        const newChannel = generateRadioChannel(allUsedChannels);
        sendWebhook(newChannel);
        await createItem<RadioUpdate, Radio>(
          DatabaseTable.RADIOS,
          {
            channel: newChannel,
            type: props.radio.type,
            burned: false,
            job: props.job?.id ?? "",
          },
          user
        );
      } else {
        sendWebhook();
      }

      await updateItem<RadioUpdate>(
        DatabaseTable.RADIOS,
        props.radio.id,
        {
          ...props.radio,
          burned: true,
          burnTime: new Date().toISOString(),
        },
        user
      );
      setLoading(false);
    }
  }

  const isDisabled = (): boolean => {
    if (props.radio.type === RadioType.FRIENDS) {
      return !friendsWebhook || loading
    }

    return !webhook || loading
  }

  return (
    <div className='RadioChannel'>
      <p className="ChannelLabel">{props.radio.channel}</p>
      {!props.radio.burned && (
        <div className="ChannelActions">
          <button className="ui icon negative button" disabled={isDisabled()} onClick={() => handleBurnChannel()}>
            <i className="fire icon" />
          </button>
        </div>
      )}
    </div>
  );
}

export default RadioChannel;