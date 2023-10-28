import { useState } from "react";
import { Dropdown } from "semantic-ui-react";

export interface DropdownOption {
  key: string;
  text: string;
  value: any;
  description?: string;
}

interface DropdownProps {
  placeholder: string,
  multiple?: boolean,
  disabled?: boolean,
  readonly?: boolean,
  options: DropdownOption[],
  value: string | string[],
  clearable?: boolean,
  noLabel?: boolean,
  onChange: (value: any) => void;
}

function CustomDropdown({
  placeholder,
  multiple,
  disabled,
  readonly,
  options,
  value,
  clearable,
  noLabel,
  onChange,
}: DropdownProps) {
  const [showCopyLabel, setShowCopyLabel] = useState(false);

  function handleClick() {
    if (readonly) {
      let copyValue = '';

      if (typeof value === 'string') {
        const selectedOption = options.find(option => option.key === value);
        if (selectedOption) {
          copyValue = selectedOption.text;
        }
      } else {
        const selectedOptions = options
          .filter(option => value.indexOf(option.key) >= 0)
          .map(option => option.text);
        if (selectedOptions.length > 0) {
          copyValue = selectedOptions.join(', ');
        }
      }

      navigator.clipboard.writeText(copyValue);
      setShowCopyLabel(true);
      setTimeout(() => { setShowCopyLabel(false); }, 2000);
    }
  }

  return (
    <div
      className={`dropdown field ${disabled ? 'disabled' : ''} ${readonly ? 'readonly' : ''}`}
      onClick={handleClick}
    >
      {(!value.length || !noLabel) && (
        <p className={`field-label ${value.length ? 'resized' : ''}`}>{placeholder}</p>
      )}
      <Dropdown
        fluid
        selection
        search
        multiple={multiple}
        clearable={clearable && !disabled && !readonly}
        disabled={disabled || readonly}
        options={options}
        value={value}
        onChange={(_, { value }) => onChange(value)}
      />
      {showCopyLabel &&
        <div className="ui left pointing green basic label CopyLabel">
          Copied!
        </div>
      }
    </div>
  );
}

export default CustomDropdown;