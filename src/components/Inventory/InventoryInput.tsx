interface InventoryInputProps {
    value: number;
    showButtons?: boolean;
    onChange: (value: number) => void;
    onRemove: () => void;
    onAdd: () => void;
}

function InventoryInput(props: InventoryInputProps) {
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'ArrowDown' && props.value > 0) {
            props.onRemove();
        } else if (e.key === 'ArrowUp') {
            props.onAdd();
        }
    }

    return (
        <div className="InventoryInput ui form">
            {props.showButtons && (
                <button className="ui button negative" disabled={props.value <= 0} onClick={props.onRemove}>
                    <i className="minus icon"></i>
                </button>
            )}
            <div className='ui input'>
                <input
                    className={props.showButtons ? "has-buttons" : ""}
                    name='quantity'
                    type="text"
                    value={props.value}
                    onChange={({ target }) => props.onChange(Number(target.value))}
                    onKeyDown={handleKeyDown}
                    autoComplete='off'
                />
            </div>
            {props.showButtons && (
                <button className="ui button positive" onClick={props.onAdd}>
                    <i className="add icon"></i>
                </button>
            )}
        </div>
    )
}

export default InventoryInput