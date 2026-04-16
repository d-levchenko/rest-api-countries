import { useMemo, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import fetchCountries from '../../services/countryService';
import Countries from '../Countries/Countries';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import css from './App.module.css';

const ITEMS_PER_PAGE = 12;

const App = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setCurrentPage(1);
    setSearch(value);
  }, 500);

  const { data: countries = [] } = useQuery({
    queryKey: ['countries', search],
    queryFn: () => fetchCountries(search),
    placeholderData: keepPreviousData,
  });

  const totalPages = Math.ceil(countries.length / ITEMS_PER_PAGE);

  const currentCountries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return countries.slice(start, start + ITEMS_PER_PAGE);
  }, [countries, currentPage]);

  return (
    <>
      <div className={css.container}>
        <SearchBar onChange={debouncedSearch} />
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
          <ErrorMessage />
        )}
      </div>
    </>
  );
};

export default App;
