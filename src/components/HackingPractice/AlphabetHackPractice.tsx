import { shuffle } from 'lodash';
import './HackingPractice.scss';
import { useEffect, useRef, useState } from 'react';
import { Checkbox, Progress } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

const MAX_TIMER = 25;
const MAX_COUNTDOWN = 3;
const CARD_COUNT = 24;
const MAX_MISTAKES = 2;

interface Card {
  id: string;
  value: string;
  success: boolean;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function AlphabetHackPractice() {
  const [countdown, setCountdown] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [infiniteTimer, setInfiniteTimer] = useState<boolean>(false);
  const [infiniteMistakes, setInfiniteMistakes] = useState<boolean>(false);

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
      handleAnswerSubmit(event.key)
    }

    if (started) {
      document.addEventListener('keydown', handleKeydown);
    } else {
      document.removeEventListener('keydown', handleKeydown);
    }

    return () => document.removeEventListener('keydown', handleKeydown);
  }, [started]);

  useEffect(() => {
    const generateCards = (): Card[] => {
      return shuffle(
        Array(CARD_COUNT)
          .fill("")
          .map((_, i) => ({
            id: uuid(),
            value: generateCardValue(),
            success: false,
          }))
      );
    }

    const generateCardValue = (): string => {
      return CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
    }

    if (started && countdown > 0) {
      setTimeout(() => {
        const newCountdown = countdown - 1;
        setCountdown(Math.max(0, newCountdown));

        if (newCountdown === 0) {
          setTimer(MAX_TIMER);
          setCards(generateCards());
        }
      }, 1000);
    } else {
      setCountdown(0);
    }
  }, [started, countdown]);

  const handleReset = () => {
    setSuccess(false);
    setFailure(false);
    setCountdown(0);
    setStarted(false);
    setCursor(0);
    setMistakes(0);
    setCards([]);
  }

  const handleStart = () => {
    setSuccess(false);
    setFailure(false);
    setCountdown(MAX_COUNTDOWN);
    setStarted(true);
    setCursor(0);
    setMistakes(0);
    setCards([]);
  }

  const handleAnswerSubmit = (char: string) => {
    const currentCursor = cursorRef.current;
    const currentMistake = mistakesRef.current;
    const currentCards = cardsRef.current;
    const card = currentCards[currentCursor];

    if (card && card.value.toLowerCase() === char.toLowerCase()) {
      setCards([
        ...currentCards.slice(0, currentCursor),
        {
          ...card,
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
    <div className="AlphabetHackPractice HackPractice">
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
                    <Progress size='small' value={mistakes} total={MAX_MISTAKES} error />
                  </>
                )}
              </div>
              <div className='Grid'>
                {cards.map((card, i) => (
                  <AlphabetCard
                    card={card}
                    index={i}
                    cursor={cursor}
                  />
                ))}
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
}

function AlphabetCard(props: CardProps) {
  const getClassName = (): string => {
    const classes = ['AlphabetCard'];

    if (props.card.success) {
      classes.push('success');
    }

    if (props.cursor === props.index) {
      classes.push('current');
    }

    return classes.join(' ');
  }

  return (
    <div className={getClassName()}>
      <p className='Value'>{props.card.value}</p>
    </div>
  )
}

export default AlphabetHackPractice;
