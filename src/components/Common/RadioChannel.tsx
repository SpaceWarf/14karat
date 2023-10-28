import { createRadio, getWebhookById, updateRadio } from "../../utils/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Radio } from "../../state/radio";
import { generateRadioChannel } from "../../utils/radio";
import profile from "../../redux/reducers/profile";
import { Webhook } from "../../state/webhook";
import { Job } from "../../state/jobs";

interface RadioChannelProps {
  radio: Radio;
  job?: Job
}

function RadioChannel(props: RadioChannelProps) {
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [webhook, setWebhook] = useState<Webhook>();

  useEffect(() => {
    const fetchWebhook = async () => {
      setWebhook(await getWebhookById('event-update'));
    }

    if (isAdmin) {
      fetchWebhook();
    }
  }, [isAdmin, profile]);

  const handleRerollChannel = async () => {
    if (props.radio) {
      setLoading(true);
      await updateRadio(props.radio.id, {
        ...props.radio,
        channel: generateRadioChannel([]),
      }, user);
      setLoading(false);
    }
  }

  const handleBurnChannel = async (create = false) => {
    if (props.radio) {
      setLoading(true);
      if (create) {
        await createRadio({
          channel: generateRadioChannel([]),
          main: false,
          burned: false,
          job: props.job?.id ?? "",
        }, user);
      }

      await updateRadio(props.radio.id, {
        ...props.radio,
        burned: true,
        burnTime: new Date().toISOString(),
      }, user);
      setLoading(false);
    }
  }

  return (
    <div className='RadioChannel'>
      <p className="ChannelLabel">{props.radio.channel}</p>
      {!props.radio.burned && (
        <div>
          <button className="ui icon button" disabled={loading} onClick={() => handleRerollChannel()}>
            <i className="refresh icon" />
          </button>
          <button className="ui icon negative button" disabled={loading} onClick={() => handleBurnChannel()}>
            <i className="fire icon" />
          </button>
        </div>
      )}
    </div>
  );
}

export default RadioChannel;