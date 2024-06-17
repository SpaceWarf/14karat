import { ReactElement, useState } from "react";
import { GalleryItem } from "../../state/gallery";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ConfirmationModal from "./ConfirmationModal";

interface GalleryProps {
  item: GalleryItem;
  onDelete?: (id: string) => void;
  expandModal?: ReactElement;
}

function AssetCard({ item, onDelete, expandModal }: GalleryProps) {
  const { access } = useAuth();
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

  const onOpenExternalUrl = (item: GalleryItem) => {
    if (item.externalUrl) {
      window.open(item.externalUrl, '_blank');
    }
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
          {item.externalUrl && (
            <button className="ui icon button" onClick={() => onOpenExternalUrl(item)}>
              <i className="external icon" />
            </button>
          )}
          {access.seniorOpAccess && onDelete && (
            <ConfirmationModal
              title='Confirm Delete Gallery Item'
              content={
                <>
                  <p>You are about to delete a gallery item. <b>This cannot be undone.</b></p>
                  <p>Are you sure you want to proceed?</p>
                </>
              }
              trigger={
                <button className="ui icon negative button">
                  <i className="trash icon"></i>
                </button>
              }
              onConfirm={() => onDelete(item.id)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AssetCard;