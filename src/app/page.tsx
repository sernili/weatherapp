"use client";

import { SearchLocationInput } from "@/components/SearchLocationInput";
import WeeklyView from "@/components/WeeklyView";
import { useEffect, useState } from "react";

export default function Home() {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("");
  const [searchError, setSearchError] = useState("");

  const fetchWeatherForecast = async (city: string) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=c693abb5cb6542a3b25130852250509&q=${city}&days=7&aqi=no&alerts=no`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log("RESULT", result);

      setWeatherData(result);
      setSearchError("");
    } catch (error) {
      setSearchError("No city found!");
      console.error(error.message);
    }
  };

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  useEffect(() => {
    fetchWeatherForecast(city);
    console.log(city);
  }, [city]);

  return (
    <main className="bg-tertiary h-screen w-screen flex justify-center items-center flex-col gap-6">
      <h1 className="font-mono text-dark text-4xl font-bold">Water Me!</h1>
      <div className="max-w-3/4 w-full bg-white rounded-xl px-6 py-8 flex flex-col items-center justify-center h-fit gap-6">
        <SearchLocationInput city={city} setCity={setCity} />

        {searchError && <p>{searchError}</p>}

        {weatherData && !searchError && (
          <>
            <p className="text-dark">
              {weatherData.location.name}, {weatherData.location.region},{" "}
              {weatherData.location.country}
            </p>

            <WeeklyView weatherData={weatherData} />
          </>
        )}
      </div>
    </main>
  );
}
