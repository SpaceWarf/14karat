import { useEffect, useState } from "react";
import { Pagination } from "semantic-ui-react";
import { GalleryItem } from "../../state/gallery";
import Filters, { FilterData } from "./Filters";

interface GalleryProps {
  items: GalleryItem[];
  tags: string[];
  onDelete: (id: string) => void
}

function Gallery(props: GalleryProps) {
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [activePage, setActivePage] = useState<number>(0);
  const [copying, setCopying] = useState<boolean>(false);
  const PAGE_SIZE = 4;

  useEffect(() => {
    setFilteredItems(props.items);
  }, [props.items]);

  const getActiveSlice = () => {
    return filteredItems.slice(activePage * PAGE_SIZE, activePage + PAGE_SIZE);
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

  const handleFiltersUpdate = (update: FilterData) => {
    setFilteredItems(getFilteredItems(update));
  }

  const getFilteredItems = (filters: FilterData): GalleryItem[] => {
    const filtered: GalleryItem[] = [];
    props.items.forEach(item => {
      const isSearched = filters.search.length === 0 || item.notes.toLowerCase().includes(filters.search.toLowerCase());
      const isTagged = filters.tags.length === 0 || item.tags.some(tag => filters.tags.includes(tag))
      if (isSearched && isTagged) {
        filtered.push(item);
      }
    });
    return filtered;
  }

  return (
    <div className='Gallery'>
      <Filters tags={props.tags} onUpdate={handleFiltersUpdate} />
      {filteredItems.length === 0 && (
        <div className="items">
          <p>Nothing to show</p>
        </div>
      )}
      {filteredItems.length > 0 && (
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
              totalPages={Math.ceil(filteredItems.length / PAGE_SIZE)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Gallery;