import type { Country } from '../../types/country';
import css from './Countries.module.css';

interface CountriesProps {
  countries: Country[];
}

const Countries = ({ countries }: CountriesProps) => {
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
              <img className={css.image} src={png} alt={common} />
              <div className={css.wrapperText}>
                <p className={css.countryName}>
                  <strong>{common}</strong>
                </p>
                <p>
                  <strong>Population: </strong> {population}
                </p>
                <p>
                  <strong>Region:</strong> {region}
                </p>
                <p>
                  <strong>Capital:</strong> {capital?.[0] ?? 'No capital'}
                </p>
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default Countries;
