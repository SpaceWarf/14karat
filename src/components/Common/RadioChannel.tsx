import { DatabaseTable, createItem, getItemById, updateItem } from "../../utils/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Radio, RadioUpdate } from "../../state/radio";
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
  const allUsedChannels = useSelector(getAllUsedChannels);

  useEffect(() => {
    const fetchWebhook = async () => {
      setWebhook(await getItemById<Webhook>(DatabaseTable.WEBHOOK, 'radio-update'));
    }

    fetchWebhook();
  }, []);

  const sendWebhook = (newChannel?: string) => {
    if (webhook) {
      triggerDiscordWebhook({
        url: webhook.url,
        content: getWebhookString(newChannel),
      }).catch(error => {
        console.error(error);
      });
    }
  }

  const getWebhookString = (newChannel?: string) => {
    if (props.radio.main) {
      return `@here burn main ~~${props.radio.channel}~~!\nNEW MAIN - ${newChannel}`;
    }

    if (props.radio.slide) {
      return `@here burn slide radio ~~${props.radio.channel}~~!\nNEW SLIDE RADIO - ${newChannel}`;
    }

    if (props.job) {
      return `@here burn ${props.job.name} ${props.job.index} radio ~~${props.radio.channel}~~`;
    }

    return `@here burn radio ~~${props.radio.channel}~~`
  }

  const handleBurnChannel = async () => {
    if (props.radio) {
      setLoading(true);

      if (props.radio.main || props.radio.slide) {
        const newChannel = generateRadioChannel(allUsedChannels);
        sendWebhook(newChannel);
        await createItem<RadioUpdate, Radio>(
          DatabaseTable.RADIOS,
          {
            channel: newChannel,
            main: props.radio.main,
            slide: props.radio.slide ?? false,
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

  return (
    <div className='RadioChannel'>
      <p className="ChannelLabel">{props.radio.channel}</p>
      {!props.radio.burned && (
        <div className="ChannelActions">
          <button className="ui icon negative button" disabled={loading} onClick={() => handleBurnChannel()}>
            <i className="fire icon" />
          </button>
        </div>
      )}
    </div>
  );
}

export default RadioChannel;