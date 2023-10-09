import { useState } from "react";
import { Pagination } from "semantic-ui-react";
import { GalleryItem } from "../../state/gallery";

interface GalleryProps {
  items: GalleryItem[];
  onDelete: (id: string) => void
}

function Gallery(props: GalleryProps) {
  const [activePage, setActivePage] = useState<number>(0);
  const [copying, setCopying] = useState<boolean>(false);
  const PAGE_SIZE = 4;

  const getActiveSlice = () => {
    return props.items.slice(activePage * PAGE_SIZE, activePage + PAGE_SIZE);
  }

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
    <div className='Gallery'>
      {props.items.length === 0 && (
        <div className="items">
          <p>Nothing to show</p>
        </div>
      )}
      {props.items.length > 0 && (
        <>
          <div className="items">
            {getActiveSlice().map(item => (
              <div className="ui card">
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
                    <button className="ui icon negative button" onClick={() => props.onDelete(item.id)}>
                      <i className="trash icon"></i>
                    </button>
                  </div>
                </div>
              </div>
            )
            )}
          </div>
          <div className="pagination">
            <Pagination
              activePage={activePage + 1}
              onPageChange={(_, { activePage }) => setActivePage(Number(activePage) - 1)}
              totalPages={Math.ceil(props.items.length / PAGE_SIZE)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Gallery;