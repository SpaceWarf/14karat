import './War.scss';
import Header from '../Common/Header';
import { useSelector } from 'react-redux';
import { OUR_TIMER_UP, THEIR_TIMER_UP, getSlideTimer, getTimeSince } from '../../utils/time';
import { useEffect, useState } from 'react';
import { createWarInfo, deleteWarClip, getWarClipsForWar, getWebhookById, updateWarInfo } from '../../utils/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { Webhook } from '../../state/webhook';
import { triggerDiscordWebhook } from '../../services/functions';
import Input from '../Common/Input';
import { getMostRecentWar } from '../../redux/selectors/wars';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { RootState } from '../../redux/store';
import Gallery from '../Common/Gallery';
import NewWarClipModal from './NewWarClipModal';
import { WarClip } from '../../state/war';
import { GalleryItem } from '../../state/gallery';
import ExpandWarClipModal from './ExpandWarClipModal';

function War() {
  const { user, isAdmin } = useAuth();
  const war = useSelector(getMostRecentWar);
  const profile = useSelector((state: RootState) => state.profile);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingWebhook, setLoadingWebhook] = useState<boolean>(false);
  const [webhook, setWebhook] = useState<Webhook>();
  const [scoreWebhookSuccess, setScoreWebhookSuccess] = useState<boolean>(false);
  const [timerWebhookSuccess, setTimerWebhookSuccess] = useState<boolean>(false);
  const [group, setGroup] = useState<string>('');
  const [editingOurTimer, setEditingOurTimer] = useState<boolean>(false);
  const [ourSlide, setOurSlide] = useState<Dayjs>(dayjs());
  const [editingTheirTimer, setEditingTheirTimer] = useState<boolean>(false);
  const [theirSlide, setTheirSlide] = useState<Dayjs>(dayjs());
  const [clips, setClips] = useState<WarClip[]>([]);

  useEffect(() => {
    const fetchWebhook = async () => {
      setLoadingWebhook(true);
      setWebhook(await getWebhookById('score-update'));
      setLoadingWebhook(false);
    }

    if (canEdit()) {
      fetchWebhook();
    }
  }, [isAdmin, profile]);

  useEffect(() => {
    const fetchClips = async () => {
      setClips(await getWarClipsForWar(war.id));
    }

    if (war) {
      if (war.group) {
        setGroup(war.group);
      }

      if (war.ourSlide) {
        setOurSlide(dayjs(war.ourSlide));
      }

      if (war.theirSlide) {
        setTheirSlide(dayjs(war.theirSlide));
      }

      fetchClips();
    }
  }, [war]);

  const canEdit = (): boolean => {
    return isAdmin || profile.info.roles.includes('enforcer');
  }

  const getTimeString = (): string => {
    return war.endedAt ? getTimeSince(new Date(), new Date(war.endedAt)) : '0 days';
  }

  const getScoreClass = (): string => {
    if (war.kills === undefined || war.deaths === undefined) {
      return '';
    }

    if (war.kills > war.deaths) {
      return 'green';
    } else if (war.kills < war.deaths) {
      return 'red';
    }
    return 'yellow';
  }

  const handleAddKill = () => {
    setLoading(true);
    updateWarInfo(war.id, { kills: war.kills ? war.kills + 1 : 1 }, user);
    setLoading(false);
  }

  const handleRemoveKill = () => {
    setLoading(true);
    updateWarInfo(war.id, { kills: war.kills ? war.kills - 1 : 0 }, user);
    setLoading(false);
  }

  const handleAddDeath = () => {
    setLoading(true);
    updateWarInfo(war.id, { deaths: war.deaths ? war.deaths + 1 : 1 }, user);
    setLoading(false);
  }

  const handleRemoveDeath = () => {
    setLoading(true);
    updateWarInfo(war.id, { deaths: war.deaths ? war.deaths - 1 : 0 }, user);
    setLoading(false);
  }

  const handleEndWar = () => {
    setLoading(true);
    setGroup('');
    updateWarInfo(war.id, { endedAt: new Date().toISOString() }, user);
    setLoading(false);
  }

  const handleDeclareWar = () => {
    setLoading(true);
    createWarInfo({
      group: 'New War',
      kills: 0,
      deaths: 0,
    }, user);
    setLoading(false);
  }

  const handleSendScoreToDiscord = () => {
    if (webhook) {
      setLoadingWebhook(true);
      triggerDiscordWebhook({
        url: webhook.url,
        content: `Current Score: **${war.kills || 0} - ${war.deaths || 0}**`
      }).then(() => {
        setLoadingWebhook(false);
        setScoreWebhookSuccess(true);
        setTimeout(() => setScoreWebhookSuccess(false), 1000);
      }).catch(error => {
        setLoadingWebhook(false);
        console.error(error);
      });
    }
  }

  const handleSendTimersToDiscord = () => {
    if (webhook) {
      setLoadingWebhook(true);
      triggerDiscordWebhook({
        url: webhook.url,
        content: `Our Timer: **${getSlideTimer(war.ourSlide, OUR_TIMER_UP)}**\nTheir Timer: **${getSlideTimer(war.theirSlide, THEIR_TIMER_UP)}**`
      }).then(() => {
        setLoadingWebhook(false);
        setTimerWebhookSuccess(true);
        setTimeout(() => setTimerWebhookSuccess(false), 1000);
      }).catch(error => {
        setLoadingWebhook(false);
        console.error(error);
      });
    }
  }

  const handleGroupUpdate = (group: string) => {
    setGroup(group);
    updateWarInfo(war.id, { group }, user);
  }

  const handleOurSlideUpdate = () => {
    setLoading(true);
    updateWarInfo(war.id, { ourSlide: ourSlide.toDate().toISOString() }, user);
    setEditingOurTimer(false);
    setLoading(false);
  }

  const handleOurSlideClear = () => {
    setLoading(true);
    setOurSlide(dayjs());
    updateWarInfo(war.id, { ourSlide: '' }, user);
    setEditingOurTimer(false);
    setLoading(false);
  }

  const handleTheirSlideUpdate = () => {
    setLoading(true);
    updateWarInfo(war.id, { theirSlide: theirSlide.toDate().toISOString() }, user);
    setEditingTheirTimer(false);
    setLoading(false);
  }

  const handleTheirSlideClear = () => {
    setLoading(true);
    setTheirSlide(dayjs());
    updateWarInfo(war.id, { theirSlide: '' }, user);
    setEditingTheirTimer(false);
    setLoading(false);
  }

  const getOrderedClips = (): GalleryItem[] => {
    return [...clips]
      .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
      .map(clip => ({
        id: clip.id,
        embed: clip.embed,
        notes: clip.notes,
        tags: [],
      }));
  }

  const handleDeleteClip = async (id: string) => {
    await deleteWarClip(id, user);
    setClips(await getWarClipsForWar(war.id))
  }

  return (
    <div className="War">
      <Header text='War Info' decorated />
      {war && <div className='content'>
        {war.endedAt && (
          <div className='LastWar'>
            <h3>Congratulations everybody, we officially made it</h3>
            <h2>{getTimeString()}</h2>
            <h3>since the last war!</h3>
            {canEdit() && (
              <button
                className='ui button negative hover-animation'
                disabled={loading}
                onClick={handleDeclareWar}
              >
                <p className='label contrast'>Declare War</p>
                <p className='IconContainer contrast'><i className='bomb icon'></i></p>
              </button>
            )}
          </div>
        )}
        {!war.endedAt && (
          <>
            <div className='DetailsContainer'>
              <div className='Timers'>
                <div className='OurTimer'>
                  <div className='Header'>
                    <h2>Our Timer</h2>
                    {canEdit() && (
                      <button className='ui icon button Collapse' onClick={() => setEditingOurTimer(!editingOurTimer)}>
                        <i className='clock icon' />
                      </button>
                    )}
                  </div>
                  {!editingOurTimer && (
                    <h1 className={getSlideTimer(war.ourSlide, OUR_TIMER_UP) === OUR_TIMER_UP ? 'green' : 'red'}>
                      {getSlideTimer(war.ourSlide, OUR_TIMER_UP)}
                    </h1>
                  )}
                  {editingOurTimer && (
                    <div className='DateTimePickerContainer'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Last Slide Start"
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                          openTo="hours"
                          value={ourSlide}
                          onChange={value => setOurSlide(dayjs(value))}
                        />
                      </LocalizationProvider>
                      <button
                        className='ui button positive hover-animation'
                        disabled={loading}
                        onClick={handleOurSlideUpdate}
                      ><i className='check icon' /></button>
                      <button
                        className='ui button negative hover-animation'
                        disabled={loading}
                        onClick={handleOurSlideClear}
                      ><i className='trash icon' /></button>
                    </div>
                  )}
                </div>
                <div className='TheirTimer'>
                  <div className='Header'>
                    <h2>Their Timer</h2>
                    {canEdit() && (
                      <button className='ui icon button Collapse' onClick={() => setEditingTheirTimer(!editingTheirTimer)}>
                        <i className='clock icon' />
                      </button>
                    )}
                  </div>
                  {!editingTheirTimer && (
                    <h1 className={getSlideTimer(war.theirSlide, THEIR_TIMER_UP) === THEIR_TIMER_UP ? 'red' : 'green'}>
                      {getSlideTimer(war.theirSlide, THEIR_TIMER_UP)}
                    </h1>
                  )}
                  {editingTheirTimer && (
                    <div className='DateTimePickerContainer'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Last Slide Start"
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                          openTo="hours"
                          value={theirSlide}
                          onChange={value => setTheirSlide(dayjs(value))}
                        />
                      </LocalizationProvider>
                      <button
                        className='ui button positive hover-animation'
                        disabled={loading}
                        onClick={handleTheirSlideUpdate}
                      ><i className='check icon' /></button>
                      <button
                        className='ui button negative hover-animation'
                        disabled={loading}
                        onClick={handleTheirSlideClear}
                      ><i className='trash icon' /></button>
                    </div>
                  )}
                </div>
                {canEdit() && (
                  <div className='DiscordAction'>
                    <button
                      className='ui button positive hover-animation'
                      disabled={loading || loadingWebhook || !webhook}
                      onClick={handleSendTimersToDiscord}
                    >
                      <p className='label contrast'>Send Timer Notification</p>
                      <p className='IconContainer contrast'><i className='discord icon'></i></p>
                    </button>
                    {timerWebhookSuccess && <i className="check circle icon"></i>}
                  </div>
                )}
              </div>
              <div className='CurrentWar'>
                <div className='Controls'>
                  <div className='ui form'>
                    {canEdit() ? (
                      <Input
                        type="text"
                        name="group"
                        placeholder="Group"
                        icon="group"
                        value={group}
                        onChange={handleGroupUpdate}
                      />
                    ) : (
                      <h2>{war.group || 'New Group'}</h2>
                    )}
                  </div>
                  <div className='Score'>
                    <div className='KillControls'>
                      {canEdit() && (
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
                    <h1 className={getScoreClass()}>{war.kills} - {war.deaths}</h1>
                    <div className='DeathControls'>
                      {canEdit() && (
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
                    {canEdit() && (
                      <>
                        <div className='DiscordAction'>
                          <button
                            className='ui button positive hover-animation'
                            disabled={loading || loadingWebhook || !webhook}
                            onClick={handleSendScoreToDiscord}
                          >
                            <p className='label contrast'>Send Score Notification</p>
                            <p className='IconContainer contrast'><i className='discord icon'></i></p>
                          </button>
                          {scoreWebhookSuccess && <i className="check circle icon"></i>}
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
            </div>
            <div className='GalleryContainer'>
              <Header text='Gallery' decorated />
              {canEdit() && <NewWarClipModal onAdd={async () => setClips(await getWarClipsForWar(war.id))} />}
              <Gallery
                items={getOrderedClips()}
                tags={[]}
                onDelete={handleDeleteClip}
                expandModal={<ExpandWarClipModal onDelete={handleDeleteClip} />}
              />
            </div>
          </>
        )}
      </div>}
    </div>
  );
}


export default War;
