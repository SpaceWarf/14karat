import "./Groups.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getIntelForGroup } from "../../utils/firestore";
import { Intel } from "../../state/intel";
import Gallery from "../Common/Gallery";
import { GalleryItem } from "../../state/gallery";

function GroupIntel() {
  const navigate = useNavigate();
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
        url: intel.url,
        embed: intel.embed,
        notes: intel.notes,
      }));
  }

  return (
    <div className="GroupIntel">
      <Gallery items={getOrderedItems()} />
    </div>
  );
}


export default GroupIntel;