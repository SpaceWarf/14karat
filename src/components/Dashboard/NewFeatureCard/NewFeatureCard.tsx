import { useNavigate } from 'react-router-dom';
import './NewFeatureCard.scss';

function NewFeatureCard() {
  const navigate = useNavigate();

  return (
    <div className="NewFeatureCard ui card attached external">
      <div className="content">
        <div className='header'>
          <p><i className='exclamation icon' /> New Feature Available</p>
        </div>
        <div className='FeatureContainer'>
          <p>The job guide for Vangelico is now available in the information center!</p>
          <button className="ui button hover-animation" onClick={() => navigate('/information-center/jobs/vangelico')}>
            <p className='label'>View Guide</p>
            <p className='IconContainer'><i className='eye icon'></i></p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewFeatureCard;
