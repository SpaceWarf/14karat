import "./Groups.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteIntel, getIntelForMember } from "../../utils/firestore";
import { Intel, IntelTag } from "../../state/intel";
import Gallery from "../Common/Gallery";
import { GalleryItem } from "../../state/gallery";
import NewIntelModal from "./NewIntelModal";
import { useAuth } from "../../contexts/AuthContext";

function MemberIntel() {
  const { user } = useAuth();
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
        id: intel.id,
        url: intel.url,
        embed: intel.embed,
        notes: intel.notes,
        tags: intel.tags,
      }));
  }

  const handleDelete = async (id: string) => {
    await deleteIntel(id, user);

    if (memberId) {
      setIntel(await getIntelForMember(memberId));
    }
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
      <Gallery
        items={getOrderedItems()}
        tags={Object.values(IntelTag)}
        onDelete={handleDelete}
      />
    </div>
  );
}


export default MemberIntel;