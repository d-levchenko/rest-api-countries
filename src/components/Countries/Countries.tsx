import type { Country } from '../../types/country';
import css from './Countries.module.css';
import clsx from 'clsx';

interface CountriesProps {
  countries: Country[];
  mode: boolean;
  onSelect: (country: Country) => void;
}

const Countries = ({ countries, mode, onSelect }: CountriesProps) => {
  return (
    <div className={css.countryWrapper}>
      <ul className={css.countries}>
        {countries.map(country => (
          <li
            key={country.cca3}
            className={css.countryItem}
            onClick={() => onSelect(country)}>
            <div className={mode ? css.dark : css.light}>
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
                <p>Population: {country.population}</p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital?.[0] ?? 'No capital'}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
