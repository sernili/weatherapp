"use client";

import { SearchCity } from "@/components/SearchCity";
import WeeklyView from "@/components/WeeklyView";
import { useEffect, useState } from "react";

export default function Home() {
  const [weatherForecast, setWeatherForecast] = useState([]);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      const response = await fetch(
        "http://api.weatherapi.com/v1/forecast.json?key=c693abb5cb6542a3b25130852250509&q=Dresden&days=7&aqi=no&alerts=no"
      );
      const data = await response.json();
      setWeatherForecast(data.forecast.forecastday);
    };
    fetchWeatherForecast();
  }, []);

  useEffect(() => {
    console.log(weatherForecast);
  }, [weatherForecast]);

  return (
    <main className="bg-gradient-radial from-gray-800 to-black h-screen w-screen flex justify-center">
      <SearchCity />
      <WeeklyView />
    </main>
  );
}
