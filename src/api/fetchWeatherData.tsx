import { getDayDifference } from "@/helper/dateHelpers";
import {
  WeatherDataAPI,
  WeatherTimeline,
  WeatherDay,
  WeatherLocation,
  FetchWeatherDataResponse,
} from "@/types/weather";

const weather_api_key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export default async function fetchWeatherForecast(
  city: string | undefined,
  startDate: Date
): Promise<FetchWeatherDataResponse> {
  if (!city) return { weatherTimeline: undefined, error: "City not found" };

  let weatherTimeline: WeatherTimeline | undefined = undefined;
  let error: string | undefined = undefined;

  const pastDates: string[] = getTargetPastDates(startDate);

  try {
    // Fetch Data from Weather API
    const promisesPast = pastDates.map((date) => {
      return fetch(
        `https://api.weatherapi.com/v1/history.json?key=${weather_api_key}&q=${city}&dt=${date}`
      );
    });

    const promiseFuture = fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weather_api_key}&q=${city}&days=14&aqi=no&alerts=no`
    );

    const allPromises = [promiseFuture, ...promisesPast];

    const responses = await Promise.all(allPromises);

    const results: WeatherDataAPI[] = await Promise.all(
      responses.map(async (res) => {
        if (!res.ok) throw new Error(`Fetch error for ${res.url}`);
        return res.json();
      })
    );

    // Transform Data into Required Format
    const location: WeatherLocation = results[0].location; // TODO: validate that locations from API calls match;
    const today: WeatherDay = results[0].forecast.forecastday[0];
    const future: WeatherDay[] = results[0].forecast.forecastday.splice(1);
    const past: WeatherDay[] = results.slice(1).flatMap((result) => {
      return result.forecast.forecastday;
    });

    weatherTimeline = {
      location,
      today,
      future,
      past,
    };
  } catch (error) {
    console.error((error as Error).message);
  }

  return { weatherTimeline, error };
}

function getTargetPastDates(startDate: Date): string[] {
  const pastDates = [];
  const numDays = getDayDifference(startDate, new Date()) - 1;

  for (let i = numDays; i > 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    pastDates.push(date.toLocaleDateString("en-CA"));
  }

  console.log(pastDates);

  return pastDates;
}
