import './Hierarchy.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Common/Header';
import hierarchy from '../../../assets/images/hierarchy.png';

function Hierarchy() {
  const navigate = useNavigate();

  return (
    <div className="Hierarchy">
      <Header text='Gang Hierarchy' decorated />
      <div className='content'>
        <div className="actions">
          <p className="back-button" onClick={() => navigate('/information-center')}><i className='arrow left icon' /> back</p>
        </div>
        <div className='ImageContainer'>
          <img src={hierarchy} alt='Hierarchy' />
        </div>
        <div className='TextContainer'>
          <div className='Division'>
            <h1>Leaders</h1>
            <div className='Role'>
              <h2>Dragon's Head (Mountain Master)</h2>
              <p>
                This position oversees the entirety of all organization operations and on goings and delegates tasks amongst officer ranks.
                The Dragon Head is the leader of the group, and ultimately makes all final decisions with the organization's best interest in mind.
                All information passes through this person and is trickled down the chain via officers, enforcers.
              </p>
            </div>
            <div className='Role'>
              <h2>Deputy (Deputy Mountains Master)</h2>
              <p>
                This position is the second-hand to the Dragon Head and assumes their mantle when not available.
                This person is also involved in overseeing the success of all group members and keeping higher-ranking officers accountable for their responsibilities.
              </p>
            </div>
          </div>
          <div className='Division'>
            <h1>Officers</h1>
            <div className='Role'>
              <h2>Operations Officer (Vanguard)</h2>
              <p>
                This position is split into two sections: The Heist and The Drug ops.
                All operations involving the arrangement of jobs is planned by The Heist Operations Officer.
                This person is the go-to for all heist-oriented questions, This person will keep track of all tools for heists
                and maintaining that stock and informing the group when running low of certain tools or devices.
                The Drug Operations Officer oversees all drug sales, planting, growing, etc...
              </p>
            </div>
            <div className='Role'>
              <h2>Ceremonies Officer (Incense Master)</h2>
              <p>
                This position oversees the execution and coordination of planning events for the organization, as well as meetings.
              </p>
            </div>
            <div className='Role'>
              <h2>Intelligence Officer (The Eyes)</h2>
              <p>
                This person is delegated with the task on maintaining the proactive nature acquiring of information to fill in our documents as
                being on top of said documents to make sure any and all information is accurate to cite when needed.
              </p>
            </div>
          </div>
          <div className='Division'>
            <h1>Supervisors</h1>
            <div className='Role'>
              <h2>Operations Supervisor (Knight)</h2>
              <p>
                This rank is designed for the exclusive purpose to organizing and coordinating jobs this person will gather and setup teams
                to head out to do heists whenever an Operations Officer, Deputy, or Dragon Head isn't available.
                They are meant to fill in and make sure the gang or more importantly the initiates are always getting into something to
                hone and practice their designated skills.
              </p>
            </div>
            <div className='Role'>
              <h2>Enforcer (Red Pole)</h2>
              <p>
                Primary purpose is to be the stonewall of the organization, if/when muscle is needed these are your goto people.
                They attend any and all meetings with other gangs regardless of the topic. During times of conflict they are meant to
                lead the attack teams regardless on if there are officers+ in that group. If someone is pressing on the gang it falls on the
                Enforcer's judgement on what sort of call will be made in response and this decision is intended to be respected and backed by any
                rank both above and below. Outside of conflict this rank still remains as a supervisory position they are meant to guide any foot
                soldiers and initiates. Enforce gang policy inhouse. And aim at reinforcing any weak points to guarantee this organizations success.
              </p>
            </div>
            <div className='Role'>
              <h2>Administrator (White Paper Fan)</h2>
              <p>
                Coming Soon...
              </p>
            </div>
          </div>
          <div className='Division'>
            <h1>Members</h1>
            <div className='Role'>
              <h2>Intelligence Emissaries (The Ears)</h2>
              <p>
                The people assigned to this role are apart of the team tasked specifically with intaking any and all relevant information
                for our documents on an existing gangs/crews or person(s) of interest. They will keep track of affiliations/businesses/turfs/and
                anything else noteworthy. They will be the backbone of the intel gathered to be cited when needed during times of conflict or even
                just an outsider attempting to acquire information for cash.
              </p>
            </div>
            <div className='Role'>
              <h2>Foot Soldier (Ordinary Members)</h2>
              <p>
                This position is for all members who have completed their initiation process. These members are meant to accomplish jobs,
                acquire tools, and hone their skills in their selected job pathing.
              </p>
            </div>
            <div className='Role'>
              <h2>Uninitiated Members (Yellow Lanterns)</h2>
              <p>
                These are people who are in the process of being inducted within the gang by completing jobs and relevant tasks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Hierarchy;
