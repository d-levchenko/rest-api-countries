import type { Country } from '../../types/country';
import CountryItem from '../CountryItem/CountryItem';
import css from './Countries.module.css';

interface CountriesProps {
  countries: Country[];
  mode: string;
  onSelect: (country: Country) => void;
}

const Countries = ({ countries, mode, onSelect }: CountriesProps) => {
  return (
    <div className={css.countryWrapper}>
      <ul className={css.countries}>
        {countries.map(country => (
          <CountryItem
            key={country.uuid}
            country={country}
            mode={mode}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
};

export default Countries;
