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
  const [hitman, setHitman] = useState<string[]>([]);
  const [laundering, setLaundering] = useState<string[]>([]);
  const [cheng, setCheng] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setJewelers(await getAllBlackMarketUrlsForType(BlackMarketType.JEWELERS));
      setCryptos(await getAllBlackMarketUrlsForType(BlackMarketType.CRYPTOS));
      setNormals(await getAllBlackMarketUrlsForType(BlackMarketType.NORMALS));
      setHitman(await getAllBlackMarketUrlsForType(BlackMarketType.HITMAN));
      setLaundering(await getAllBlackMarketUrlsForType(BlackMarketType.LAUNDERING));
      setCheng(await getAllBlackMarketUrlsForType(BlackMarketType.CHENG));
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
                  {normals.map((img, i) => (
                    <img src={img} alt={`Normal ${i}`} />
                  ))}
                </div>
              </div>
              <div className='Section'>
                <Header text='Crypto' />
                <div className='Media'>
                  {cryptos.length === 0 && <p>Nothing to show...</p>}
                  {cryptos.map((img, i) => (
                    <img src={img} alt={`Crypto ${i}`} />
                  ))}
                </div>
              </div>
              <div className='Section'>
                <Header text='Jeweler' />
                <div className='Media'>
                  {jewelers.length === 0 && <p>Nothing to show...</p>}
                  {jewelers.map((img, i) => (
                    <img src={img} alt={`Jeweler ${i}`} />
                  ))}
                </div>
              </div>
              <div className='Section'>
                <Header text='Hitman' />
                <div className='Media'>
                  {hitman.length === 0 && <p>Nothing to show...</p>}
                  {hitman.map((img, i) => (
                    <img src={img} alt={`Hitman ${i}`} />
                  ))}
                </div>
              </div>
              <div className='Section'>
                <Header text='Tabitha / Laundering' />
                <div className='Media'>
                  {laundering.length === 0 && <p>Nothing to show...</p>}
                  {laundering.map((img, i) => (
                    <img src={img} alt={`Laundering ${i}`} />
                  ))}
                </div>
              </div>
              <div className='Section'>
                <Header text='Cheng / Bank Truck' />
                <div className='Media'>
                  {cheng.length === 0 && <p>Nothing to show...</p>}
                  {cheng.map((img, i) => (
                    <img src={img} alt={`Cheng ${i}`} />
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
