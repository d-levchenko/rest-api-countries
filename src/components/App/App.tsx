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

import type { Country } from '../../types/country';

import css from './App.module.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState(
    () => localStorage.getItem('mode') || 'light',
  );
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const debouncedSearch = useDebouncedCallback((value: string) => {
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

  const { data: area = [] } = useQuery({
    queryKey: ['region', selectedRegion],
    queryFn: () => fetchCountryByRegion(selectedRegion),
  });

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

  return (
    <>
      <div className={css.container}>
        <Navbar onChange={handleThemeChange} mode={mode} />
        <div className={css.searchFilterBlock}>
          <SearchBar onChange={debouncedSearch} />
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
