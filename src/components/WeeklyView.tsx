import React, { useEffect, useState } from "react";
import WeeklyViewItem from "./WeeklyViewItem";
import { WeatherDay, WeatherTimeline } from "@/types/weather";
import {
  WateringRequirements,
  WateringLast,
  WateringArray,
} from "@/types/watering";

const rainThreshold = 1;

const tempRules: Record<"cold" | "medium" | "hot", Record<number, number>> = {
  cold: { 1: 5, 2: 4, 3: 3 },
  medium: { 1: 3, 2: 2, 3: 2 },
  hot: { 1: 2, 2: 1, 3: 1 },
};

export default function WeeklyView({
  weatherTimeline,
  daysRange,
  waterRequirements,
}: {
  weatherTimeline: WeatherTimeline;
  daysRange: number;
  waterRequirements: WateringRequirements;
}) {
  // TODO: put in state and get from user input
  const lastWatering: WateringLast = new Date("2025-09-07");

  const [weatherArray, setWeatherArray] = useState<WeatherDay[]>([]);

  useEffect(() => {
    setWeatherArray([
      ...weatherTimeline.past,
      weatherTimeline.today,
      ...weatherTimeline.future,
    ]);
  }, [weatherTimeline]);

  const todayDate = new Date();
  const wateringDays: Date[] = [lastWatering];
  const rainDays: Date[] = [];

  const wateringArray: WateringArray[] = weatherArray.flatMap((day, index) => {
    const currDate = new Date(day.date);
    const isToday = todayDate.toDateString() === currDate.toDateString();

    const isLastWater = currDate.toDateString() == lastWatering.toDateString();

    const isRainDay = day.day.totalprecip_mm > rainThreshold;

    if (isRainDay) {
      rainDays.push(currDate);
    }

    const currAvgTemp = day.day.avgtemp_c;
    const currTempRule =
      currAvgTemp < 20
        ? "cold"
        : currAvgTemp >= 20 && currAvgTemp < 30
        ? "medium"
        : "hot";

    const currDaysUntilWaterNeeded: number =
      tempRules[currTempRule][waterRequirements];

    const daysSinceLastWatering = getDayDifference(
      wateringDays[wateringDays.length - 1],
      currDate
    );

    const daysSinceLastRain = rainDays.length
      ? getDayDifference(rainDays[rainDays.length - 1], currDate)
      : daysSinceLastWatering;

    const daysSinceWater = Math.min(daysSinceLastRain, daysSinceLastWatering);

    const isTempDay =
      !isRainDay && !isLastWater && daysSinceWater < currDaysUntilWaterNeeded;
    const isWateringDay = currDaysUntilWaterNeeded === daysSinceWater;

    if (isWateringDay) {
      wateringDays.push(currDate);
    }

    return {
      date: currDate,
      isToday,
      isLastWater,
      isRainDay,
      isTempDay,
      isWateringDay,
    };
  });

  return (
    <div className="grid ">
      <div className="flex gap-3 place-items-center h-full ">
        {weatherArray.map((data, index) => (
          <WeeklyViewItem
            key={data.date}
            weather={data}
            watering={wateringArray[index]}
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
