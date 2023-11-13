import './HackingPractice.scss';
import { useEffect, useState } from 'react';
import { Checkbox } from 'semantic-ui-react';
import { cloneDeep } from 'lodash';
import { getRandomColour } from '../../utils/colours';
import { Position, getRandomPosition, isPositionChosen } from '../../utils/grid';
import Dropdown from '../Common/Dropdown';

interface Circle {
  position: Position,
  colour: string,
  isAnswer: boolean,
}

const SWAP_OPTIONS = [
  { key: 'sixteen', value: '16', text: 'Sixteen (16)' },
  { key: 'twenty-seven', value: '27', text: 'Twenty-seven (27)' },
]

const MAX_TIMER: { [key: string]: number } = {
  '16': 8,
  '27': 12,
};

const GRID_WIDTH = 550;
const GRID_HEIGHT = 550;
const INITIAL_COLOR = "#055e73";
const INITIAL_GRID: Circle[] = [
  { position: { x: 15, y: 250 }, colour: INITIAL_COLOR, isAnswer: false },
  { position: { x: 90, y: 250 }, colour: INITIAL_COLOR, isAnswer: false },
  { position: { x: 165, y: 250 }, colour: INITIAL_COLOR, isAnswer: false },
  { position: { x: 240, y: 250 }, colour: INITIAL_COLOR, isAnswer: false },
  { position: { x: 315, y: 250 }, colour: INITIAL_COLOR, isAnswer: false },
  { position: { x: 390, y: 250 }, colour: INITIAL_COLOR, isAnswer: false },
  { position: { x: 465, y: 250 }, colour: INITIAL_COLOR, isAnswer: false },
  { position: { x: 540, y: 250 }, colour: INITIAL_COLOR, isAnswer: false },
];

function CircleSwapHackPractice() {
  const [swaps, setSwaps] = useState<string>('16');
  const [countdown, setCountdown] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [swapping, setSwapping] = useState<boolean>(false);
  const [showInitialCircle, setShowInitialCircle] = useState<boolean>(false);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [infiniteTimer, setInfiniteTimer] = useState<boolean>(false);
  const [viewSolution, setViewSolution] = useState<boolean>(true);

  useEffect(() => {
    if (started && countdown > 0) {
      setTimeout(() => {
        const newCountdown = countdown - 1;
        setCountdown(Math.max(0, newCountdown));

        if (newCountdown === 0) {
          setSwapping(true);
          setTimeout(() => {
            setTimer(MAX_TIMER[swaps]);
            startSwaps();
          }, 1000);
        }
      }, 1000);
    } else {
      setCountdown(0);
    }
  }, [started, countdown]);

  useEffect(() => {
    if (started && !infiniteTimer && timer > 0) {
      setTimeout(() => {
        const newTimer = timer - 1;
        setTimer(Math.max(0, newTimer));

        if (newTimer === 0) {
          setCircles([]);
          setStarted(false);
          setFailure(true);
        }
      }, 1000);
    } else {
      setTimer(0);
    }
  }, [circles, started, infiniteTimer, timer, success]);

  const handleReset = () => {
    setSuccess(false);
    setFailure(false);
    setViewSolution(false);
    setShowInitialCircle(true);
    setCircles([]);
    setCountdown(0);
    setStarted(false);
  }

  const handleStart = () => {
    setSuccess(false);
    setFailure(false);
    setViewSolution(false);
    setShowInitialCircle(true);
    const initialCircles = cloneDeep(INITIAL_GRID);
    initialCircles[Math.floor(Math.random() * initialCircles.length)].isAnswer = true;
    setCircles(initialCircles);
    setCountdown(3);
    setStarted(true);
  }

  const startSwaps = () => {
    let swapCount = 0;
    setShowInitialCircle(false);
    const interval = setInterval(() => {
      setCircles(getRandomizedCircles());
      swapCount++;

      if (swapCount === Number(swaps)) {
        clearInterval(interval);
        setSwapping(false);
      }
    }, 350);
  }

  const getRandomizedCircles = (): Circle[] => {
    const positions: Position[] = [];

    for (let i = 0; i < circles.length; i++) {
      let position;

      do {
        position = getRandomPosition(GRID_WIDTH, GRID_HEIGHT);
      } while (!isPositionChosen(position, positions));
      positions.push(position);
    }

    return circles.map((circle, i) => ({
      ...circle,
      position: positions[i],
      colour: getRandomColour(),
    }));
  }

  const getCircleClass = (circle: Circle): string => {
    const classes = ['Circle'];

    if (circle.isAnswer && showInitialCircle) {
      classes.push('Answer');
    }

    if (swapping) {
      classes.push('disabled');
    }

    return classes.join(' ');
  }

  const handleClick = (circle: Circle) => {
    if (!swapping) {
      setStarted(false);

      if (circle.isAnswer) {
        setSuccess(true);
      } else {
        setFailure(true);
      }
    }
  }

  return (
    <div className="CircleSwapHackPractice HackPractice">
      <div className='content'>
        <div className='Actions'>
          <div className='Settings'>
            <Dropdown
              placeholder="Swaps"
              disabled={started}
              options={SWAP_OPTIONS}
              value={swaps}
              onChange={value => setSwaps(value)}
            />
            <Checkbox
              checked={infiniteTimer}
              label="∞ Timer?"
              toggle
              disabled={started}
              onChange={() => setInfiniteTimer(!infiniteTimer)}
            />
          </div>
          <div className='Buttons'>
            {!started && (
              <button className="ui button positive hover-animation" onClick={handleStart}>
                <p className='label contrast'>Start</p>
                <p className='IconContainer contrast'><i className='time icon'></i></p>
              </button>
            )}
            {started && (
              <>
                <Checkbox
                  checked={viewSolution}
                  label="View Solution?"
                  toggle
                  onChange={() => { setShowInitialCircle(!viewSolution); setViewSolution(!viewSolution); }}
                />
                <button className="ui button negative hover-animation" onClick={handleReset}>
                  <p className='label contrast'>Reset</p>
                  <p className='IconContainer contrast'><i className='refresh icon'></i></p>
                </button>
              </>
            )}
          </div>
        </div>
        <div className='Hack'>
          {(!started || countdown > 0) && (
            <div className='StartTimer'>
              {countdown > 0 && <p className='Countdown'>{countdown}</p>}
              {success && <p className='SuccessLabel'>Success</p>}
              {failure && !success && <p className='FailureLabel'>Failure</p>}
            </div>
          )}
          {started && countdown === 0 && (
            <>
              <div className='Info'>
                {started && countdown === 0 && (
                  <>
                    <p className='Timer'>{timer}s</p>
                    <p className='Attempts'></p>
                  </>
                )}
              </div>
              <div
                className='Grid'
                style={{
                  width: `${GRID_WIDTH}px`,
                  height: `${GRID_HEIGHT}px`,
                }}
              >
                {circles.map((circle, i) => (
                  <div
                    key={`circle-${i}`}
                    className={getCircleClass(circle)}
                    style={{
                      left: `${circle.position.x}px`,
                      top: `${circle.position.y}px`,
                      backgroundColor: circle.colour,
                    }}
                    onClick={() => handleClick(circle)}
                  >
                    {viewSolution && circle.isAnswer && <i className='check icon' />}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CircleSwapHackPractice;
