import axios from 'axios';
import type { CountriesResponse } from '../types/country';

const api = axios.create({
  baseURL: 'https://api.restcountries.com',
});

const API_KEY = import.meta.env.VITE_COUNTRY_TOKEN;

export const fetchCountries = async (search?: string) => {
  let searchParams = {
    q: search,
  };

  if (!search) {
    searchParams = {
      q: undefined,
    };
  }

  const { data } = await api.get<CountriesResponse>('/countries/v5', {
    params: {
      ...searchParams,
      limit: 90,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return data.data.objects;
};

export const fetchCountryByRegion = async (region?: string) => {
  let searchRegion = {
    region: region,
  };

  if (!region) {
    searchRegion = {
      region: undefined,
    };
  }

  const { data } = await api.get<CountriesResponse>('/countries/v5', {
    params: {
      ...searchRegion,
      limit: 90,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return data.data.objects;
};
