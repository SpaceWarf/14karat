import './QuoteCard.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Quote } from '../../../state/quotes';
import { useEffect, useState } from 'react';

function QuoteCard() {
  const { quotes } = useSelector((state: RootState) => state.quotes);
  const [quoteOfTheWeek, setQuoteOfTheWeek] = useState<Quote>();

  useEffect(() => {
    const now = new Date();
    const yearStart = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now.getTime() - yearStart.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil(days / 7);

    setQuoteOfTheWeek(quotes[(quotes.length - 1) % weekNumber])
  }, [quotes]);

  return (
    <div className="QuoteCard ui card attached external">
      <div className="content">
        <div className='header'>
          <p><i className='quote right icon' /> Quote of the Week</p>
        </div>
        {quoteOfTheWeek && (
          <div className='QuoteContainer'>
            <p className='Quote'>{quoteOfTheWeek.quote}</p>
            <p className='By'>- {quoteOfTheWeek.by}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuoteCard;
