import React, { useEffect, useState } from "react";
import WeeklyViewItem from "./WeeklyViewItem";
import { WeatherDay, WeatherTimeline } from "@/types/weather";
import {
  WateringRequirements,
  WateringLast,
  WateringArray,
} from "@/types/watering";
import { getDayDifference } from "@/helper/dateHelpers";

const rainThreshold = 1;

const tempRules: Record<"cold" | "medium" | "hot", Record<number, number>> = {
  cold: { 1: 5, 2: 4, 3: 3 },
  medium: { 1: 3, 2: 2, 3: 2 },
  hot: { 1: 2, 2: 1, 3: 1 },
};

export default function WeeklyView({
  weatherTimeline,
  startDate,
  waterRequirements,
  lastWatering,
}: {
  weatherTimeline: WeatherTimeline;
  startDate: Date;
  waterRequirements: WateringRequirements;
  lastWatering: Date;
}) {
  const [weatherArray, setWeatherArray] = useState<WeatherDay[]>([]);

  useEffect(() => {
    setWeatherArray([
      ...weatherTimeline.past,
      weatherTimeline.today,
      ...weatherTimeline.future,
    ]);
  }, [weatherTimeline]);

  const wateringDays: Date[] = [lastWatering];
  const rainDays: Date[] = [];

  const wateringArray: WateringArray[] = weatherArray.flatMap((day, index) => {
    const todayDate = new Date();
    const currDate = new Date(day.date);

    todayDate.setHours(0, 0, 0, 0);
    currDate.setHours(0, 0, 0, 0);

    const isToday = todayDate.toDateString() === currDate.toDateString();

    const isLastWater = currDate.toDateString() == lastWatering.toDateString();

    const isRainDay = !isLastWater && day.day.totalprecip_mm > rainThreshold;

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
      : getDayDifference(startDate, todayDate);

    const daysSinceWater =
      daysSinceLastWatering < 0 && daysSinceLastRain >= 0
        ? daysSinceLastRain
        : daysSinceLastRain < 0 && daysSinceLastWatering >= 0
        ? daysSinceLastWatering
        : Math.min(daysSinceLastRain, daysSinceLastWatering);

    const isWateringDay =
      todayDate <= currDate &&
      !isRainDay &&
      ((currDaysUntilWaterNeeded <= daysSinceWater && isToday) ||
        currDaysUntilWaterNeeded === daysSinceWater);

    if (isWateringDay) {
      wateringDays.push(currDate);
    }

    const isTempDay =
      !isRainDay &&
      !isLastWater &&
      !isWateringDay &&
      (daysSinceWater < 0 || daysSinceWater < currDaysUntilWaterNeeded);

    const isWarnDay =
      !isRainDay && !isLastWater && !isWateringDay && !isTempDay;

    return {
      date: currDate,
      isToday,
      isLastWater,
      isRainDay,
      isTempDay,
      isWateringDay,
      isWarnDay,
    };
  });

  return (
    <div className="grid ">
      <div className="grid grid-cols-7 gap-x-3  gap-y-12 place-items-center h-full ">
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
