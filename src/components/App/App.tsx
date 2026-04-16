// import css from './App.module.css';
import { useState, useEffect, useMemo } from 'react';

import Countries from '../Countries/Countries';
import type { Country } from '../../types/country';
import fetchCountries from '../../services/countryService';
import Pagination from '../Pagination/Pagination';
import css from './App.module.css';

const ITEMS_PER_PAGE = 12;

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };

    loadCountries();
  }, []);

  const totalPages = Math.ceil(countries.length / ITEMS_PER_PAGE);

  const currentCountries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return countries.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, countries]);

  return (
    <>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
      {countries.length > 0 ? (
        <Countries countries={currentCountries} />
      ) : (
        <p className={css.text}>Sorry, no countries found</p>
      )}
    </>
  );
};

export default App;
