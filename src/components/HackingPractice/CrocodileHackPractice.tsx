import { shuffle } from 'lodash';
import './HackingPractice.scss';
import { useEffect, useRef, useState } from 'react';
import { Checkbox, Progress } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

const MAX_TIMER = 30;
const MAX_COUNTDOWN = 3;
const CARD_COUNT = 24;
const MAX_MISTAKES = 2;

interface Card {
  id: string;
  value: string;
  success: boolean;
}

function CrocodileHackPractice() {
  const [countdown, setCountdown] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [infiniteTimer, setInfiniteTimer] = useState<boolean>(false);
  const [infiniteMistakes, setInfiniteMistakes] = useState<boolean>(false);
  const [viewSolution, setViewSolution] = useState<boolean>(false);

  const [master, _setMaster] = useState<string>("");
  const masterRef = useRef(master);
  const setMaster = (newMaster: string) => {
    masterRef.current = newMaster;
    _setMaster(newMaster);
  };

  const [cards, _setCards] = useState<Card[]>([]);
  const cardsRef = useRef(cards);
  const setCards = (newCards: Card[]) => {
    cardsRef.current = newCards;
    _setCards(newCards);
  };

  const [cursor, _setCursor] = useState<number>(0);
  const cursorRef = useRef(cursor);
  const setCursor = (newCursor: number) => {
    cursorRef.current = newCursor;
    _setCursor(newCursor);
  };

  const [mistakes, _setMistakes] = useState<number>(0);
  const mistakesRef = useRef(mistakes);
  const setMistakes = (newMistakes: number) => {
    mistakesRef.current = newMistakes;
    _setMistakes(newMistakes);
  };

  useEffect(() => {
    if (started && !infiniteTimer && timer > 0) {
      setTimeout(() => {
        const newTimer = timer - 1;
        setTimer(Math.max(0, newTimer));

        if (newTimer === 0) {
          setStarted(false);
          setFailure(true);
        }
      }, 1000);
    } else {
      setTimer(0);
    }
  }, [started, infiniteTimer, timer, success]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handleAnswerSubmit(false);
      } else if (event.key === "ArrowRight") {
        handleAnswerSubmit(true);
      }
    }

    if (started) {
      document.addEventListener('keydown', handleKeydown);
    } else {
      document.removeEventListener('keydown', handleKeydown);
    }

    return () => document.removeEventListener('keydown', handleKeydown);
  }, [started]);

  useEffect(() => {
    const generateMaster = (): string => {
      return `${Math.floor(Math.floor(Math.random() * 90000) + 10000)}`;
    }

    const generateCards = (master: string): Card[] => {
      const successIndex = Math.floor(Math.random() * 8 + 8);
      return shuffle(
        Array(CARD_COUNT)
          .fill("")
          .map((_, i) => ({
            id: uuid(),
            value: generateCardValue(master, i < successIndex),
            success: false,
          }))
      );
    }

    const generateCardValue = (master: string, answer: boolean): string => {
      let value = "";

      do {
        value = `${Math.floor(Math.random() * 100)}`
      } while (master.includes(value) !== answer);

      return value;
    }

    if (started && countdown > 0) {
      setTimeout(() => {
        const newCountdown = countdown - 1;
        setCountdown(Math.max(0, newCountdown));

        if (newCountdown === 0) {
          setTimer(MAX_TIMER);
          const master = generateMaster()
          setMaster(master);
          setCards(generateCards(master));
        }
      }, 1000);
    } else {
      setCountdown(0);
    }
  }, [started, countdown]);

  const handleReset = () => {
    setSuccess(false);
    setFailure(false);
    setViewSolution(false);
    setCountdown(0);
    setStarted(false);
    setCursor(0);
    setMistakes(0);
    setCards([]);
  }

  const handleStart = () => {
    setSuccess(false);
    setFailure(false);
    setViewSolution(false);
    setCountdown(MAX_COUNTDOWN);
    setStarted(true);
    setCursor(0);
    setMistakes(0);
    setCards([]);
  }

  const handleAnswerSubmit = (answer: boolean) => {
    const currentCursor = cursorRef.current;
    const currentMistake = mistakesRef.current;
    const currentCards = cardsRef.current;
    const currentMaster = masterRef.current;

    if (currentMaster.includes(currentCards[currentCursor].value) === answer) {
      setCards([
        ...currentCards.slice(0, currentCursor),
        {
          ...currentCards[currentCursor],
          success: true,
        },
        ...currentCards.slice(currentCursor + 1),
      ]);

      if (currentCursor + 1 === CARD_COUNT) {
        setStarted(false);
        setSuccess(true);
      } else {
        setCursor(currentCursor + 1);
      }
    } else {
      if (!infiniteMistakes && currentMistake + 1 === MAX_MISTAKES) {
        setStarted(false);
        setFailure(true);
      }

      setMistakes(currentMistake + 1);
    }
  }

  return (
    <div className="CrocodileHackPractice HackPractice">
      <div className='content'>
        <div className='Actions'>
          <div className='Settings'>
            <Checkbox
              checked={infiniteTimer}
              label="∞ Timer?"
              toggle
              disabled={started}
              onChange={() => setInfiniteTimer(!infiniteTimer)}
            />
            <Checkbox
              checked={infiniteMistakes}
              label="∞ Mistakes?"
              toggle
              disabled={started}
              onChange={() => setInfiniteMistakes(!infiniteMistakes)}
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
              {failure && !success && <p className='FailureLabel'>Failure</p>}
            </div>
          )}
          {started && countdown === 0 && (
            <>
              <div className='Info'>
                {started && countdown === 0 && (
                  <>
                    <Progress size='small' value={timer} total={MAX_TIMER} warning />
                    <p className='Master'>{master}</p>
                    <Progress size='small' value={mistakes} total={MAX_MISTAKES} error />
                  </>
                )}
              </div>
              <div className='Grid'>
                {cards.map((card, i) => (
                  <CrocodileCard
                    card={card}
                    index={i}
                    cursor={cursor}
                    master={master}
                    viewSolution={viewSolution}
                  />
                ))}
              </div>
              <div className='Buttons'>
                <button className="ui icon button" onClick={() => handleAnswerSubmit(false)}>
                  <i className="arrow left icon" />
                </button>
                <button className="ui icon button" onClick={() => handleAnswerSubmit(true)}>
                  <i className="arrow right icon" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  card: Card;
  index: number;
  cursor: number;
  master: string;
  viewSolution: boolean;
}

function CrocodileCard(props: CardProps) {
  const getClassName = (): string => {
    const classes = ['CrocodileCard'];

    if (props.card.success) {
      classes.push('success');
    }

    if (props.cursor === props.index) {
      classes.push('current');
    }

    return classes.join(' ');
  }

  const getSolution = () => {
    if (props.master.includes(props.card.value)) {
      return <p className='Solution'>Right</p>
    }
    return <p className='Solution'>Left</p>
  }

  return (
    <div className={getClassName()}>
      <p className='Value'>{props.card.value}</p>
      {props.viewSolution && getSolution()}
    </div>
  )
}

export default CrocodileHackPractice;
