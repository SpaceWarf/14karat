import './BlackMarkets.scss';
import Header from '../../Common/Header';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BlackMarketType } from '../../../state/black-markets';
import { getAllBlackMarketUrlsForType } from '../../../utils/storage';
import Loading from '../../Common/Loading';

function BlackMarkets() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [jewelers, setJewelers] = useState<string[]>([]);
  const [cryptos, setCryptos] = useState<string[]>([]);
  const [normals, setNormals] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setJewelers(await getAllBlackMarketUrlsForType(BlackMarketType.JEWELERS));
      setCryptos(await getAllBlackMarketUrlsForType(BlackMarketType.CRYPTOS));
      setNormals(await getAllBlackMarketUrlsForType(BlackMarketType.NORMALS));
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="BlackMarkets">
      <Header text='Black Markets' decorated />
      <div className='content'>
        <div className="actions">
          <p className="hyperlink-button" onClick={() => navigate('/information-center')}><i className='arrow left icon' /> back</p>
        </div>
        <div className='MainContainer'>
          {loading ? (
            <Loading />
          ) : (
            <div className='Sections'>
              <div className='Section'>
                <Header text='Normal' />
                <div className='Media'>
                  {normals.length === 0 && <p>Nothing to show...</p>}
                  {normals.map((normal, i) => (
                    <img className='JewelerImg' src={normal} alt={`Jeweler ${i}`} />
                  ))}
                </div>
              </div>
              <div className='Section'>
                <Header text='Crypto' />
                <div className='Media'>
                  {cryptos.length === 0 && <p>Nothing to show...</p>}
                  {cryptos.map((crypto, i) => (
                    <img className='JewelerImg' src={crypto} alt={`Jeweler ${i}`} />
                  ))}
                </div>
              </div>
              <div className='Section'>
                <Header text='Jeweler' />
                <div className='Media'>
                  {jewelers.length === 0 && <p>Nothing to show...</p>}
                  {jewelers.map((jeweler, i) => (
                    <img className='JewelerImg' src={jeweler} alt={`Jeweler ${i}`} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default BlackMarkets;
