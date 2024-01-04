import { Popup, PopupContent } from "semantic-ui-react";
import { getGearUrl } from "../../utils/storage";
import "./Jobs.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface GearListItemProps {
  id: string;
  quantity: string;
  bulletted?: boolean;
}

function GearListItem(props: GearListItemProps) {
  const [url, setUrl] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { gear } = useSelector((state: RootState) => state.jobs);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      const url = await getGearUrl(props.id)
      setUrl(url);
      setLoading(false);
    }
    fetchImage();
  }, [props.id]);

  const getName = (): string => {
    return gear.find(g => g.id === props.id)?.name ?? props.id;
  }

  return (
    <div className='GearListItem'>
      {props.bulletted && <li>{props.quantity} {getName()}</li>}
      {!props.bulletted && <p>{props.quantity} {getName()}</p>}
      {!loading && url && (
        <Popup
          trigger={<i className='info circle icon' />}
          basic
        >
          <PopupContent>
            <img src={url} alt={`Gear ${getName()}`} />
          </PopupContent>
        </Popup>
      )}
    </div>
  );
}

export default GearListItem;