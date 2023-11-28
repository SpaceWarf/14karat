import './Drugs.scss';
import Header from '../../Common/Header';
import { useNavigate } from 'react-router-dom';
import { currencyFormat } from '../../../utils/currency';

function Drugs() {
  const navigate = useNavigate();

  return (
    <div className="Drugs">
      <Header text='Drugs' decorated />
      <div className='content'>
        <div className="actions">
          <p className="hyperlink-button" onClick={() => navigate('/information-center')}><i className='arrow left icon' /> back</p>
        </div>
        <div className='MainContainer'>
          <table className='ui celled table'>
            <thead>
              <tr>
                <th>Drug</th>
                <th className='centered'>Gang Price</th>
                <th className='centered'>Others Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Name">Crack</td>
                <td data-label="GangPrice" className='centered'>{currencyFormat(750)}</td>
                <td data-label="OthersPrice" className='centered'>{currencyFormat(750)}</td>
              </tr>
              <tr>
                <td data-label="Name">Coke</td>
                <td data-label="GangPrice" className='centered'>{currencyFormat(150)}</td>
                <td data-label="OthersPrice" className='centered'>{currencyFormat(170)}</td>
              </tr>
              <tr>
                <td data-label="Name">Ecstasy</td>
                <td data-label="GangPrice" className='centered'>{currencyFormat(150)}</td>
                <td data-label="OthersPrice" className='centered'>{currencyFormat(150)}</td>
              </tr>
              <tr>
                <td data-label="Name">Heroin</td>
                <td data-label="GangPrice" className='centered'>{currencyFormat(150)}</td>
                <td data-label="OthersPrice" className='centered'>{currencyFormat(150)}</td>
              </tr>
              <tr>
                <td data-label="Name">LSD</td>
                <td data-label="GangPrice" className='centered'>{currencyFormat(150)}</td>
                <td data-label="OthersPrice" className='centered'>{currencyFormat(150)}</td>
              </tr>
              <tr>
                <td data-label="Name">Meth</td>
                <td data-label="GangPrice" className='centered'>{currencyFormat(175)}</td>
                <td data-label="OthersPrice" className='centered'>{currencyFormat(220)}</td>
              </tr>
              <tr>
                <td data-label="Name">Mushrooms</td>
                <td data-label="GangPrice" className='centered'>{currencyFormat(150)}</td>
                <td data-label="OthersPrice" className='centered'>{currencyFormat(150)}</td>
              </tr>
              <tr>
                <td data-label="Name">Peyote</td>
                <td data-label="GangPrice" className='centered'>{currencyFormat(150)}</td>
                <td data-label="OthersPrice" className='centered'>{currencyFormat(150)}</td>
              </tr>
              <tr>
                <td data-label="Name">Weed</td>
                <td data-label="GangPrice" className='centered'>{currencyFormat(20)}</td>
                <td data-label="OthersPrice" className='centered'>{currencyFormat(50)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Drugs;
