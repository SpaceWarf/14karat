import "./Groups.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DatabaseTable, deleteItem, getIntelForGroup } from "../../utils/firestore";
import { Intel, IntelTag } from "../../state/intel";
import Gallery from "../Common/Gallery";
import { GalleryItem } from "../../state/gallery";
import NewIntelModal from "./NewIntelModal";
import { useAuth } from "../../contexts/AuthContext";

function GroupIntel() {
  const { user } = useAuth();
  const { groupId } = useParams();
  const [intel, setIntel] = useState<Intel[]>([]);

  useEffect(() => {
    const fetchIntel = async () => {
      if (groupId) {
        setIntel(await getIntelForGroup(groupId));
      }
    }
    fetchIntel();
  }, [groupId]);


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
    await deleteItem(DatabaseTable.INTEL, id, user);

    if (groupId) {
      setIntel(await getIntelForGroup(groupId));
    }
  }

  return (
    <div className="GroupIntel">
      {groupId && (
        <NewIntelModal
          groupId={groupId}
          onAdd={async () => setIntel(await getIntelForGroup(groupId))}
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


export default GroupIntel;