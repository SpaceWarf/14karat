import './NOMS.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Common/Header';

function NOMS() {
  const navigate = useNavigate();

  return (
    <div className="NOMS">
      <Header text='NOMS' decorated />
      <div className='content'>
        <div className="actions">
          <p className="hyperlink-button" onClick={() => navigate('/information-center')}><i className='arrow left icon' /> back</p>
          <p
            className="hyperlink-button"
            onClick={() => window.open('https://docs.google.com/spreadsheets/d/10D8wSbEXfGxfHhHou9Y7NNW2z1HnuO1wwapxlvdmjGc/edit#gid=1604315295', "_blank")}
          >
            External Document <i className='external icon' />
          </p>
        </div>
        <iframe src="https://docs.google.com/spreadsheets/d/10D8wSbEXfGxfHhHou9Y7NNW2z1HnuO1wwapxlvdmjGc/edit?rm=minimal#gid=1604315295" title="Taxes Spreadsheet"></iframe>
      </div>
    </div>
  );
}


export default NOMS;
