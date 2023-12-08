import './UnchainedCard.scss';

function UnchainedCard() {
  return (
    <div className="UnchainedCard ui card attached external">
      <div className="content">
        <div className='header'>
          <p><i className='smile outline icon' /> Welcome to the gang</p>
        </div>
        <div className='TextContainer'>
          <p>
            We are pleased to have you as a part of us! As a new hangaround / recruit, you face your hardest challenge yet: proving your skills, and impressing us.
            We are expecting a lot from you, and we will be pushing you to find out exactly what you're capable of. Here's examples of things we are looking for in
            our new members:
          </p>
          <ul>
            <li>Always be available to help other members, whether it is a pickup from jail, from a job, or a VIP;</li>
            <li>Show initiative, never be sat on your arse doing nish, be willing to put yourself out there and do jobs and help;</li>
            <li>If you don't know what to do at any given time, hit stores, houses, and warehouses, these are the simple jobs that help out the gang the most;</li>
            <li>Be willing to learn as much as you can from senior members, but also be willing to teach us, knowledge goes both ways.</li>
          </ul>
          <p>
            Above everything else, have fun. We're not here to make your life harder, if you have problems with anything, reach out to an Enforcer, they will
            be more than willing to talk with you and help sort it out. The biggest thing we want to avoid is a member having problems and not being willing to resolve
            them, and bringing the entire mood of the group down with them.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UnchainedCard;
