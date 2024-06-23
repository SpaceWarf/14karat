import './RoninCard.scss';

function RoninCard() {
  return (
    <div className="RoninCard ui card attached external">
      <div className="content">
        <div className='header'>
          <p><i className='heart outline icon' /> We love Ronin!</p>
        </div>
        <div className='TextContainer'>
          <p>
            This account will give you access to a subset of HK's website's features:
          </p>
          <ul>
            <li><b>Radios</b>: view all the active radios and burn them if necessary;</li>
            <li><b>Hacking</b>: view and practice hacks used on jobs;</li>
            <li><b>War Info</b>: view the current war stats and slide timers.</li>
          </ul>
          <p>
            Please do not share this account under any circumstances. If someone else wants access, direct them to Robin on Discord.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoninCard;
