import "./DriverStrats.scss";
import Header from "../Common/Header"
import { useSelector } from "react-redux";
import { getDriverStratsByNeighbourhood } from "../../redux/selectors/driversStrats";
import { RootState } from "../../redux/store";
import VideoGallery from "../Common/VideoGallery";
import { useNavigate, useParams } from "react-router-dom";
import NewStratModal from "./NewStratModal";
import { DriverStrat } from "../../redux/reducers/driverStrats";

function NeighbourghoodGallery() {
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

  const getOrderedEmbeds = () => {
    return (driverStratsMap.get(neighbourhood) || [])
      .sort((a: DriverStrat, b: DriverStrat) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      .map((strat: DriverStrat) => strat.embed);
  }

  return (
    <div className="NeighbourghoodGallery">
      <Header text={`${getNeighbourhoodFromParams()} Strats`} decorated />
      <div className="content">
        <div className="actions">
          <p onClick={() => navigate('/driver-strats')}><i className='arrow left icon' /> back</p>
          {neighbourhood && <NewStratModal neighbourhood={neighbourhood} />}
        </div>
        <VideoGallery embeds={getOrderedEmbeds()}></VideoGallery>
      </div>
    </div>
  );
}

export default NeighbourghoodGallery;