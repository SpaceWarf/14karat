import { ReactElement, useState } from "react";
import { GalleryItem } from "../../state/gallery";
import { useSearchParams } from "react-router-dom";

interface GalleryProps {
  item: GalleryItem;
  onDelete?: (id: string) => void;
  expandModal?: ReactElement;
}

function AssetCard({ item, onDelete, expandModal }: GalleryProps) {
  const [_, setSearchParams] = useSearchParams();
  const [copying, setCopying] = useState<boolean>(false);

  const onCopy = (item: GalleryItem) => {
    if (item.url) {
      navigator.clipboard.writeText(item.url);
    } else if (item.embed) {
      const regex = /src=["']([^\s]+)['"]/
      const match = regex.exec(item.embed);

      if (match) {
        navigator.clipboard.writeText(match[1]);
      }
    }
    setCopying(true);
    setTimeout(() => {
      setCopying(false);
    }, 1000);
  }

  return (
    <div className="AssetCard ui card external">
      <div className="image">
        {item.embed && <div className="EmbedContainer" dangerouslySetInnerHTML={{ __html: item.embed }} />}
        {item.url && (
          <div className="ImageContainer">
            <img src={item.url} alt={item.notes} />
          </div>
        )}
      </div>
      <div className="extra content">
        <div className="Details">
          <div className="Tags">
            {item.tags.map(tag => <div className="ui horizontal label">{tag}</div>)}
          </div>
          <p className="Notes">{item.notes || '-'}</p>
        </div>
        <div className="Actions">
          <div onClick={() => setSearchParams({ expand: item.id })}>{expandModal}</div>
          {copying ? (
            <i className="check circle icon"></i>
          ) : (
            <button className="ui icon button" onClick={() => onCopy(item)}>
              <i className="linkify icon" />
            </button>
          )}
          {onDelete && <button className="ui icon negative button" onClick={() => onDelete(item.id)}>
            <i className="trash icon"></i>
          </button>}
        </div>
      </div>
    </div>
  )
}

export default AssetCard;