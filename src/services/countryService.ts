import axios from 'axios';
import type { Country } from '../types/country';

const fields =
  'name,cca3,capital,population,region,flags,tld,currencies,languages';

const fetchCountries = async (search?: string): Promise<Country[]> => {
  const baseUrl = 'https://restcountries.com/v3.1';

  const url = search?.trim()
    ? `${baseUrl}/name/${search}`
    : `${baseUrl}/all?fields=${fields}`;

  const { data } = await axios.get<Country[]>(url);
  return data;
};

export default fetchCountries;
