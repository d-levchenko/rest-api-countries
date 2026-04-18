import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import css from './DropdownSelect.module.css';

const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

interface DropdownProps {
  selectedRegion: string;
  onSelect: (region: string) => void;
}

const Dropdown = ({ selectedRegion, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (region: string) => {
    onSelect(region === 'All' ? '' : region);
    setIsOpen(false);
  };

  return (
    <div className={css.box}>
      <button className={css.button} onClick={() => setIsOpen(prev => !prev)}>
        <span>{selectedRegion || 'Filter by Region'}</span>
        <IoIosArrowDown
          className={`${css.arrow} ${isOpen ? css.rotate : ''}`}
        />
      </button>

      {isOpen && (
        <ul className={css.menu}>
          {regions.map(region => (
            <li key={region} onClick={() => handleClick(region)}>
              {region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
