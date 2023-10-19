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
          className="HierarchyCard InformationCenterCard ui card attached link external"
          onClick={() => navigate('/information-center/hierarchy')}
        >
          <div className="content">
            <div className='header'>
              <p><i className='sitemap icon' /> Gang Hierarchy</p>
              <button className="ui icon button" onClick={() => navigate('/information-center/hierarchy')}>
                <i className='external alternate icon' />
              </button>
            </div>
            <div className='Notes'><p>A detailed breakdown of the gang's hierarchy and power structure.</p></div>
          </div>
        </div>
        <div
          className="RulesCard InformationCenterCard ui card attached link external"
          onClick={() => navigate('/information-center/rules')}
        >
          <div className="content">
            <div className='header'>
              <p><i className='numbered list icon' /> Gang Rules</p>
              <button className="ui icon button" onClick={() => navigate('/information-center/rules')}>
                <i className='external alternate icon' />
              </button>
            </div>
            <div className='Notes'><p>A list of the rules to be respected by all gang members.</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default InformationCenter;
