import "./Inventory.scss";
import { InventoryItem } from "../../state/inventory";
import { Stash } from "../../state/stash";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { DatabaseTable, updateItem } from "../../utils/firestore";

interface InventoryItemCardProps {
  item: InventoryItem;
  stashes: Stash[];
}

function InventoryItemRow(props: InventoryItemCardProps) {
  const { access, user } = useAuth();

  const handleRemove = (id: string) => {
    if (user) {
      updateItem<InventoryItem>(
        props.item.id,
        DatabaseTable.INVENTORY,
        {
          ...props.item,
          quantity: {
            ...props.item.quantity,
            [id]: props.item.quantity[id] - 1
          }
        },
        user
      );
    }
  }

  const handleAdd = (id: string) => {
    if (user) {
      updateItem<InventoryItem>(
        props.item.id,
        DatabaseTable.INVENTORY,
        {
          ...props.item,
          quantity: {
            ...props.item.quantity,
            [id]: props.item.quantity[id] + 1
          }
        },
        user
      );
    }
  }

  const handleChange = (value: number, id: string) => {
    if (user && !isNaN(value)) {
      updateItem<InventoryItem>(
        props.item.id,
        DatabaseTable.INVENTORY,
        {
          ...props.item,
          quantity: {
            ...props.item.quantity,
            [id]: value,
          }
        },
        user
      );
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, id: string) {
    if (e.key === 'ArrowDown' && props.item.quantity[id] > 0) {
      handleRemove(id);
    } else if (e.key === 'ArrowUp') {
      handleAdd(id);
    }
  }

  return (
    <tr className="InventoryItemRow">
      <td>
        {props.item.name}
      </td>
      <td>
        {props.item.tags.join(", ")}
      </td>
      {props.stashes.map(stash => {
        const value = props.item.quantity[stash.id];
        return (
          <td className="centered">
            {access.headAccess ? (
              <div className="ui form">
                <button className="ui button negative" disabled={value <= 0} onClick={() => handleRemove(stash.id)}>
                  <i className="minus icon"></i>
                </button>
                <div className='ui input'>
                  <input
                    name='quantity'
                    type="text"
                    value={value}
                    onChange={({ target }) => handleChange(Number(target.value), stash.id)}
                    onKeyDown={e => handleKeyDown(e, stash.id)}
                    autoComplete='off'
                  />
                </div>
                <button className="ui button positive" onClick={() => handleAdd(stash.id)}>
                  <i className="add icon"></i>
                </button>
              </div>
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
