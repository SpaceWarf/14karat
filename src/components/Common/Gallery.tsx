import { useEffect, useState } from "react";
import { Pagination } from "semantic-ui-react";
import { GalleryItem } from "../../state/gallery";
import Filters, { FilterData } from "./Filters";
import AssetCard from "./AssetCard";

interface GalleryProps {
  items: GalleryItem[];
  tags: string[];
  onDelete?: (id: string) => void
}

function Gallery(props: GalleryProps) {
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [activePage, setActivePage] = useState<number>(0);
  const PAGE_SIZE = 4;

  useEffect(() => {
    setFilteredItems(props.items);
  }, [props.items]);

  const getActiveSlice = () => {
    return filteredItems.slice(activePage * PAGE_SIZE, activePage + PAGE_SIZE);
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
          <p>Nothing to show...</p>
        </div>
      )}
      {filteredItems.length > 0 && (
        <>
          <div className="items">
            {getActiveSlice().map(item => (
              <AssetCard item={item} onDelete={props.onDelete} />
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