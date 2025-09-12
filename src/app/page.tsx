"use client";

import { SearchArea } from "@/components/SearchArea";
import WeeklyView from "@/components/WeeklyView";
import Image from "next/image";
import { useEffect, useState } from "react";
import cactusImg from "../../public/cactus.png";
import fetchWeatherForecast from "@/api/fetchWeatherData";
import { WeatherTimeline } from "@/types/weather";
import { WateringRequirements } from "@/types/watering";
import { getDayDifference } from "@/helper/dateHelpers";

export default function Home() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const [weatherTimeline, setWeatherTimeline] = useState<
    WeatherTimeline | undefined
  >(undefined);
  const [city, setCity] = useState<string | undefined>(undefined);
  const [searchError, setSearchError] = useState<string | undefined>(undefined);
  const [waterRequirements, setWaterRequirements] =
    useState<WateringRequirements>(2);
  const [lastWater, setLastWater] = useState<Date>(yesterday);
  const [startDate, setStartDate] = useState<Date>(getStartDate(lastWater)); // Number of days displayed in weather forecast +- today

  useEffect(() => {
    setStartDate(getStartDate(lastWater));
  }, [lastWater]);

  useEffect(() => {
    if (city === undefined) return;

    const getWeatherForecast = async () => {
      const { weatherTimeline, error } = await fetchWeatherForecast(
        city,
        startDate
      );
      setWeatherTimeline(weatherTimeline);
      setSearchError(error);
    };

    getWeatherForecast();
  }, [city, lastWater, startDate]);

  return (
    <main className="bg-gradient-to-t from-tertiary to-tertiary/20 min-h-screen w-screen flex justify-center items-center flex-col gap-6">
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
          Hate wasting water? Determine the best schedule to water your garden!
        </p>
      </div>
      <div className="max-w-3/4 w-full bg-white rounded-xl shadow-lg px-6 py-8 flex flex-col items-center justify-center  gap-20">
        {!weatherTimeline?.location ? (
          <>
            <SearchArea
              city={city}
              setCity={setCity}
              waterRequirements={waterRequirements}
              setWaterRequirements={setWaterRequirements}
              lastWater={lastWater}
              setLastWater={setLastWater}
            />
            {searchError !== undefined && <p>{searchError}</p>}
          </>
        ) : (
          weatherTimeline?.location &&
          searchError === undefined && (
            <>
              <SearchArea
                city={city}
                setCity={setCity}
                waterRequirements={waterRequirements}
                setWaterRequirements={setWaterRequirements}
                lastWater={lastWater}
                setLastWater={setLastWater}
              />
              <div className="space-y-6 text-center ">
                <p className="text-dark text-end">
                  {weatherTimeline.location.name},{" "}
                  {weatherTimeline.location.region},{" "}
                  {weatherTimeline.location.country}
                </p>
                <div>
                  <WeeklyView
                    weatherTimeline={weatherTimeline}
                    startDate={startDate}
                    waterRequirements={waterRequirements}
                    lastWatering={lastWater}
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

function getStartDate(lastWater: Date) {
  const todayDate = new Date();

  const minRange = 5; // TODO: all global variables in one place!!!
  const daysSinceWater = getDayDifference(lastWater, todayDate);

  const minDateCount = Math.max(minRange, daysSinceWater);
  const minDate = todayDate;
  minDate.setDate(todayDate.getDate() - minDateCount);

  const weekdayOfMinDate = minDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  // TODO: make flexible - start on Sun oder Mon
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  console.log("WEEKDAY:", weekdayOfMinDate);
  console.log("WEEKDAY[0]:", weekdays[0]);

  if (weekdayOfMinDate === weekdays[0]) {
    return minDate;
  } else {
    const indexMinDate = weekdays.findIndex((day) => day === weekdayOfMinDate);

    console.log(indexMinDate);
    let targetDate = minDate;
    targetDate.setDate(minDate.getDate() - (indexMinDate + 1));

    console.log("-1", targetDate);

    return targetDate;
  }
}
