import './HackingPractice.scss';
import Dropdown, { DropdownOption } from '../Common/Dropdown';
import { useEffect, useState } from 'react';
import { cloneDeep, isEqual } from 'lodash';
import { Checkbox } from 'semantic-ui-react';
import { Position, getRandomPosition, isPositionChosen } from '../../utils/grid';

interface WordleCell {
  selected: boolean,
  index: number,
}

type WordleGrid = WordleCell[][];

interface WordleForm {
  clickIndex: number,
  initialGrid: WordleGrid,
  currentGrid: WordleGrid,
  previousGrids: WordleGrid[],
  answer?: WordleGrid,
}

const PIN_COUNTS: DropdownOption[] = [
  { key: 'four', value: '4', text: 'Four (4)' },
  { key: 'five', value: '5', text: 'Five (5)' },
  { key: 'six', value: '6', text: 'Six (6)' },
];

const MAX_TIMER: { [key: string]: number } = {
  '4': 35,
  '5': 35,
  '6': 43,
};

const MAX_ATTEMPTS: { [key: string]: number } = {
  '4': 9,
  '5': 9,
  '6': 9,
};

const GRID_WIDTH = 5;
const GRID_HEIGHT = 5;

function WordleHackPractice() {
  const [pinCount, setPinCount] = useState<string>('4');
  const [countdown, setCountdown] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [form, setForm] = useState<WordleForm>();
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [infiniteTimer, setInfiniteTimer] = useState<boolean>(false);
  const [infiniteAttempts, setInfiniteAttempts] = useState<boolean>(false);
  const [viewSolution, setViewSolution] = useState<boolean>(false);

  useEffect(() => {
    const initialGrid: WordleCell[][] = [];

    for (let i = GRID_HEIGHT; i > 0; i--) {
      initialGrid.push(Array(GRID_WIDTH).fill({ selected: false, index: -1 }))
    }

    setForm({
      clickIndex: 0,
      initialGrid: cloneDeep(initialGrid),
      currentGrid: cloneDeep(initialGrid),
      previousGrids: [],
    });
  }, [])

  useEffect(() => {
    if (started && countdown > 0) {
      setTimeout(() => {
        const newCountdown = countdown - 1;
        setCountdown(Math.max(0, newCountdown));

        if (newCountdown === 0) {
          setTimer(MAX_TIMER[pinCount]);
        }
      }, 1000);
    } else {
      setCountdown(0);
    }
  }, [started, countdown, pinCount]);

  useEffect(() => {
    if (form && started && !infiniteTimer && timer > 0) {
      setTimeout(() => {
        const newTimer = timer - 1;
        setTimer(Math.max(0, newTimer));

        if (newTimer === 0) {
          const update = cloneDeep(form);
          update.clickIndex = 0;
          update.previousGrids = [];
          update.currentGrid = cloneDeep(form.initialGrid);
          setForm(update);
          setStarted(false);
        }
      }, 1000);
    } else {
      setTimer(0);
    }
  }, [form, started, infiniteTimer, timer]);

  const handleReset = () => {
    if (form) {
      setSuccess(false);
      setFailure(false);
      setViewSolution(false);
      const update = cloneDeep(form);
      update.clickIndex = 0;
      update.previousGrids = [];
      update.currentGrid = cloneDeep(form.initialGrid);
      setForm(update);
      setCountdown(0);
      setStarted(false);
    }
  }

  const handleStart = () => {
    if (form) {
      setSuccess(false);
      setFailure(false);
      setViewSolution(false);
      const update = cloneDeep(form);
      const answer = generateAnswer();
      update.answer = cloneDeep(answer);
      update.clickIndex = 0;
      update.previousGrids = [];
      update.currentGrid = cloneDeep(form.initialGrid);
      setForm(update);
      setCountdown(3);
      setAttempts(MAX_ATTEMPTS[pinCount]);
      setStarted(true);
    }
  }

  const generateAnswer = (): WordleGrid => {
    if (form) {
      const cells: Position[] = [];
      const answer = cloneDeep(form.initialGrid);

      for (let i = 0; i < Number(pinCount); i++) {
        let cell;

        do {
          cell = getRandomPosition(GRID_WIDTH, GRID_HEIGHT);
        } while (!isPositionChosen(cell, cells));

        cells.push(cell);
        answer[cell.y][cell.x] = {
          selected: true,
          index: i,
        }
      }

      return answer;
    }
    return [];
  }

  const handleSelectCell = (rowIndex: number, cellIndex: number) => {
    if (form && !form.currentGrid[rowIndex][cellIndex].selected) {
      const update = cloneDeep(form);

      update.clickIndex = form.clickIndex + 1;
      update.currentGrid[rowIndex][cellIndex] = {
        selected: true,
        index: form.clickIndex,
      };

      if (update.clickIndex === Number(pinCount)) {
        const solution = cloneDeep(update.currentGrid);
        update.previousGrids.unshift(solution);
        update.currentGrid = cloneDeep(form.initialGrid);
        update.clickIndex = 0;

        if (form.answer && isSolutionValid(solution, form.answer)) {
          setStarted(false);
          setSuccess(true);
        } else {
          if (!infiniteAttempts) {
            if (attempts === 1) {
              setStarted(false);
              setFailure(true);
            } else {
              setAttempts(attempts - 1);
            }
          }
        }
      }
      setForm(update);
    }
  }

  const isSolutionValid = (grid: WordleGrid, answer: WordleGrid): boolean => {
    return isEqual(grid, answer);
  }

  return (
    <div className="WordleHackPractice HackPractice">
      <div className='content'>
        <div className='Actions'>
          <div className='Settings'>
            <Dropdown
              placeholder="Pin Count"
              disabled={started}
              options={PIN_COUNTS}
              value={pinCount}
              onChange={value => setPinCount(value)}
            />
            <Checkbox
              checked={infiniteTimer}
              label="∞ Timer?"
              toggle
              disabled={started}
              onChange={() => setInfiniteTimer(!infiniteTimer)}
            />
            <Checkbox
              checked={infiniteAttempts}
              label="∞ Attempts?"
              toggle
              disabled={started}
              onChange={() => setInfiniteAttempts(!infiniteAttempts)}
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
                  onChange={() => setViewSolution(!viewSolution)}
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
              {failure && <p className='FailureLabel'>Failure</p>}
            </div>
          )}
          <div className='Info'>
            {started && countdown === 0 && (
              <>
                <p className='Timer'>{timer}s</p>
                <p className='Attempts'>{attempts}</p>
              </>
            )}
          </div>
          <div className='PreviousGrids'>
            {form && (
              form.previousGrids.map((grid, i) => (
                <WordleGridComponent
                  key={`previous-grid-${i}`}
                  grid={grid}
                  answer={form.answer}
                />
              ))
            )}
          </div>
          <div className='CurrentGrid'>
            {form && (
              <WordleGridComponent
                grid={form.currentGrid}
                answer={form.answer}
                onSelectCell={handleSelectCell}
                editable
                viewIndex={viewSolution}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface WordleGridComponentProps {
  grid: WordleGrid,
  answer?: WordleGrid,
  editable?: boolean,
  viewIndex?: boolean,
  onSelectCell?: (rowIndex: number, cellIndex: number) => void,
}

function WordleGridComponent(props: WordleGridComponentProps) {
  const getCellClasses = (cell: WordleCell, answerCell: WordleCell): string => {
    const classes = ['WordleCell'];

    if (cell.selected) {
      classes.push('selected');

      if (answerCell.selected) {
        classes.push('correct-selection');

        if (answerCell.index === cell.index) {
          classes.push('correct-index');
        }
      }
    }

    return classes.join(' ');
  }

  return (
    <div className={`WordleGrid ${props.editable ? 'editable' : ''}`}>
      {props.grid.map((row, rowIndex) => {
        return (
          <div key={`row-${rowIndex}`} className='WordleRow'>
            {row.map((cell, cellIndex) => {
              const answerCell: WordleCell = props.answer ? props.answer[rowIndex][cellIndex] : { selected: false, index: -1 };
              return (
                <div
                  key={`row-${rowIndex}-cell-${cellIndex}`}
                  className={getCellClasses(cell, props.answer ? props.answer[rowIndex][cellIndex] : { selected: false, index: -1 })}
                  onClick={() => props.onSelectCell && props.onSelectCell(rowIndex, cellIndex)}
                >{props.viewIndex && answerCell.index >= 0 ? answerCell.index + 1 : ''}</div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default WordleHackPractice;
