import './LocationsOfInterest.scss';
import { useNavigate } from 'react-router-dom';
import Header from '../../Common/Header';
import { useEffect, useState } from 'react';
import Loading from '../../Common/Loading';
import { getLocations } from '../../../utils/firestore';
import { Location } from '../../../state/location';
import { Carousel } from 'react-responsive-carousel';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

function LocationsOfInterest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      setLocations(await getLocations());
      setLoading(false);
    }
    fetchLocations();
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const element = document.getElementById(hash.split('#')[1]);

      if (element) {
        element.scrollIntoView();
      }
    }
  }, [loading]);

  const handleCopyLink = (id: string) => {
    window.location.hash = id;
    navigator.clipboard.writeText(window.location.href);
  }

  return (
    <div className="LocationsOfInterest">
      <Header text='Locations of Interest' decorated />
      <div className='content'>
        <div className="actions">
          <p className="hyperlink-button" onClick={() => navigate('/information-center')}><i className='arrow left icon' /> back</p>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className='Locations'>
            <div className='Map'>
              <TransformWrapper initialPositionY={-720}>
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <>
                    <div className="tools">
                      <button className="ui button" onClick={() => zoomIn()}>
                        <p className='IconContainer contrast'><i className='add icon'></i></p>
                      </button>
                      <button className="ui button" onClick={() => zoomOut()}>
                        <p className='IconContainer contrast'><i className='minus icon'></i></p>
                      </button>
                      <button className="ui button" onClick={() => resetTransform()}>
                        <p className='IconContainer contrast'><i className='repeat icon'></i></p>
                      </button>
                    </div>
                    <TransformComponent>
                      <img src='https://imgur.com/wgVpzHA.png' alt='Map' />
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            </div>
            {locations.map((location, i) => (
              <>
                <div className='Title'>
                  <button className="ui icon button" onClick={() => handleCopyLink(location.id)}>
                    <i className="linkify icon"></i>
                  </button>
                  <h2 id={location.id}>{i + 1}. {location.name}</h2>
                </div>
                <span className='Description'>{location.description}</span>
                <Carousel showThumbs={false} infiniteLoop>
                  {location.assets.map(asset => (
                    <img src={asset} alt={asset} />
                  ))}
                </Carousel>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationsOfInterest;
