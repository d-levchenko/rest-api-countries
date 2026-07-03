import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import {
  fetchCountries,
  fetchCountryByRegion,
} from '../../services/countryService';
import Countries from '../Countries/Countries';
import SearchBar from '../SearchBar/SearchBar';
import Navbar from '../Navbar/Navbar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Dropdown from '../DropdownSelect/DropdownSelect';
import ModalWindow from '../ModalWindow/ModalWindow';
import Pagination from '../Pagination/Pagination';

import type { Country } from '../../types/country';

import css from './App.module.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState(
    () => localStorage.getItem('mode') || 'light',
  );
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['countries', search, page, 12],
    queryFn: () => fetchCountries(search, page, 12),
    placeholderData: keepPreviousData,
  });

  const { data: area = [] } = useQuery({
    queryKey: ['region', selectedRegion],
    queryFn: () => fetchCountryByRegion(selectedRegion),
    enabled: selectedRegion !== '',
  });

  const countries = data?.objects ?? [];
  const meta = data?.meta;

  const handleSelect = (region: string) => {
    setSelectedRegion(region);
  };

  useEffect(() => {
    localStorage.setItem('mode', mode);
    document.body.className = mode;
  }, [mode]);

  const handleClose = () => setSelectedCountry(null);

  const handleThemeChange = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const totalPages = meta ? Math.ceil(meta?.total / meta?.limit) : 0;

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <div className={css.container}>
        <Navbar onChange={handleThemeChange} mode={mode} />
        <div className={css.searchFilterBlock}>
          <SearchBar onChange={debouncedSearch} />
          {countries.length > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
          <Dropdown selectedRegion={selectedRegion} onSelect={handleSelect} />
        </div>
        {countries.length > 0 && selectedRegion === '' ? (
          <Countries
            countries={countries}
            mode={mode}
            onSelect={setSelectedCountry}
          />
        ) : (
          <Countries
            countries={area}
            mode={mode}
            onSelect={setSelectedCountry}
          />
        )}
        {isLoading && <Loader />}
        {isError && !isLoading && <ErrorMessage />}
        {selectedCountry && (
          <ModalWindow country={selectedCountry} onClose={handleClose} />
        )}
      </div>
    </>
  );
};

export default App;
