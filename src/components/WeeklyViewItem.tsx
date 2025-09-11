import React, { Dispatch, SetStateAction, useEffect } from "react";
import { WeatherDay } from "@/types/weather";
import { Divide } from "lucide-react";
import { WateringArray } from "@/types/watering";

const rainThreshold = 2;

export default function WeeklyViewItem({
  weather,
  watering,
}: {
  weather: WeatherDay;
  watering: WateringArray;
}) {
  const todayDate = new Date();
  const currDate = new Date(weather.date);
  const currDateName = todayDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  // Styling
  const cssContainerBase =
    "text-white p-4 rounded-xl text-center mb-8 space-y-4 shadow-lg w-32 h-full flex flex-col justify-between items-center  gap-4";
  const cssNotToday = "bg-secondary";
  const cssToday = "scale-110 bg-accent";

  const cssContainer = watering.isToday
    ? `${cssContainerBase} ${cssToday}`
    : `${cssContainerBase} ${cssNotToday}`;

  return (
    <div className="flex flex-col">
      <div className={cssContainer}>
        <div className="">
          <h2 className="font-bold">{currDateName}</h2>
          <p className=" mb-4">{weather.date}</p>
          <div>
            <p className="text-3xl">{weather.day.avgtemp_c}°C</p>
            <div className="flex justify-between text-xs">
              <p>{weather.day.mintemp_c}°C</p>
              <p>{weather.day.maxtemp_c}°C</p>
            </div>
          </div>
        </div>
        <p>{weather.day.daily_chance_of_rain}%</p>
        <p>{weather.day.totalprecip_mm}mm</p>
      </div>

      {watering.isLastWater && <div>💦</div>}

      {/* {daysSinceLastWatering > 0 && ( */}
      <>
        {/* <div>{daysSinceLastWatering}</div> */}

        {watering.isRainDay && <div>🌧️</div>}
        {watering.isTempDay && <div>✅</div>}
        {watering.isWateringDay && <div>💦</div>}
      </>
      {/* )} */}
    </div>
  );
}

function getDayDifference(date1: Date, date2: Date) {
  const oneDay = 1000 * 60 * 60 * 24; // ms in a day
  const diffInTime = date2.getTime() - date1.getTime();
  return Math.round(diffInTime / oneDay);
}

// function getNextWater(
//   indexLastWatering: number,
//   weatherArray: WeatherDay[],
//   waterRequirements: WateringRequirements
// ) {
//   const weatherSinceWater = weatherArray.slice(indexLastWatering);
//   const nextWater_Temp = getNextWatering_Temperature(
//     indexLastWatering,
//     weatherSinceWater,
//     waterRequirements
//   );

//   let indicesRain: number[] = [];

//   weatherSinceWater.forEach((day, index) => {
//     if (day.day.totalprecip_mm > 5) {
//       indicesRain.push(index);
//     }
//   });

//   console.log("INDEX RAIN ", indicesRain);

//   const additionalDays_Rain = getAdditionalDays_Rain(
//     indexLastWatering,
//     weatherArray,
//     waterRequirements,
//     nextWater_Temp
//   );
// }

// function getAdditionalDays_Rain(
//   indexLastWatering: number,
//   weatherArray: WeatherDay[],
//   waterRequirements: WateringRequirements,
//   nextWater_Temp: number
// ) {
//   let additionalDays = 0;
//   const weatherSinceWater = weatherArray.slice(indexLastWatering);

//   weatherSinceWater.forEach((day, index) => {
//     if (
//       index <= nextWater_Temp + additionalDays &&
//       day.day.totalprecip_mm >= 5
//     ) {
//       additionalDays++;
//     }
//   });

//   console.log("additionalDays: ", additionalDays);
//   return additionalDays;
// }

function getLastRain(weatherArray: WeatherDay[], currDate: Date) {
  const currIndex = weatherArray.findIndex(
    (day) => new Date(day.date).toDateString() === currDate.toDateString()
  );

  let lastRain: Date | undefined = undefined;
  let index = currIndex;

  while (lastRain === undefined && index > 0) {
    index--;

    // console.log("INDEX: ", index);

    // TODO: put in varibale
    if (weatherArray[index].day.totalprecip_mm > rainThreshold) {
      lastRain = new Date(weatherArray[index].date);
    }
  }

  // console.log(lastRain);
  return lastRain;
}
