import { useMemo, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import fetchCountries from '../../services/countryService';
import Countries from '../Countries/Countries';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import Navbar from '../Navbar/Navbar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Dropdown from '../DropdownSelect/DropdownSelect';
import ModalWindow from '../ModalWindow/ModalWindow';

import type { Country } from '../../types/country';

import css from './App.module.css';

const ITEMS_PER_PAGE = 12;

const App = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [mode, setMode] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setCurrentPage(1);
    setSearch(value);
  }, 500);

  const {
    data: countries = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['countries', search],
    queryFn: () => fetchCountries(search),
    placeholderData: keepPreviousData,
  });

  const filteredCountries = useMemo(() => {
    if (!selectedRegion) return countries;
    return countries.filter(({ region }) => region === selectedRegion);
  }, [countries, selectedRegion]);

  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);

  const currentCountries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCountries.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCountries, currentPage]);

  const handleThemeChange = () => {
    setMode(prev => !prev);
  };

  const handleSelect = (region: string) => {
    setSelectedRegion(region);
    setCurrentPage(1);
  };

  return (
    <>
      <div className={mode ? css.dark : css.light}>
        <div className={css.container}>
          <Navbar onChange={handleThemeChange} mode={mode} />
          <div className={css.searchFilterBlock}>
            <SearchBar onChange={debouncedSearch} />
            <Dropdown selectedRegion={selectedRegion} onSelect={handleSelect} />
          </div>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          {countries.length > 0 && (
            <Countries
              countries={currentCountries}
              mode={mode}
              onSelect={setSelectedCountry}
            />
          )}
          {isLoading && <Loader />}
          {isError && !isLoading && <ErrorMessage />}
          {selectedCountry && (
            <ModalWindow
              country={selectedCountry}
              onClose={() => setSelectedCountry(null)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
