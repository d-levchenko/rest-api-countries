import css from './CountryItem.module.css';
import clsx from 'clsx';
import type { Country } from '../../types/country';

interface CountryItemProps {
  country: Country;
  mode: string;
  onSelect: (country: Country) => void;
}

const CountryItem = ({ country, mode, onSelect }: CountryItemProps) => {
  return (
    <li
      key={country.cca3}
      className={css.countryItem}
      onClick={() => onSelect(country)}>
      <img
        className={css.image}
        src={country.flags.png}
        alt={country.name.common}
        loading="lazy"
        fetchPriority="low"
      />
      <div
        className={clsx(
          css.wrapperText,
          mode ? css.wrapperTextDark : css.wrapperTextLight,
        )}>
        <p className={css.countryName}>{country.name.common}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
        <p>Capital: {country.capital?.[0] ?? 'No capital'}</p>
      </div>
    </li>
  );
};

export default CountryItem;
