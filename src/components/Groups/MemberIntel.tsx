import "./Groups.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getIntelForMember } from "../../utils/firestore";
import { Intel } from "../../state/intel";
import Gallery from "../Common/Gallery";
import { GalleryItem } from "../../state/gallery";
import NewIntelModal from "./NewIntelModal";

function MemberIntel() {
  const { groupId, memberId } = useParams();
  const [intel, setIntel] = useState<Intel[]>([]);

  useEffect(() => {
    const fetchIntel = async () => {
      if (memberId) {
        setIntel(await getIntelForMember(memberId));
      }
    }
    fetchIntel();
  }, [memberId]);


  const getOrderedItems = (): GalleryItem[] => {
    return intel
      .sort((a: Intel, b: Intel) => {
        return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()
      })
      .map((intel: Intel) => ({
        url: intel.url,
        embed: intel.embed,
        notes: intel.notes,
      }));
  }

  return (
    <div className="MemberIntel">
      {groupId && memberId && (
        <NewIntelModal
          groupId={groupId}
          memberId={memberId}
          onAdd={async () => setIntel(await getIntelForMember(memberId))}
        />
      )}
      <Gallery items={getOrderedItems()} />
    </div>
  );
}


export default MemberIntel;