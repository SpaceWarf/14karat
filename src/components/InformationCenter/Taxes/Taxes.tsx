import './Taxes.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Common/Header';

function Taxes() {
  const navigate = useNavigate();

  return (
    <div className="Taxes">
      <Header text='Taxes' decorated />
      <div className='content'>
        <div className="actions">
          <p className="hyperlink-button" onClick={() => navigate('/information-center')}><i className='arrow left icon' /> back</p>
          <p
            className="hyperlink-button"
            onClick={() => window.open('https://docs.google.com/spreadsheets/d/1Gq2TP76pW3XvalJalwUOV9B6Oz_1gDmNbH4pl5RvxIU/edit#gid=0', "_blank")}
          >
            External Document <i className='external icon' />
          </p>
        </div>
        <iframe src="https://docs.google.com/spreadsheets/d/1Gq2TP76pW3XvalJalwUOV9B6Oz_1gDmNbH4pl5RvxIU/edit?rm=minimal#gid=0" title="Taxes Spreadsheet"></iframe>
      </div>
    </div>
  );
}


export default Taxes;
