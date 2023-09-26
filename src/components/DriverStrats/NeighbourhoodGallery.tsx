import "./DriverStrats.scss";
import Header from "../Common/Header"
import { useSelector } from "react-redux";
import { getDriverStratsByNeighbourhood } from "../../redux/selectors/driversStrats";
import { RootState } from "../../redux/store";
import VideoGallery from "../Common/VideoGallery";
import { useNavigate, useParams } from "react-router-dom";

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

  const handleAddNew = () => {
    console.log("Add New")
  }

  return (
    <div className="NeighbourghoodGallery">
      <Header text={`${getNeighbourhoodFromParams()} Gallery`} decorated />
      <div className="content">
        <div className="actions">
          <p onClick={() => navigate('/driver-strats')}><i className='arrow left icon' /> back</p>
          <div>
            <button className="ui button positive hover-animation" onClick={handleAddNew}>
              <p className='label contrast'>Add New</p>
              <p className='IconContainer contrast'><i className='add icon'></i></p>
            </button>
          </div>
        </div>
        <VideoGallery embeds={driverStratsMap.get(neighbourhood) || []}></VideoGallery>
      </div>
    </div>
  );
}

export default NeighbourghoodGallery;