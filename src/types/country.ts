export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  population: number;
  region: string;
  subregion?: string;
  flags: {
    png: string;
    svg: string;
  };
  tld?: string[];
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
  cca3: string;
}
