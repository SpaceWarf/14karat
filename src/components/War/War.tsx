import './War.scss';
import Header from '../Common/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { OUR_TIMER_UP, THEIR_TIMER_UP, getSlideTimer, getTimeSince } from '../../utils/time';
import { useEffect, useState } from 'react';
import { getWebhookById, updateWarInfo } from '../../utils/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { Webhook } from '../../state/webhook';
import { triggerDiscordWebhook } from '../../services/functions';
import Input from '../Common/Input';

function War() {
  const { user, isAdmin } = useAuth();
  const { warInfo } = useSelector((state: RootState) => state.warInfo);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingWebhook, setLoadingWebhook] = useState<boolean>(false);
  const [webhook, setWebhook] = useState<Webhook>();
  const [webhookSuccess, setWebhookSuccess] = useState<boolean>(false);
  const [group, setGroup] = useState<string>('');

  useEffect(() => {
    const fetchWebhook = async () => {
      setLoadingWebhook(true);
      setWebhook(await getWebhookById('score-update'));
      setLoadingWebhook(false);
    }

    if (warInfo.group) {
      setGroup(warInfo.group);
    }

    if (isAdmin) {
      fetchWebhook();
    }
  }, [isAdmin, warInfo]);

  const getTimeString = (): string => {
    return warInfo.endedAt ? getTimeSince(new Date(), new Date(warInfo.endedAt)) : '0 days';
  }

  const getScoreClass = (): string => {
    if (warInfo.kills === undefined || warInfo.deaths === undefined) {
      return '';
    }

    if (warInfo.kills > warInfo.deaths) {
      return 'green';
    } else if (warInfo.kills < warInfo.deaths) {
      return 'red';
    }
    return 'yellow';
  }

  const handleAddKill = () => {
    setLoading(true);
    updateWarInfo(warInfo.id, { kills: warInfo.kills ? warInfo.kills + 1 : 1 }, user);
    setLoading(false);
  }

  const handleRemoveKill = () => {
    setLoading(true);
    updateWarInfo(warInfo.id, { kills: warInfo.kills ? warInfo.kills - 1 : 0 }, user);
    setLoading(false);
  }

  const handleAddDeath = () => {
    setLoading(true);
    updateWarInfo(warInfo.id, { deaths: warInfo.deaths ? warInfo.deaths + 1 : 1 }, user);
    setLoading(false);
  }

  const handleRemoveDeath = () => {
    setLoading(true);
    updateWarInfo(warInfo.id, { deaths: warInfo.deaths ? warInfo.deaths - 1 : 0 }, user);
    setLoading(false);
  }

  const handleEndWar = () => {
    setLoading(true);
    updateWarInfo(warInfo.id, { endedAt: new Date().toISOString() }, user);
    setLoading(false);
  }

  const handleSendToDiscord = () => {
    if (webhook) {
      setLoadingWebhook(true);
      triggerDiscordWebhook({
        url: webhook.url,
        content: `Current Score: **${warInfo.kills || 0} - ${warInfo.deaths || 0}**`
      }).then(() => {
        setLoadingWebhook(false);
        setWebhookSuccess(true);
        setTimeout(() => setWebhookSuccess(false), 1000);
      }).catch(error => {
        setLoadingWebhook(false);
        console.error(error);
      });
    }
  }

  const handleGroupUpdate = (group: string) => {
    setGroup(group);
    updateWarInfo(warInfo.id, { group }, user);
  }

  return (
    <div className="War">
      <Header text='War Info' decorated />
      <div className='content'>
        {warInfo.endedAt && (
          <div className='LastWar'>
            <h3>Congratulations everybody, we officially made it</h3>
            <h2>{getTimeString()}</h2>
            <h3>since the last war!</h3>
          </div>
        )}
        {!warInfo.endedAt && (
          <>
            <div className='Rules'>
              <div>
                <h4>Standard War Procedure</h4>
                <ul>
                  <li>No bleets related to the war.</li>
                  <li>Do not hangout alone at the block.</li>
                  <li>Always carry a gun & armour.</li>
                  <li>Do not wear your katana or chain.</li>
                  <li>Working at businesses is allowed.</li>
                </ul>
              </div>
            </div>
            <div className='CurrentWar'>
              <div className='Controls'>
                <div className='ui form'>
                  {isAdmin ? (
                    <Input
                      type="text"
                      name="group"
                      placeholder="Group"
                      icon="group"
                      value={group}
                      onChange={handleGroupUpdate}
                    />
                  ) : (
                    <h2>{warInfo.group || 'New Group'}</h2>
                  )}
                </div>
                <div className='Score'>
                  <div className='KillControls'>
                    {isAdmin && (
                      <div className="mini ui vertical buttons">
                        <button
                          className='ui button positive hover-animation'
                          disabled={loading}
                          onClick={handleAddKill}
                        ><i className='add icon' /> </button>
                        <button
                          className='ui button negative hover-animation'
                          disabled={loading}
                          onClick={handleRemoveKill}
                        ><i className='minus icon' /> </button>
                      </div>
                    )}
                  </div>
                  <h1 className={getScoreClass()}>{warInfo.kills} - {warInfo.deaths}</h1>
                  <div className='DeathControls'>
                    {isAdmin && (
                      <div className="mini ui vertical buttons">
                        <button
                          className='ui button positive hover-animation'
                          disabled={loading}
                          onClick={handleAddDeath}
                        ><i className='add icon' /> </button>
                        <button
                          className='ui button negative hover-animation'
                          disabled={loading}
                          onClick={handleRemoveDeath}
                        ><i className='minus icon' /> </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className='ActionsContainer'>
                  {isAdmin && (
                    <>
                      <div className='DiscordAction'>
                        <button
                          className='ui button positive hover-animation'
                          disabled={loading || loadingWebhook || !webhook}
                          onClick={handleSendToDiscord}
                        >
                          <p className='label contrast'>Send to Discord</p>
                          <p className='IconContainer contrast'><i className='discord icon'></i></p>
                        </button>
                        {webhookSuccess && <i className="check circle icon"></i>}
                      </div>
                      <button
                        className='ui button negative hover-animation'
                        disabled={loading}
                        onClick={handleEndWar}
                      >
                        <p className='label contrast'>End War</p>
                        <p className='IconContainer contrast'><i className='handshake icon'></i></p>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='Timers'>
              <div className='OurTimer'>
                <h2>Our Timer</h2>
                <h1 className={getSlideTimer(warInfo.ourSlide, OUR_TIMER_UP) === OUR_TIMER_UP ? 'green' : 'red'}>
                  {getSlideTimer(warInfo.ourSlide, OUR_TIMER_UP)}
                </h1>
              </div>
              <div className='TheirTimer'>
                <h2>Their Timer</h2>
                <h1 className={getSlideTimer(warInfo.theirSlide, THEIR_TIMER_UP) === THEIR_TIMER_UP ? 'red' : 'green'}>
                  {getSlideTimer(warInfo.theirSlide, THEIR_TIMER_UP)}
                </h1>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


export default War;
