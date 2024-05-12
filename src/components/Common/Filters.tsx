import { useState } from "react";
import Input from "./Input";
import { Checkbox } from "semantic-ui-react";

interface FiltersProps {
  tags: string[];
  onUpdate: (update: FilterData) => void;
}

export interface FilterData {
  search: string;
  tags: string[];
  hideZeroValues: boolean;
}

function Filters(props: FiltersProps) {
  const [search, setSearch] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [hideZeroValues, setHideZeroValues] = useState<boolean>(false)

  const handleSearchUpdate = (value: string) => {
    setSearch(value);
    props.onUpdate({
      search: value,
      tags,
      hideZeroValues,
    });
  }

  const handleTagsUpdate = (value: string) => {
    let updatedTags = [...tags];
    if (updatedTags.includes(value)) {
      updatedTags = updatedTags.filter(tag => tag !== value);
    } else {
      updatedTags.push(value);
    }
    setTags(updatedTags);
    props.onUpdate({
      search,
      tags: updatedTags,
      hideZeroValues,
    });
  }

  const handleCheckboxUpdate = (value: boolean) => {
    setHideZeroValues(value);
    props.onUpdate({
      search,
      tags,
      hideZeroValues: value,
    });
  }

  return (
    <div className='Filters'>
      <div className='ui form'>
        <div>
          <Input
            type="text"
            name="search"
            placeholder="Search"
            icon="search"
            value={search}
            onChange={handleSearchUpdate}
          />
          <Checkbox
            checked={hideZeroValues}
            label="Hide Zero Values"
            toggle
            onChange={() => handleCheckboxUpdate(!hideZeroValues)}
          />
        </div>
        {props.tags.length > 0 && (
          <div className="FilterLabels">
            {props.tags.sort((a, b) => a.localeCompare(b)).map(tag => (
              <div className={`ui label ${tags.includes(tag) ? 'selected pale' : ''}`} onClick={() => handleTagsUpdate(tag)}>
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Filters;