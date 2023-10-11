import "./DriverStrats.scss";
import { Modal } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { DriverStrat } from "../../redux/reducers/driverStrats";
import Loading from "../Common/Loading";
import AssetCard from "../Common/AssetCard";
import { deleteDriverStrat } from "../../utils/firestore";
import { useAuth } from "../../contexts/AuthContext";

function ExpandStratModal() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState<boolean>(false);
  const { driverStrats } = useSelector((state: RootState) => state.driverStrats);
  const [strat, setStrat] = useState<DriverStrat>();

  useEffect(() => {
    if (searchParams.has('expand')) {
      const id = searchParams.get('expand');
      const strat = driverStrats.find(strat => strat.id === id);
      if (strat) {
        setStrat(strat);
      } else {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  }, [searchParams, driverStrats]);

  const handleDelete = async (id: string) => {
    await deleteDriverStrat(id, user);
  }

  return (
    <Modal
      className="ExpandStratModal Modal"
      size="large"
      onClose={() => { setSearchParams({}); setOpen(false); }}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <button className="ui icon button" onClick={() => setOpen(false)}>
          <i className="expand arrows alternate icon" />
        </button>
      }
    >
      <Modal.Content>
        {strat ? (
          <AssetCard item={strat} onDelete={handleDelete} />
        ) : (
          <Loading />
        )}
      </Modal.Content>
    </Modal>
  );
}

export default ExpandStratModal;