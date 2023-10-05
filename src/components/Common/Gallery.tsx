import { useState } from "react";
import { Pagination } from "semantic-ui-react";
import { GalleryItem } from "../../state/gallery";

interface GalleryProps {
  items: GalleryItem[];
}

function Gallery({ items }: GalleryProps) {
  const [activePage, setActivePage] = useState<number>(0);
  const PAGE_SIZE = 4;

  const getActiveSlice = () => {
    return items.slice(activePage * PAGE_SIZE, activePage + PAGE_SIZE);
  }

  return (
    <div className='Gallery'>
      {items.length === 0 && (
        <div className="items">
          <p>Nothing to show</p>
        </div>
      )}
      {items.length > 0 && (
        <>
          <div className="items">
            {getActiveSlice().map(item => {
              if (item.embed) {
                return <div className="EmbedContainer" dangerouslySetInnerHTML={{ __html: item.embed }} />
              }
              if (item.url) {
                return <div className="ImageContainer"><img src={item.url} /></div>
              }
              return <></>
            })}
          </div>
          <div className="pagination">
            <Pagination
              activePage={activePage + 1}
              onPageChange={(_, { activePage }) => setActivePage(Number(activePage) - 1)}
              totalPages={Math.ceil(items.length / PAGE_SIZE)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Gallery;