import "./DriverStrats.scss";
import Header from "../Common/Header"
import { useDispatch, useSelector } from "react-redux";
import { getDriverStratsByNeighbourhood } from "../../redux/selectors/driversStrats";
import { RootState } from "../../redux/store";
import Gallery from "../Common/Gallery";
import { useNavigate, useParams } from "react-router-dom";
import NewStratModal from "./NewStratModal";
import { DriverStrat, removeDriverStrat } from "../../redux/reducers/driverStrats";
import { GalleryItem } from "../../state/gallery";
import { deleteDriverStrat } from "../../utils/firestore";
import { useAuth } from "../../contexts/AuthContext";

function NeighbourghoodGallery() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { neighbourhood } = useParams();
  const navigate = useNavigate();
  const neighbourhoods = useSelector((state: RootState) => state.neighbourhoods.neighbourhoods);
  const driverStratsMap = useSelector(getDriverStratsByNeighbourhood);

  const getNeighbourhoodFromParams = () => {
    const hood = neighbourhoods.find(hood => hood.id === neighbourhood);

    if (hood) {
      return hood.name;
    } else {
      navigate("/driver-strats")
    }
  }

  const getOrderedItems = (): GalleryItem[] => {
    return (driverStratsMap.get(neighbourhood) || [])
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
    dispatch(removeDriverStrat(id));
  }

  return (
    <div className="NeighbourghoodGallery">
      <Header text={`${getNeighbourhoodFromParams()} Strats`} decorated />
      <div className="content">
        <div className="actions">
          <p className="back-button" onClick={() => navigate('/driver-strats')}><i className='arrow left icon' /> back</p>
          {neighbourhood && <NewStratModal neighbourhood={neighbourhood} />}
        </div>
        <Gallery items={getOrderedItems()} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default NeighbourghoodGallery;