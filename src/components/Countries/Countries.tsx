import type { Country } from '../../types/country';
import css from './Countries.module.css';
import clsx from 'clsx';

interface CountriesProps {
  countries: Country[];
  mode: boolean;
}

const Countries = ({ countries, mode }: CountriesProps) => {
  return (
    <div className={css.countryWrapper}>
      <ul className={css.countries}>
        {countries.map(
          ({
            cca3,
            flags: { png },
            name: { common },
            population,
            region,
            capital,
          }) => (
            <li key={cca3} className={css.countryItem}>
              <div className={mode ? css.dark : css.light}>
                <img
                  className={css.image}
                  src={png}
                  alt={common}
                  loading="lazy"
                  fetchPriority="low"
                />
                <div
                  className={clsx(
                    css.wrapperText,
                    mode ? css.wrapperTextDark : css.wrapperTextLight,
                  )}>
                  <p className={css.countryName}>{common}</p>
                  <p>Population: {population}</p>
                  <p>Region: {region}</p>
                  <p>Capital: {capital?.[0] ?? 'No capital'}</p>
                </div>
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default Countries;
