export type FetchWeatherDataResponse = {
  weatherTimeline: WeatherTimeline | undefined;
  error: string | undefined;
};

export type WeatherLocation = {
  name: string;
  region: string;
  country: string;
};

export interface WeatherDay {
  date: string;
  day: {
    avgtemp_c: number;
    maxtemp_c: number;
    mintemp_c: number;
    daily_chance_of_rain: number;
    totalprecip_mm: number;
    uv: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

export interface WeatherDataAPI {
  location: WeatherLocation;
  forecast: {
    forecastday: WeatherDay[];
  };
}

export interface WeatherTimeline {
  location: WeatherLocation;
  today: WeatherDay;
  future: WeatherDay[];
  past: WeatherDay[];
}
