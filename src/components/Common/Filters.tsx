import { useState } from "react";
import Input from "./Input";

interface FiltersProps {
  tags: string[];
  onUpdate: (update: FilterData) => void;
}

export interface FilterData {
  search: string;
  tags: string[];
}

function Filters(props: FiltersProps) {
  const [search, setSearch] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSearchUpdate = (value: string) => {
    setSearch(value);
    props.onUpdate({
      search: value,
      tags,
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
    });
  }

  return (
    <div className='Filters'>
      <div className='ui form'>
        <Input
          type="text"
          name="search"
          placeholder="Search"
          icon="search"
          value={search}
          onChange={handleSearchUpdate}
        />
        {props.tags.length > 0 && (
          <div className="Tags">
            {props.tags.sort((a, b) => a.localeCompare(b)).map(tag => (
              <div className={`ui label ${tags.includes(tag) ? 'selected' : ''}`} onClick={() => handleTagsUpdate(tag)}>
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