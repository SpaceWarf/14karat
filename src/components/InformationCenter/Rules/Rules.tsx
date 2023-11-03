import './Rules.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Common/Header';

function Rules() {
  const navigate = useNavigate();

  return (
    <div className="Rules">
      <Header text='Gang Rules' decorated />
      <div className='content'>
        <div className="actions">
          <p className="hyperlink-button" onClick={() => navigate('/information-center')}><i className='arrow left icon' /> back</p>
        </div>
        <div className='RulesContainer'>
          <p>
            These rules and guidelines are to be followed by all members from leadership down to the newest member.
            Compliance to these guidelines are to be enforced by the enforcers and Officers with no question.
          </p>
          <ol>
            <li>
              <b>Respect.</b> It's a two way street. You give it, you get it. You don't have to like the people above you in certain positions, however,
              you must respect the position they hold. They earned it. Just as much as you earned their respect having been chained.
            </li>
            <li>
              <b>Loose Lips Sink Ships.</b> It goes without saying that the easiest way to get caught up in something is to talk about it. If you HAVEN'T
              been caught in the act….. It never happened. Do not talk about anything gang related to anyone that is not chained or wearing the flag.
              If you have to second guess whether or not to say something then don't say it. Also if you need to go explain why you gotta dip….
              Just tell 'em you got work.
            </li>
            <li>
              <b>A House Divided Cannot Stand.</b> When a problem in-house arises, that is where it WILL be handled. We do not need outside influence;
              this also shows a sense of loose lips. When inner conflict is brought up, discuss it with HR. That's what they are there for.
              Dragging drama out for everyone to see is not the way to settle it that goes for everyone, enforcers and officers alike.
            </li>
            <li>
              <b>Good Soldiers Follow Orders.</b> When an order is given it is to be followed unless it contradicts the rules and guidelines in place
              within this document. However, no one with the authority to issue orders should abuse the ability to do so. Just because a leader
              can give orders doesn't mean they should.
            </li>
            <li>
              <b>Never Drag Shit Into the House.</b> If you are being pursued by the Cops for hitting a job, do not bring the chase anywhere near Cougar Ave
              or North Del Perro at all whatsoever. Only exception is if you are being chased down by a rival set.
            </li>
            <li>
              <b>The House Always Wins.</b> Taxes are a necessary way of keeping our gang fund stimulated. The fee is to be paid on Sunday before you
              fly out for the night, if payment is late the next time taxes are due the fee will be 10K. Under extreme circumstances there MAY be an exception.
            </li>
            <li>
              <b>Time and a Place.</b> We are ultimately all here for one thing, to make money and have fun doing it. While fun is needed to maintain an entertaining
              environment, read the room not every moment is meant for jokes, especially in meeting settings.
            </li>
            <li>
              <b>The Organization Comes First.</b> Social lives are important to keeping life fresh and enjoyable. However, we should all be ready to slide in
              at a moment's notice. This means if you are in Paleto or in the Hills or at the shipyard, you need to be easily reached and hopefully able
              to meet up. If not for certain circumstances that is fine, but leadership needs to know where our people are located at incase any
              situations arise.
            </li>
            <li>
              <b>Meetings.</b> Meetings are required to have at least an Officer, and an Enforcer or Emissary present to ensure that all aspects of the meeting's
              topics are covered. Any topics discussed at a meeting are on a need to know basis. In the grand scale of things information that an Emissary
              and an Officer knows does not need to be known by a foot soldier unless directly affecting them.
            </li>
            <li>
              <b>Knowledge Is Power.</b> In the natural course of events information is bound to find itself to you, that's the job. However, when information
              falls into your lap and no matter the significance of the intel, pass it up to the Emissaries and they will verify the intel and pass it up
              as follows. Any info that is not necessarily needed to be spread around shall remain with the obtainer and the Intel Department until further
              advised.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}


export default Rules;
