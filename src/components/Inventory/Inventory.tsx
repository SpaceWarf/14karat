import "./Inventory.scss";
import { ReactElement, useEffect, useState } from "react";
import Header from "../Common/Header";
import { InventoryCategory, InventoryItem, InventoryTags } from "../../state/inventory";
import { Stash } from "../../state/stash";
import Loading from "../Common/Loading";
import InventoryItemRow from "./InventoryItemRow";
import { DatabaseTable, getItems, onItemsSnapshot, updateItem } from "../../utils/firestore";
import Filters, { FilterData } from "../Common/Filters";
import InventoryInput from "./InventoryInput";
import { useAuth } from "../../contexts/AuthContext";
import { currencyFormat } from "../../utils/currency";

function Inventory() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [stashes, setStashes] = useState<Stash[]>([]);
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterData>({
    search: '',
    tags: [],
    hideZeroValues: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setInventory(await getItems<InventoryItem>(DatabaseTable.INVENTORY));
      setStashes(await getItems<Stash>(DatabaseTable.STASHES));

      onItemsSnapshot<InventoryItem>(DatabaseTable.INVENTORY, inventory => {
        setInventory(inventory);
      });

      setLoading(false);
    }
    fetchData();
  }, []);

  const getItemsForCategory = (category: InventoryCategory): ReactElement[] => {
    return inventory.filter(item => {
      if (item.category !== category) {
        return false
      }

      const searchMatch = `${item.name} ${item.tags.join(' ')}`.toLowerCase().includes(filters.search.toLowerCase())
      const tagMatch = filters.tags.length === 0 || item.tags.some(tag => filters.tags.includes(tag))
      const zeroValueMatch = !filters.hideZeroValues || Object.values(item.quantity).some(quantity => quantity > 0)
      return searchMatch && tagMatch && zeroValueMatch
    })
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(item => (
        <InventoryItemRow
          item={item}
          stashes={stashes}
          onChange={(value: number, stashId: string) => handleChange(value, item, stashId)}
          onAdd={(stashId: string) => handleAdd(item, stashId)}
          onRemove={(stashId: string) => handleRemove(item, stashId)}
        />
      ));
  }

  const handleToggleCategory = (category: string) => {
    if (collapsedCategories.includes(category)) {
      const index = collapsedCategories.findIndex(cat => cat === category);
      setCollapsedCategories([
        ...collapsedCategories.slice(0, index),
        ...collapsedCategories.slice(index + 1),
      ]);
    } else {
      setCollapsedCategories([
        ...collapsedCategories,
        category
      ]);
    }
  }

  const handleRemove = (item: InventoryItem, stashId: string) => {
    if (user) {
      updateItem<InventoryItem>(
        DatabaseTable.INVENTORY,
        item.id,
        {
          ...item,
          quantity: {
            ...item.quantity,
            [stashId]: item.quantity[stashId] - 1
          }
        },
        user
      );
    }
  }

  const handleAdd = (item: InventoryItem, stashId: string) => {
    if (user) {
      updateItem<InventoryItem>(
        DatabaseTable.INVENTORY,
        item.id,
        {
          ...item,
          quantity: {
            ...item.quantity,
            [stashId]: item.quantity[stashId] + 1
          }
        },
        user
      );
    }
  }

  const handleChange = (value: number, item: InventoryItem, stashId: string) => {
    if (user && !isNaN(value)) {
      updateItem<InventoryItem>(
        DatabaseTable.INVENTORY,
        item.id,
        {
          ...item,
          quantity: {
            ...item.quantity,
            [stashId]: value,
          }
        },
        user
      );
    }
  }

  return (
    <div className="Inventory" >
      <Header text="Inventory" decorated />
      <div className="content" >
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="Actions">
              <Filters
                tags={Object.values(InventoryTags).sort((a, b) => a.localeCompare(b))}
                onUpdate={setFilters}
                viewZeroValuesToggle
              />
            </div>
            <div className="InventoryCards">
              {inventory
                .filter(item => item.showAsCard)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(item => {
                  const total = stashes.reduce((total: number, stash: Stash) => {
                    return total + (item.quantity[stash.id] || 0)
                  }, 0)

                  return (
                    <div className="ui card">
                      <div className="content">
                        <p className="header">{item.name}</p>
                        <p className="total">
                          {item.isMonetary ? currencyFormat(total) : total}
                        </p>
                        <div className="inputs">
                          {stashes.map(stash => (
                            <div>
                              <p>{stash.name}</p>
                              <InventoryInput
                                value={item.quantity[stash.id]}
                                onChange={(value: number) => handleChange(value, item, stash.id)}
                                onAdd={() => handleAdd(item, stash.id)}
                                onRemove={() => handleRemove(item, stash.id)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
            <table className="ui very basic collapsing celled table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Tags</th>
                  {stashes.map(stash => (
                    <th>{stash.name} Quantity</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.values(InventoryCategory).map(category => (
                  <>
                    <tr className="CategoryRow" onClick={() => handleToggleCategory(category)}>
                      <td colSpan={4}>
                        {collapsedCategories.includes(category) ? (
                          <i className="angle right icon" />
                        ) : (
                          <i className="angle down icon" />
                        )}
                        {category}
                      </td>
                    </tr>
                    {!collapsedCategories.includes(category) && (
                      getItemsForCategory(category)
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default Inventory;