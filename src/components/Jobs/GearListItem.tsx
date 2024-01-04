import { Placeholder, PlaceholderImage, Popup, PopupContent } from "semantic-ui-react";
import { getGearUrl } from "../../utils/storage";
import "./Jobs.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface GearListItemProps {
  id: string;
  quantity: string;
  bulletted?: boolean;
}

function GearListItem(props: GearListItemProps) {
  const [url, setUrl] = useState<string>();
  const { gear } = useSelector((state: RootState) => state.jobs);

  const getName = (): string => {
    return gear.find(g => g.id === props.id)?.name ?? props.id;
  }

  const handleOpen = async () => {
    setUrl(await getGearUrl(props.id));
  }

  return (
    <div className='GearListItem'>
      {props.bulletted && <li>{props.quantity} {getName()}</li>}
      {!props.bulletted && <p>{props.quantity} {getName()}</p>}
      <Popup
        trigger={<i className='info circle icon' />}
        onOpen={handleOpen}
        basic
      >
        <PopupContent>
          {url && (
            <img src={url} alt={`Gear ${getName()}`} />
          )}
          {!url && (
            <Placeholder style={{ height: 150, width: 150 }}>
              <PlaceholderImage />
            </Placeholder>
          )}
        </PopupContent>
      </Popup>
    </div>
  );
}

export default GearListItem;