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
            This account gives you a limited access to the HK website. Your access includes the Radios pages,
            which will allow you to burn our radios whenever necessary. You also have access to the hacking page
            with which you can practice hacks for jobs.
          </p>
          <ul>
            <li><b>Radios</b>: view our active radios, and burn them when necessary;</li>
            <li><b>Hacking</b>: view and practice the hacks necessary for jobs;</li>
            <li><b>Driver Strats</b>: view our collection of rat strats and VIP spots.</li>
          </ul>
          <p>
            Please don't share this account with anyone, and don't reset the password! If you lose access to the account,
            contact Robin on Discord.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoninCard;
