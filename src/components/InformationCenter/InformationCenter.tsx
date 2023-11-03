import './InformationCenter.scss';
import Header from '../Common/Header';
import { useNavigate } from 'react-router-dom';

function InformationCenter() {
  const navigate = useNavigate();

  return (
    <div className="InformationCenter">
      <Header text='Information Center' decorated />
      <div className='content'>
        <div
          className="InformationCenterCard ui card attached link external"
          onClick={() => navigate('/information-center/hierarchy')}
        >
          <div className="content">
            <div className='header'>
              <p><i className='sitemap icon' /> Hierarchy</p>
              <button className="ui icon button" onClick={() => navigate('/information-center/hierarchy')}>
                <i className='external alternate icon' />
              </button>
            </div>
            <div className='Notes'><p>A detailed breakdown of the gang's hierarchy and power structure.</p></div>
          </div>
        </div>
        <div
          className="InformationCenterCard ui card attached link external"
          onClick={() => navigate('/information-center/rules')}
        >
          <div className="content">
            <div className='header'>
              <p><i className='numbered list icon' /> Rules</p>
              <button className="ui icon button" onClick={() => navigate('/information-center/rules')}>
                <i className='external alternate icon' />
              </button>
            </div>
            <div className='Notes'><p>A list of the rules to be respected by all gang members.</p></div>
          </div>
        </div>
        <div
          className="InformationCenterCard ui card attached link external"
          onClick={() => navigate('/information-center/lore')}
        >
          <div className="content">
            <div className='header'>
              <p><i className='book icon' /> Lore</p>
              <button className="ui icon button" onClick={() => navigate('/information-center/lore')}>
                <i className='external alternate icon' />
              </button>
            </div>
            <div className='Notes'><p>A breakdown of our lore, including our spirits, guardians, and ceremonies.</p></div>
          </div>
        </div>
        <div
          className="InformationCenterCard ui card attached link external"
          onClick={() => navigate('/information-center/jobs')}
        >
          <div className="content">
            <div className='header'>
              <p><i className='dollar sign icon' /> Job Information</p>
              <button className="ui icon button" onClick={() => navigate('/information-center/jobs')}>
                <i className='external alternate icon' />
              </button>
            </div>
            <div className='Notes'><p>List of all crew heists in the city with detailed requirements.</p></div>
          </div>
        </div>
        <div
          className="InformationCenterCard ui card attached link external"
          onClick={() => navigate('/information-center/hacking')}
        >
          <div className="content">
            <div className='header'>
              <p><i className='code sign icon' /> Hacking</p>
              <button className="ui icon button" onClick={() => navigate('/information-center/taxes')}>
                <i className='external alternate icon' />
              </button>
            </div>
            <div className='Notes'><p>A list of all hacking minigames with practice links.</p></div>
          </div>
        </div>
        <div
          className="InformationCenterCard ui card attached link external"
          onClick={() => navigate('/information-center/locations')}
        >
          <div className="content">
            <div className='header'>
              <p><i className='map marker alternate icon' /> Locations of Interest</p>
              <button className="ui icon button" onClick={() => navigate('/information-center/locations')}>
                <i className='external alternate icon' />
              </button>
            </div>
            <div className='Notes'><p>A list of discreet locations that can be used for operations.</p></div>
          </div>
        </div>
        <div
          className="InformationCenterCard ui card attached link external"
          onClick={() => navigate('/information-center/taxes')}
        >
          <div className="content">
            <div className='header'>
              <p><i className='dollar sign icon' /> Taxes</p>
              <button className="ui icon button" onClick={() => navigate('/information-center/taxes')}>
                <i className='external alternate icon' />
              </button>
            </div>
            <div className='Notes'><p>A tracker for weekly taxes to be paid by all chained members.</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default InformationCenter;
