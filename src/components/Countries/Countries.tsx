import { useEffect, useState } from 'react';

import type { Country } from '../../types/country';
import fetchCountries from '../../services/countryService';
import css from './Countries.module.css';

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };

    loadCountries();
  }, []);

  return (
    <div className={css.countryWrapper}>
      <ul className={css.countries}>
        {countries.map(country => (
          <li key={country.cca3} className={css.countryItem}>
            <img
              className={css.image}
              src={country.flags.png}
              alt={country.name.common}
            />
            <div className={css.wrapperText}>
              <p className={css.countryName}>
                <strong>{country.name.common}</strong>
              </p>
              <p>
                <strong>Population: </strong> {country.population}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Capital:</strong> {country.capital?.[0] ?? 'No capital'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
