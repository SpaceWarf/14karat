import "./Inventory.scss";
import { InventoryItem } from "../../state/inventory";
import { Stash } from "../../state/stash";

interface InventoryItemCardProps {
  item: InventoryItem;
  stashes: Stash[];
}

function InventoryItemRow(props: InventoryItemCardProps) {
  return (
    <tr className="InventoryItemRow">
      <td>
        {props.item.name}
      </td>
      <td>
        {props.item.tags.join(", ")}
      </td>
      {props.stashes.map(stash => (
        <td className="centered">
          {props.item.quantity[stash.id]}
        </td>
      ))}
    </tr>
  );
}

export default InventoryItemRow;
