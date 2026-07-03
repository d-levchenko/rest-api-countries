import axios from 'axios';
import type { CountriesResponse } from '../types/country';

const api = axios.create({
  baseURL: 'https://api.restcountries.com',
});

const API_KEY = import.meta.env.VITE_COUNTRY_TOKEN;

export const fetchCountries = async (
  search = '',
  page = 1,
  limit = 12,
): Promise<CountriesResponse['data']> => {
  const offset = (page - 1) * limit;

  const { data } = await api.get<CountriesResponse>('/countries/v5', {
    params: {
      q: search || undefined,
      limit,
      offset,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return data.data;
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
