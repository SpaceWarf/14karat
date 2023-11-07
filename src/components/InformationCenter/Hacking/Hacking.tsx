import './Hacking.scss';
import Header from '../../Common/Header';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Gallery from '../../Common/Gallery';
import { GalleryItem } from '../../../state/gallery';
import ExpandHackModal from './ExpandHackModal';

function Hacking() {
  const navigate = useNavigate();
  const { hacks } = useSelector((state: RootState) => state.hacks);

  const getGalleryItems = (): GalleryItem[] => {
    return hacks.map(hack => ({
      id: hack.id,
      embed: hack.embed,
      notes: `${hack.name}${hack.notes ? ` - ${hack.notes}` : ''}`,
      tags: [],
    }));
  }

  return (
    <div className="Hacking">
      <Header text='Hacking' decorated />
      <div className='content'>
        <div className="actions">
          <p className="hyperlink-button" onClick={() => navigate('/information-center')}><i className='arrow left icon' /> back</p>
        </div>
        <div className='Hacks'>
          <Gallery
            items={getGalleryItems()}
            tags={[]}
            expandModal={<ExpandHackModal />}
          />
        </div>
      </div>
    </div>
  );
}


export default Hacking;
