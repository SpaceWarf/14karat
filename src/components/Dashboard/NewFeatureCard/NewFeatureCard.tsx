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
          <p>Try out the new Wordle hack practice minigame! Available under the Hacking tab.</p>
          <button className="ui button hover-animation" onClick={() => navigate('/hacking/wordle')}>
            <p className='label'>Go To Minigame</p>
            <p className='IconContainer'><i className='code icon'></i></p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewFeatureCard;
