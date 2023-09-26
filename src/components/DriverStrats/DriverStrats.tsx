import "./DriverStrats.scss";
import Header from "../Common/Header"
import { Segment } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { getDriverStratsByNeighbourhood } from "../../redux/selectors/driversStrats";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import map from '../../assets/images/neighbourhoods-map.png';

function DriverStrats() {
  const navigate = useNavigate();
  const neighbourhoods = useSelector((state: RootState) => state.neighbourhoods.neighbourhoods);
  const driverStratsMap = useSelector(getDriverStratsByNeighbourhood);

  const getStratCountForNeighbourhood = (id: string) => {
    return (driverStratsMap.get(id) || []).length
  }

  return (
    <div className="DriverStrats">
      <Header text="Driver Strats" decorated />
      <div className="content">
        <img src={map} alt="Map" />
        <div>
          <Segment.Group>
            {neighbourhoods.map(({ id, name }) => {
              const count = getStratCountForNeighbourhood(id);
              return count ? <Segment onClick={() => navigate(`/driver-strats/${id}`)}>{name} ({count})</Segment> : <></>
            })}
          </Segment.Group>
        </div>
      </div>
    </div>
  );
}

export default DriverStrats;