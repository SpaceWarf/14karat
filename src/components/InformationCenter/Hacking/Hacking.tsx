import './Hacking.scss';
import Header from '../../Common/Header';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import HackCard from './HackCard';
import { useNavigate } from 'react-router-dom';

function Hacking() {
  const navigate = useNavigate();
  const { hacks } = useSelector((state: RootState) => state.hacks);

  return (
    <div className="Hacking">
      <Header text='Hacking' decorated />
      <div className='content'>
        <div className="actions">
          <p className="back-button" onClick={() => navigate('/information-center')}><i className='arrow left icon' /> back</p>
        </div>
        <div className='Hacks'>
          {[...hacks].sort((a, b) => a.order - b.order).map(hack => (
            <div>
              <HackCard hack={hack} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default Hacking;
