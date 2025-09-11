"use client";

import { SearchLocationInput } from "@/components/SearchLocationInput";
import WeeklyView from "@/components/WeeklyView";
import Image from "next/image";
import { useEffect, useState } from "react";
import cactusImg from "../../public/cactus.png";
import fetchWeatherForecast from "@/api/fetchWeatherData";
import { WeatherTimeline } from "@/types/weather";

export default function Home() {
  const [weatherTimeline, setWeatherTimeline] = useState<
    WeatherTimeline | undefined
  >(undefined);
  const [city, setCity] = useState<string | undefined>(undefined);
  const [searchError, setSearchError] = useState<string | undefined>(undefined);

  const daysRange = 4; // Number of days displayed in weather forecast +- today

  // TODO: remove for production
  useEffect(() => {
    console.log("data: ", weatherTimeline);
    console.log("error: ", searchError);
  }, [weatherTimeline, searchError]);

  useEffect(() => {
    if (city === undefined) return;

    const getWeatherForecast = async () => {
      const { weatherTimeline, error } = await fetchWeatherForecast(
        city,
        daysRange
      );
      setWeatherTimeline(weatherTimeline);
      setSearchError(error);
    };

    getWeatherForecast();
  }, [city]);

  return (
    <main className="bg-gradient-to-t from-tertiary to-tertiary/20 h-screen w-screen flex justify-center items-center flex-col gap-6">
      <div className="text-center space-y-4 mb-6 flex flex-col items-center justify-center gap-2">
        <Image
          src={cactusImg}
          alt="cactus"
          width={100}
          height={100}
          className="rounded-full"
        />
        <h1 className="font-fancy text-dark text-4xl font-bold">Water Me!</h1>
        <p className=" text-dark  ">
          Hate wasting water? <br />
          Determine the best schedule to water your garden!
        </p>
      </div>
      <div className="max-w-3/4 w-full bg-white rounded-xl shadow-lg px-6 py-8 flex flex-col items-center justify-center h-fit gap-20">
        {!weatherTimeline?.location ? (
          <>
            <SearchLocationInput city={city} setCity={setCity} />
            {searchError !== undefined && <p>{searchError}</p>}
          </>
        ) : (
          weatherTimeline?.location &&
          searchError === undefined && (
            <>
              <SearchLocationInput city={city} setCity={setCity} />

              <div className="space-y-6 text-center ">
                <p className="text-dark text-end">
                  {weatherTimeline.location.name},{" "}
                  {weatherTimeline.location.region},{" "}
                  {weatherTimeline.location.country}
                </p>
                <div>
                  <WeeklyView
                    weatherTimeline={weatherTimeline}
                    daysRange={daysRange}
                  />
                </div>
              </div>
            </>
          )
        )}
      </div>
    </main>
  );
}
