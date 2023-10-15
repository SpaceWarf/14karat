import "./War.scss";
import { Modal } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loading from "../Common/Loading";
import AssetCard from "../Common/AssetCard";
import { getWarClipsForWar } from "../../utils/firestore";
import { WarClip } from "../../state/war";
import { getMostRecentWar } from "../../redux/selectors/wars";

interface ExpandWarClipModal {
  onDelete: (id: string) => void;
}

function ExpandWarClipModal(props: ExpandWarClipModal) {
  const war = useSelector(getMostRecentWar);
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState<boolean>(false);
  const [clip, setClip] = useState<WarClip>();

  useEffect(() => {
    const fetchClip = async (id: string) => {
      const clips = await getWarClipsForWar(war.id);
      const clip = clips.find(clip => clip.id === id);

      if (clip) {
        setClip(clip);
      } else {
        setOpen(false);
      }
    }

    if (searchParams.has('expand')) {
      fetchClip(searchParams.get('expand') || '');
    } else {
      setOpen(false);
    }
  }, [searchParams, war]);

  const handleDelete = async (id: string) => {
    props.onDelete(id);
    setOpen(false);
  }

  return (
    <Modal
      className="ExpandWarClipModal ExpandModal Modal"
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
        {clip ? (
          <AssetCard item={clip} onDelete={handleDelete} />
        ) : (
          <Loading />
        )}
      </Modal.Content>
    </Modal>
  );
}

export default ExpandWarClipModal;