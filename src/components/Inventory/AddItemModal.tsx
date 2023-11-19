import { useState } from "react";
import { Modal } from "semantic-ui-react";
import { useAuth } from "../../contexts/AuthContext";
import "./Inventory.scss";
import { DatabaseTable, createItem } from "../../utils/firestore";
import { InventoryItem, InventoryItemUpdate } from "../../state/inventory";
import Input from "../Common/Input";

interface AddItemModalProps {
  open: boolean,
}

function AddItemModal(props: AddItemModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [mainStashQty, setMainStashQty] = useState<number>(0);
  const [secondaryStashQty, setSecondaryStashQty] = useState<number>(0);
  const [category, setCategory] = useState<string>('Other');
  const [tags, setTags] = useState<string>('');

  const handleAdd = async () => {
    setLoading(true);
    await createItem<InventoryItemUpdate, InventoryItem>(
      DatabaseTable.INVENTORY,
      {
        name,
        quantity: {
          'DeGdaqpKCfGxXqihZ36h': mainStashQty,
          'hdC1PzsenPjTVrH3XANK': secondaryStashQty,
        },
        category,
        tags: tags.split(', '),
      },
      user
    );
    setLoading(false);

    handleClose();
  }

  const handleClose = () => {
    clear();
  }

  const clear = () => {
    setName('');
    setMainStashQty(0);
    setSecondaryStashQty(0);
    setCategory('Other');
    setTags('');
  }

  const canAdd = (): boolean => {
    return !!name && !!category && !!tags;
  }

  return (
    <Modal
      className="AddItemModal Modal"
      size="small"
      onClose={handleClose}
      open={props.open}
    >
      <Modal.Header>Add an inventory item</Modal.Header>
      <Modal.Content>
        <div className='ui form'>
          <div className="Row">
            <Input
              type="text"
              name="name"
              placeholder="Name *"
              icon="edit outline"
              value={name}
              onChange={setName}
              disabled={loading}
            />
            <Input
              type="text"
              name="category"
              placeholder="Category *"
              icon="edit outline"
              value={category}
              onChange={setCategory}
              disabled={loading}
            />
          </div>
          <div className="Row">
            <Input
              type="text"
              name="name"
              placeholder="Tags *"
              icon="edit outline"
              value={tags}
              onChange={setTags}
              disabled={loading}
            />
          </div>
          <div className="Row">
            <Input
              type="text"
              name="mainStashQty"
              placeholder="Main Stash Qty"
              icon="edit outline"
              value={`${mainStashQty}`}
              onChange={(value) => setMainStashQty(Number(value))}
              disabled={loading}
            />
            <Input
              type="text"
              name="secondaryStashQty"
              placeholder="Secondary Stash Qty"
              icon="edit outline"
              value={`${secondaryStashQty}`}
              onChange={(value) => setSecondaryStashQty(Number(value))}
              disabled={loading}
            />
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <button className="ui button negative hover-animation" onClick={handleClose}>
          <p className='label contrast'>Cancel</p>
          <p className='IconContainer contrast'><i className='close icon'></i></p>
        </button>
        <button className="ui button positive hover-animation" disabled={!canAdd()} onClick={handleAdd}>
          <p className='label contrast'>Confirm</p>
          <p className='IconContainer contrast'><i className='check icon'></i></p>
        </button>
      </Modal.Actions>
    </Modal>
  );
}

export default AddItemModal;