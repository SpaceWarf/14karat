import "./Groups.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getIntelForMember } from "../../utils/firestore";
import { Intel } from "../../state/intel";
import Gallery from "../Common/Gallery";
import { GalleryItem } from "../../state/gallery";

function MemberIntel() {
  const navigate = useNavigate();
  const { memberId } = useParams();
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
      <Gallery items={getOrderedItems()} />
    </div>
  );
}


export default MemberIntel;