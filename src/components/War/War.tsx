import './War.scss';
import Header from '../Common/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getTimeSince } from '../../utils/time';
import { useState } from 'react';
import { updateWarInfo } from '../../utils/firestore';
import { useAuth } from '../../contexts/AuthContext';

function War() {
  const { user, isAdmin } = useAuth();
  const { warInfo } = useSelector((state: RootState) => state.warInfo);
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <div className="War">
      <Header text={`${warInfo.endedAt ? 'No' : warInfo.group} War`} decorated />
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
                  <li>Working at businesses is allowed.</li>
                  <li>Do not hangout alone at the block.</li>
                  <li>Always carry a gun & armour.</li>
                  <li>Do not wear your katana or chain.</li>
                </ul>
              </div>
            </div>
            <div className='CurrentWar'>
              <div className='Controls'>
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
                <div className='EndWarContainer'>
                  {isAdmin && (
                    <button
                      className='ui button negative hover-animation'
                      disabled={loading}
                      onClick={handleEndWar}
                    >
                      <p className='label contrast'>End War</p>
                      <p className='IconContainer contrast'><i className='handshake icon'></i></p>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className='Asset'>
              {warInfo.asset && <img src={warInfo.asset} alt='War Asset' />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


export default War;
