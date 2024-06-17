import "./Inventory.scss";
import { InventoryItem } from "../../state/inventory";
import { Stash } from "../../state/stash";
import { useAuth } from "../../contexts/AuthContext";
import InventoryInput from "./InventoryInput";

interface InventoryItemCardProps {
  item: InventoryItem;
  stashes: Stash[];
  onChange: (value: number, stashId: string) => void;
  onAdd: (stashId: string) => void;
  onRemove: (stashId: string) => void;
}

function InventoryItemRow(props: InventoryItemCardProps) {
  const { access } = useAuth();

  return (
    <tr className="InventoryItemRow">
      <td>
        {props.item.name}
      </td>
      <td>
        {props.item.tags.join(", ")}
      </td>
      {props.stashes.map(stash => {
        const value = props.item.quantity[stash.id] || 0;
        return (
          <td className="centered">
            {access.headAccess ? (
              <InventoryInput
                value={value}
                onChange={(value: number) => props.onChange(value, stash.id)}
                onAdd={() => props.onAdd(stash.id)}
                onRemove={() => props.onRemove(stash.id)}
                showButtons
              />
            ) : (
              value
            )}
          </td>
        )
      })}
    </tr>
  );
}

export default InventoryItemRow;
