export interface CountriesResponse {
  data: {
    objects: Country[];
    meta: {
      total: number;
      count: number;
      limit: number;
      offset: number;
      more: boolean;
      request_id: string;
    };
  };
}

export interface Country {
  uuid: string;

  names: {
    common: string;
    official: string;
    native?: Record<
      string,
      {
        common: string;
        official: string;
      }
    >;
    translations?: Record<string, { common: string; official: string }>;
  };

  capitals: {
    name: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  }[];

  population: number;

  region: string;
  subregion?: string;

  flag: {
    emoji: string;
    url_png: string;
    url_svg: string;
    description?: string;
  };

  tlds?: string[];

  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];

  languages: {
    name: string;
    native_name?: string;
    iso639_1?: string;
  }[];

  codes: {
    alpha_2: string;
    alpha_3: string;
  };
}
