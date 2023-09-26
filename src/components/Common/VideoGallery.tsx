import { useState } from "react";
import { Pagination } from "semantic-ui-react";

interface VideoGalleryProps {
  embeds: string[];
}

function VideoGallery({ embeds }: VideoGalleryProps) {
  const [activePage, setActivePage] = useState<number>(0);
  const PAGE_SIZE = 4;

  const getActiveSlice = () => {
    return embeds.slice(activePage * PAGE_SIZE, activePage + PAGE_SIZE);
  }

  return (
    <div className='VideoGallery'>
      <div className="embeds">
        {getActiveSlice().map(embed => (
          <div dangerouslySetInnerHTML={{ __html: embed }} />
        ))}
      </div>
      <div className="pagination">
        <Pagination
          activePage={activePage + 1}
          onPageChange={(_, { activePage }) => setActivePage(Number(activePage) - 1)}
          totalPages={Math.ceil(embeds.length / PAGE_SIZE)}
        />
      </div>
    </div>
  )
}

export default VideoGallery;