import axios from 'axios';
import type { Country } from '../types/country';

const fetchCountries = async (): Promise<Country[]> => {
  const url =
    'https://restcountries.com/v3.1/all?fields=name,cca3,capital,population,region,subregion,flags,tld,currencies,languages';

  try {
    const response = await axios.get<Country[]>(url);
    if (!response || !response.data) {
      throw new Error('No data returned from API');
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Unknown error occurred');
    }
    return [];
  }
};

export default fetchCountries;
