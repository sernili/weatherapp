"use client";

import { SearchLocationInput } from "@/components/SearchLocationInput";
import WeeklyView from "@/components/WeeklyView";
import Image from "next/image";
import { useEffect, useState } from "react";
import cactusImg from "../../public/cactus.png";
import LastWater from "@/components/LastWater";

export default function Home() {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("");
  const [searchError, setSearchError] = useState("");

  const fetchWeatherForecast = async (city: string) => {
    if (!city) return;

    const url = `http://api.weatherapi.com/v1/forecast.json?key=c693abb5cb6542a3b25130852250509&q=${city}&days=7&aqi=no&alerts=no`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      setWeatherData(result);
      setSearchError("");
    } catch (error) {
      setSearchError("No city found!");
      console.error(error.message);
    }
  };

  useEffect(() => {
    console.log("data: ", weatherData.location);
    console.log("error: ", searchError == "");
  }, [weatherData]);

  useEffect(() => {
    fetchWeatherForecast(city);
    console.log("city: ", city);
  }, [city]);

  return (
    <main className="bg-tertiary h-screen w-screen flex justify-center items-center flex-col gap-6">
      <div className="text-center space-y-4 mb-6 flex flex-col items-center justify-center gap-2">
        <Image
          src={cactusImg}
          alt="cactus"
          width={100}
          height={100}
          className="rounded-full"
        />
        <h1 className="font-mono text-dark text-4xl font-bold">Water Me!</h1>
        <p className=" text-dark  ">
          Hate wasting water? Determine the best schedule to water your garden!
        </p>
      </div>
      <div className="max-w-3/4 w-full bg-white rounded-xl px-6 py-8 flex flex-col items-center justify-center h-fit gap-20">
        {!weatherData.location ? (
          <>
            <SearchLocationInput city={city} setCity={setCity} />
            {searchError && <p>{searchError}</p>}
          </>
        ) : (
          weatherData.location &&
          searchError == "" && (
            <>
              <SearchLocationInput city={city} setCity={setCity} />
              <div className="space-y-6 text-center ">
                <p className="text-dark text-end">
                  {weatherData.location.name}, {weatherData.location.region},{" "}
                  {weatherData.location.country}
                </p>
                <div>
                  <WeeklyView weatherData={weatherData} />
                </div>
              </div>
            </>
          )
        )}
      </div>
    </main>
  );
}
