import './HackingPractice.scss';
import Header from '../Common/Header';
import Dropdown, { DropdownOption } from '../Common/Dropdown';
import { useEffect, useState } from 'react';
import WordleHackPractice from './WordleHackPractice';
import CircleSwapHackPractice from './CircleSwapHackPractice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CrocodileHackPractice from './CrocodileHackPractice';

const HACKS: DropdownOption[] = [
  { key: 'wordle', value: 'wordle', text: 'Wordle' },
  { key: 'circle-swaps', value: 'circle-swaps', text: 'Circle Swaps' },
  { key: 'crocodile', value: 'crocodile', text: 'Crocodile' },
];

function HackingPractice() {
  const navigate = useNavigate();
  const [hack, setHack] = useState<string>('wordle');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const hackParam = searchParams.get("hack")
    if (hackParam && HACKS.find(hack => hack.key === hackParam)) {
      setHack(hackParam);
    } else {
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const handleSelectHack = (hack: string) => {
    setHack(hack);
    setSearchParams({ hack })
  }

  return (
    <div className="HackingPractice">
      <Header text='Hacking Practice' decorated />
      <div className='content'>
        <div className='Actions'>
          <p className="hyperlink-button" onClick={() => navigate('/hacking')}><i className='arrow left icon' /> back</p>
          <Dropdown
            placeholder="Hack"
            options={HACKS}
            value={hack}
            onChange={handleSelectHack}
          />
          <p></p>
        </div>
        <div className='HackContainer'>
          {hack === 'wordle' && (
            <WordleHackPractice />
          )}
          {hack === 'circle-swaps' && (
            <CircleSwapHackPractice />
          )}
          {hack === 'crocodile' && (
            <CrocodileHackPractice />
          )}
        </div>
      </div>
    </div>
  );
}

export default HackingPractice;
