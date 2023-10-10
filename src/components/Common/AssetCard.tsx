import { useState } from "react";
import { GalleryItem } from "../../state/gallery";

interface GalleryProps {
  item: GalleryItem;
  onDelete?: (id: string) => void
}

function AssetCard({ item, onDelete }: GalleryProps) {
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
          {item.notes || '-'}
          <div className="Tags">
            {item.tags.map(tag => <div className="ui horizontal label">{tag}</div>)}
          </div>
        </div>
        <div className="Actions">
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