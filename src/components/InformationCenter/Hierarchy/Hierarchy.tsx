import './Hierarchy.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Common/Header';
import hierarchy from '../../../assets/images/hierarchy.jpg';

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
            <h1>Oyabun (Boss)</h1>
            <div className='Role'>
              <p>
                Oyabun are the highest-ranking members of the group. They have ultimate authority within the organization and hold the power to make important
                decisions, set the direction of the group, and oversee its criminal operations.
              </p>
              <p>
                The role of the Oyabun extends beyond just leadership; they are also expected to provide guidance and protection to their subordinates, as well
                as maintain order and discipline within the family. Loyalty, respect, and adherence to the Oyabun's directives are paramount in the hierarchy.
              </p>
              <p>
                The Oyabuns are under the protection of <a href='/information-center/spirits-and-guardians#komainu' target='_blank' rel="noreferrer">Koma inu (狛犬)</a>,
                a twin pair of mythical lions with the power to repel evil. Koma inu are a symbol of yin and yang, with one lion being typically depicted with its
                mouth open, symbolizing courage and strength, and the other lion depicted with its mouth closed, symbolizing wisdom and prudence.
              </p>
            </div>
          </div>
          <div className='Division'>
            <h1>Wakagashira (Heads)</h1>
            <div className='Role'>
              <p>
                Wakagashira are high-ranking members who are second-in-command to the Oyabun. This role involves significant authority and responsibility, as they
                are tasked with assisting the Oyabun in leading the family. They may be in charge of day-to-day operations, managing lower-ranking members, and
                overseeing various activities. The Wakagashira often acts as a bridge between the Oyabun and the other members, helping to maintain discipline,
                enforce the family's rules, and mediate disputes.
              </p>
              <p>
                Wakagashira are under the protection of various spirits depending on their specific role within the family.
              </p>
            </div>
            <div className='Role'>
              <h2>Intelligence Head (Fox's Head)</h2>
              <p>
                Intelligence Heads are responsible for gathering and managing information critical to the organization's activities and decision-making. Their
                role involves espionage, surveillance, and information analysis and they are tasked with monitoring rival gangs, tracking law enforcement
                activities, and keeping an eye on potential threats or opportunities within the criminal underworld. They play a vital role in helping the
                family stay one step ahead of their adversaries and maintain their operations.
              </p>
              <p>
                Intelligence Heads are under the protection of <a href='/information-center/spirits-and-guardians#kitsune/' target='_blank' rel="noreferrer">Kitsune (狐)</a>,
                intelligent fox spirits known for their ageless wisdom. Kitsune are depicted with multiple tails, the number of tails representing their age and wisdom.
              </p>
            </div>
            <div className='Role'>
              <h2>Operations Head (Crow's Head)</h2>
              <p>
                Operations Heads are high-ranking members responsible for overseeing and coordinating the day-to-day criminal activities and operations of the
                organization. Their role involves planning, executing, and managing various criminal activities and heists. Operations Heads play a crucial role
                in maintaining the family's revenue streams and territorial control. These officers are expected to be strategic, resourceful, and decisive in
                their decision-making.
              </p>
              <p>
                Operation Heads are under the protection of <a href='/information-center/spirits-and-guardians#yatagarasu/' target='_blank' rel="noreferrer">Yatagarasu (八咫烏)</a>,
                a three legged crow spirit tasked with navigation and guidance, and with steering groups towards the right path.
              </p>
            </div>
            <div className='Role'>
              <h2>Ceremonies Head (Phoenix's Head)</h2>
              <p>
                Ceremonies Heads hold a unique and symbolic role within the organization. They are responsible for overseeing and conducting various rituals
                and ceremonies that are integral to the family's traditions and code of conduct. They oversee rituals related to initiation ceremonies,
                promotions, blood oaths, and other important events.
              </p>
              <p>
                Ceremonies Heads are under the protection of <a href='/information-center/spirits-and-guardians#houou/' target='_blank' rel="noreferrer">Hōō (鳳凰)</a>,
                a phoenix spirit with immense cultural significance that symbolizes beauty, change, and harmony.
              </p>
            </div>
            <div className='Role'>
              <h2>Enforcement Head (Tiger's Head)</h2>
              <p>
                Enforcement Heads are responsible for ensuring that the organization's rules and directives are carried out with authority and, if necessary,
                by force. Enforcers play a crucial role in maintaining discipline and control within the family. Enforcement Heads are often known for their
                assertiveness, decisiveness, and their readiness to use intimidation or violence to handle conflicts or disputes, both within the organization
                and with external parties. Enforcers may oversee matters related to debt collection, beatdowns, and enforcement of the organization's territorial
                boundaries. Enforcement Heads are both respected and feared, as they are entrusted with ensuring the family's code of conduct and its unwritten
                laws.
              </p>
              <p>
                Enforcement Heads are under the protection of <a href='/information-center/spirits-and-guardians#byakko/' target='_blank' rel="noreferrer">Byakko (白虎)</a>,
                a powerful white tiger spirit that offers defense against evil forces, and symbolizes valor and protection.
              </p>
            </div>
          </div>
          <div className='Division'>
            <h1>Shateigashira (Leads)</h1>
            <div className='Role'>
              <h2>Intelligence Lead (Fox's Tail)</h2>
              <p>
                Intelligence Leads are second to the Intelligence Heads. They oversee more or less the same responsibilities but are not directly included in
                high-ranking member meetings, instead focusing on managing the link between the lower and higher ranks in the hierarchy.
              </p>
              <p>
                Intelligence Leads are also under the protection of the <a href='/information-center/spirits-and-guardians#kitsune/' target='_blank' rel="noreferrer">Kitsune (狐)</a>.
              </p>
            </div>
            <div className='Role'>
              <h2>Operations Lead (Crow's Beak)</h2>
              <p>
                Operations Leads are second to the Operations Heads. They oversee more or less the same responsibilities but are not directly included in
                high-ranking member meetings, instead focusing on managing the link between the lower and higher ranks in the hierarchy.
              </p>
              <p>
                Operations Leads are also under the protection of <a href='/information-center/spirits-and-guardians#yatagarasu/' target='_blank' rel="noreferrer">Yatagarasu (八咫烏)</a>.
              </p>
            </div>
            <div className='Role'>
              <h2>Ceremonies Lead (Phoenix's Feather)</h2>
              <p>
                Ceremonies Leads are second to the Ceremonies Heads. They oversee more or less the same responsibilities but are not directly included in
                high-ranking member meetings, instead focusing on managing the link between the lower and higher ranks in the hierarchy.
              </p>
              <p>
                Ceremonies Leads are also under the protection of <a href='/information-center/spirits-and-guardians#houou/' target='_blank' rel="noreferrer">Hōō (鳳凰)</a>.
              </p>
            </div>
            <div className='Role'>
              <h2>Enforcement Lead (Tiger's Claw)</h2>
              <p>
                Enforcement Leads are second to the Enforcement Heads. They oversee more or less the same responsibilities but are not directly included
                in high-ranking member meetings, instead focusing on managing the link between the lower and higher ranks in the hierarchy.
              </p>
              <p>
                Enforcement Leads are also under the protection of <a href='/information-center/spirits-and-guardians#byakko/' target='_blank' rel="noreferrer">Byakko (白虎)</a>.
              </p>
            </div>
          </div>
          <div className='Division'>
            <h1>Kobun (Operatives)</h1>
            <div className='Role'>
              <p>
                Kobun are low-ranking members who play a crucial role in the day-to-day operations of the family. These individuals are often the backbone
                of the group, and responsible for carrying out various tasks that contribute to the organization's overall objectives such as heists, debt
                collection, acts of violence, etc. While they hold relatively low positions in the hierarchy, Kobun are essential for operations.
              </p>
              <p>
                Kobun are under the protection of <a href='/information-center/spirits-and-guardians#inugami/' target='_blank' rel="noreferrer">Inugami (犬神)</a>,
                a dog spirit said to bring protection and good fortune, but also capable of bringing vengeance and destruction.
              </p>
            </div>
          </div>
          <div className='Division'>
            <h1>Shatei (Recruits)</h1>
            <div className='Role'>
              <p>
                Shatei are apprentices in the early stages of their career. The role of Shatei is akin to that of a junior member. They are still learning
                the ropes and working their way up the organization's hierarchy and are often responsible for performing various tasks and errands for
                higher-ranking members. These tasks may include running errands, handling minor criminal activities, and generally providing support to their
                superiors.
              </p>
              <p>
                Shatei are not under the protection of any spirit as they are not blooded in members of the family. They are referred to
                as <a href='/information-center/spirits-and-guardians#ikiryou/' target='_blank' rel="noreferrer">Ikiryō (生霊)</a>, or living spirits, as their
                connection between their body and spirit is still alive. That connection is severed as part of the blood-in process.
              </p>
            </div>
          </div>
          <div className='Division'>
            <h1>Hangarounds</h1>
            <div className='Role'>
              <p>
                Hangarounds are prospective members or newcomers who are exploring the possibility of becoming involved with the family. They are not yet
                initiated or considered full-fledged members of the organization. Instead, they spend time with established members, getting to know the
                culture, rules, and operations of the group. Hangarounds often perform various tasks, such as running errands or assisting with minor activities
                to prove their commitment and loyalty to the family.
              </p>
              <p>
                Hangarounds are not under the protection of any spirit as they are not blooded in members of the family, and they don't hold any particular
                title of note until the start of their recruitment process.
              </p>
            </div>
          </div>
          <div className='Division'>
            <h1>Special Roles</h1>
            <div className='Role'>
              <h2>Raijū (Onryō)</h2>
              <p>
                <a href='/information-center/spirits-and-guardians#raijuu/' target='_blank' rel="noreferrer">Raijū (雷獣)</a> are highly skilled and trusted members of
                the organization who excel in various aspects of enforcement, and are known for their proficiency in physical combat, weapons handling, and tactics.
                These individuals are often handpicked for their exceptional abilities and dedication to the family. Raijū are called upon for missions that require
                precision, stealth, and decisiveness. They are highly respected within the organization, and they command a level of fear and admiration among their
                peers and rivals. It is believed that whenever lightning strikes, it is because a Raijū was sent to exact revenge.
              </p>
              <p>
                Raijū are also referred to as <a href='/information-center/spirits-and-guardians#onryou/' target='_blank' rel="noreferrer">Onryō (怨霊)</a>, or
                vengeful spirits, and are associated with intense emotions such as anger, hatred, and a desire for revenge. They are used as a weapon to achieve
                revenge on those who have wronged the family.
              </p>
            </div>
            <div className='Role'>
              <h2>Administrator (Kyōrinrin)</h2>
              <p>
                Administrators are responsible for overseeing various administrative and organizational aspects of the family. Their role primarily focuses
                on managing the internal affairs, logistics, finances, and record-keeping of the organization.
              </p>
              <p>
                Administrators are also referred to as <a href='/information-center/spirits-and-guardians#kyourinrin/' target='_blank' rel="noreferrer">Kyōrinrin (経凛々)</a>,
                a spirit of knowledge formed from ancient scrolls, books, and scriptures.
              </p>
            </div>
            <div className='Role'>
              <h2>Clean Person (Ryūgū warashi)</h2>
              <p>
                Clean persons refers to individuals who are not directly involved in criminal activities and who maintain a distance from illegal operations.
                Although affiliated with the organization, this affiliation must remain secretive as they cannot be publicly associated with the family. Clean
                persons serve the role of owning and managing stash houses so they are not known to legal observers.
              </p>
              <p>
                Clean persons are also referred to as <a href='/information-center/spirits-and-guardians#ryuuguuwarashi/' target='_blank' rel="noreferrer">Ryūgū warashi (竜宮童子)</a>,
                or child from the dragon palace, which are child spirits that bring countless riches to their parents. Overtime, as they become less and less clean, they are
                forced by their parents to bathe, or they are kicked out of the house, prompting the family to lose all the riches brought to them by the Ryūgū warashi.
              </p>
            </div>
            <div className='Role'>
              <h2>Dead Spirits (Shiryō)</h2>
              <p>
                If a blooded-in member ever decides to leave the family, they will go through a blood-out ritual where their body is killed and their spirit
                released. Blooded-out members are known as <a href='/information-center/spirits-and-guardians#shiryou/' target='_blank' rel="noreferrer">Shiryō (死霊)</a>,
                or dead spirits, and are never to be welcomed back in the organization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Hierarchy;
