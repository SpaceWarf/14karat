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
          <p className="back-button" onClick={() => navigate('/information-center')}><i className='arrow left icon' /> back</p>
          <p
            className="back-button"
            onClick={() => window.open('https://docs.google.com/spreadsheets/d/13iZet36FT24-QUfG8mLhqtAdYd5H4FA3rJ_ued-lr0Q/edit#gid=0', "_blank")}
          >
            External Document <i className='external icon' />
          </p>
        </div>
        <iframe src="https://docs.google.com/spreadsheets/d/13iZet36FT24-QUfG8mLhqtAdYd5H4FA3rJ_ued-lr0Q/edit?rm=minimal#gid=0" title="Taxes Spreadsheet"></iframe>
      </div>
    </div>
  );
}


export default Taxes;
