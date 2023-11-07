import "./Hacking.scss";
import { Modal } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { RootState } from "../../../redux/store";
import AssetCard from "../../Common/AssetCard";
import Loading from "../../Common/Loading";
import { Hack } from "../../../state/hack";

function ExpandHackModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState<boolean>(false);
  const { hacks } = useSelector((state: RootState) => state.hacks);
  const [hack, setHack] = useState<Hack>();

  useEffect(() => {
    if (searchParams.has('expand')) {
      const id = searchParams.get('expand');
      const hack = hacks.find(hack => hack.id === id);
      if (hack) {
        setHack(hack);
      } else {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  }, [searchParams, hacks]);

  return (
    <Modal
      className="ExpandHackModal ExpandModal Modal"
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
        {hack ? (
          <AssetCard
            item={{
              id: hack.id,
              embed: hack.embed,
              notes: `${hack.name}${hack.notes ? ` - ${hack.notes}` : ''}`,
              tags: [],
            }}
          />
        ) : (
          <Loading />
        )}
      </Modal.Content>
    </Modal>
  );
}

export default ExpandHackModal;