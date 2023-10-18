import './Hacking.scss';
import Header from '../Common/Header';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import HackCard from './HackCard';

function Hacking() {
  const { hacks } = useSelector((state: RootState) => state.hacks);

  return (
    <div className="Hacking">
      <Header text='Hacking' decorated />
      <div className='content'>
        {hacks.map(hack => (
          <HackCard hack={hack} />
        ))}
      </div>
    </div>
  );
}


export default Hacking;
