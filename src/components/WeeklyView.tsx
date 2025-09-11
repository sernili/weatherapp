import React, { useEffect } from "react";
import WeeklyViewItem from "./WeeklyViewItem";
import { WeatherDay, WeatherTimeline } from "@/types/weather";
import { WateringRequirements, WateringLast } from "@/types/watering";
import next from "next";

export default function WeeklyView({
  weatherTimeline,
  daysRange,
}: {
  weatherTimeline: WeatherTimeline;
  daysRange: number;
}) {
  // TODO: put in state and get from user input
  const waterRequirements: WateringRequirements = 3;
  const lastWatering: WateringLast = new Date("2025-09-07");

  // Watering Logic
  const today: Date = new Date();
  const daysSinceLastWatering = getDayDifference(lastWatering, today);
  const weatherArray = [
    ...weatherTimeline.past,
    weatherTimeline.today,
    ...weatherTimeline.future,
  ];
  const indexToday = daysRange;
  const indexLastWatering =
    indexToday - daysSinceLastWatering < 0
      ? 0
      : indexToday - daysSinceLastWatering;

  const nextWater_Temp = getNextWatering_Temperature(
    indexLastWatering,
    weatherArray,
    waterRequirements
  );

  const additionalDays_Rain = getAdditionalDays_Rain(
    indexLastWatering,
    weatherArray,
    waterRequirements,
    nextWater_Temp
  );

  console.log("Next: ", nextWater_Temp);

  useEffect(() => {
    console.log("DATA", weatherTimeline);
  }, [weatherTimeline]);

  return (
    <div className="grid ">
      <div className="flex gap-3 place-items-center h-full ">
        {weatherArray.map((data) => (
          <WeeklyViewItem
            key={data.date}
            weather={data}
            daysSinceLastWatering={getDayDifference(
              lastWatering,
              new Date(data.date)
            )}
            nextWater_Temp={nextWater_Temp}
            additionalDays_Rain={additionalDays_Rain}
          />
        ))}
      </div>
    </div>
  );
}

function getDayDifference(date1: Date, date2: Date) {
  const oneDay = 1000 * 60 * 60 * 24; // ms in a day
  const diffInTime = date2.getTime() - date1.getTime();
  return Math.round(diffInTime / oneDay);
}

function getNextWatering_Temperature(
  indexLastWatering: number,
  weatherArray: WeatherDay[],
  waterRequirements: WateringRequirements
) {
  let daysUntilWatering = 0;
  const tempNextDay = weatherArray[indexLastWatering + 1].day.avgtemp_c;

  const tempRules = {
    cold: {
      1: 5,
      2: 4,
      3: 3,
    },
    medium: {
      1: 3,
      2: 2,
      3: 2,
    },
    hot: {
      1: 2,
      2: 1,
      3: 1,
    },
  };

  if (tempNextDay < 20) {
    daysUntilWatering = tempRules["cold"][waterRequirements];
  } else if (tempNextDay >= 20 && tempNextDay < 30) {
    daysUntilWatering = tempRules["medium"][waterRequirements];
  } else {
    daysUntilWatering = tempRules["hot"][waterRequirements];
  }

  return daysUntilWatering;
}

function getAdditionalDays_Rain(
  indexLastWatering: number,
  weatherArray: WeatherDay[],
  waterRequirements: WateringRequirements,
  nextWater_Temp: number
) {
  let additionalDays = 0;
  const weatherSinceWater = weatherArray.slice(indexLastWatering);

  weatherSinceWater.forEach((day, index) => {
    if (
      index <= nextWater_Temp + additionalDays &&
      day.day.totalprecip_mm >= 5
    ) {
      additionalDays++;
    }
  });

  console.log("additionalDays: ", additionalDays);
  return additionalDays;
}
