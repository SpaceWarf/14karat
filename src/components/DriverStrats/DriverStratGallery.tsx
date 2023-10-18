import "./DriverStrats.scss";
import Header from "../Common/Header"
import Gallery from "../Common/Gallery";
import { useNavigate } from "react-router-dom";
import NewStratModal from "./NewStratModal";
import { DriverStrat, DriverStratTag } from "../../redux/reducers/driverStrats";
import { GalleryItem } from "../../state/gallery";
import { deleteDriverStrat } from "../../utils/firestore";
import { useAuth } from "../../contexts/AuthContext";
import ExpandStratModal from "./ExpandStratModal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function DriverStratGallery() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { driverStrats } = useSelector((state: RootState) => state.driverStrats);

  const getOrderedItems = (): GalleryItem[] => {
    return [...driverStrats]
      .sort((a: DriverStrat, b: DriverStrat) => {
        return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()
      })
      .map((strat: DriverStrat) => ({
        id: strat.id,
        embed: strat.embed,
        notes: strat.notes,
        tags: strat.tags,
      }));
  }

  const handleDelete = async (id: string) => {
    await deleteDriverStrat(id, user);
  }

  return (
    <div className="DriverStratGallery">
      <Header text='Driver Strats' decorated />
      <div className="content">
        <div className="actions">
          <p className="back-button" onClick={() => navigate('/driver-strats')}><i className='arrow left icon' /> back</p>
          <NewStratModal neighbourhood='' />
        </div>
        <Gallery
          items={getOrderedItems()}
          tags={Object.values(DriverStratTag)}
          onDelete={handleDelete}
          expandModal={<ExpandStratModal />}
        />
      </div>
    </div>
  );
}

export default DriverStratGallery;