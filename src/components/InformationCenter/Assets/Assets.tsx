import './Assets.scss';
import Header from '../../Common/Header';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { Asset } from '../../../state/asset';
import { useEffect, useState } from 'react';
import { DatabaseTable, getItems } from '../../../utils/firestore';
import Loading from '../../Common/Loading';

function Assets() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showCopyLabel, setShowCopyLabel] = useState<boolean>(false);

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      setAssets(await getItems<Asset>(DatabaseTable.ASSETS));
      setLoading(false);
    }

    fetchAssets();
  }, []);

  function handleClickItem(index: number) {
    const url = assets[index].url;
    setShowCopyLabel(true);
    setTimeout(() => { setShowCopyLabel(false); }, 2000);
    navigator.clipboard.writeText(url);
  }

  return (
    <div className="Assets">
      <Header text='Assets' decorated />
      <div className='content'>
        <div className="actions">
          <p className="hyperlink-button" onClick={() => navigate('/information-center')}><i className='arrow left icon' /> back</p>
        </div>
        {loading && (
          <Loading />
        )}
        {!loading && (
          <div className='MainContainer CarouselContainer'>
            <Carousel width='500px' infiniteLoop onClickItem={handleClickItem}>
              {assets.map((item: Asset) => (
                <div key={item.id} className='Preview'>
                  <img src={item.url} alt={item.name} />
                  <p className="legend">{item.name}</p>
                </div>
              ))}
            </Carousel>
            {showCopyLabel && (
              <div className="ui left pointing green basic label CopyLabel">
                Copied!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


export default Assets;
