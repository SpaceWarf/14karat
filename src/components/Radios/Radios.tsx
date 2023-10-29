import './Radios.scss';
import { useSelector } from 'react-redux';
import RadioCard from '../Common/RadioCard';
import Header from '../Common/Header';
import { getActiveRadios, getMainRadio, getRecentlyBurnedRadios } from '../../redux/selectors/radios';

function Radios() {
  const mainRadio = useSelector(getMainRadio);
  const activeRadios = useSelector(getActiveRadios);
  const burnedRadios = useSelector(getRecentlyBurnedRadios);

  return (
    <div className='Radios'>
      <div className='content'>
        <Header text='Main Radio' decorated />
        <div className='Listing'>
          {mainRadio && <RadioCard radio={mainRadio} />}
        </div>
        <Header text='Active Radios' decorated />
        <div className='Listing'>
          {activeRadios.length === 0 && (
            <p>No active radios to show...</p>
          )}
          {activeRadios.map(radio => (
            <RadioCard radio={radio} />
          ))}
        </div>
        <Header text='Recently Burned Radios' decorated />
        <div className='Listing'>
          {burnedRadios.length === 0 && (
            <p>No burned radios to show...</p>
          )}
          {burnedRadios.map(radio => (
            <RadioCard radio={radio} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Radios;