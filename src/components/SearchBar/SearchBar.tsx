import type { ChangeEvent } from 'react';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onChange: (value: string) => void;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search country..."
      onChange={handleChange}
    />
  );
};

export default SearchBar;
