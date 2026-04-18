import type { ChangeEvent } from 'react';
import { IoIosSearch } from 'react-icons/io';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onChange: (value: string) => void;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={css.inputDiv}>
      <span className={css.searchInput}>
        <IoIosSearch />
      </span>
      <input
        className={css.input}
        type="text"
        name="search"
        placeholder="Search country..."
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
