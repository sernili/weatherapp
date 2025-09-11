import React, { useEffect } from "react";
import WeeklyViewItem from "./WeeklyViewItem";
import { WeatherDay, WeatherTimeline } from "@/types/weather";
import { WateringRequirements, WateringLast } from "@/types/watering";

export default function WeeklyView({
  weatherTimeline,
  daysRange,
}: {
  weatherTimeline: WeatherTimeline;
  daysRange: number;
}) {
  // TODO: put in state and get from user input
  const waterRequirements: WateringRequirements = 1;
  const lastWatering: WateringLast = new Date("2025-09-06");

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

  console.log("Next: ", nextWater_Temp);

  useEffect(() => {
    console.log("DATA", weatherTimeline);
  }, [weatherTimeline]);

  return (
    <div className="grid ">
      <div className="flex gap-3 place-items-center h-full ">
        {weatherTimeline.past.map((data) => (
          <WeeklyViewItem key={data.date} weather={data} />
        ))}
        <WeeklyViewItem
          key={weatherTimeline.today.date}
          weather={weatherTimeline.today}
        />

        {weatherTimeline.future.map((data) => (
          <WeeklyViewItem key={data.date} weather={data} />
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
  // Days until watering based on Temperature and Watering Requirements
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

  let daysUntilNextWater = 0;

  const tempNextDay = weatherArray[indexLastWatering + 1].day.avgtemp_c;

  if (tempNextDay < 20) {
    daysUntilNextWater = tempRules["cold"][waterRequirements];
  } else if (tempNextDay >= 20 && tempNextDay < 30) {
    daysUntilNextWater = tempRules["medium"][waterRequirements];
  } else {
    tempRules["hot"][waterRequirements];
  }

  return daysUntilNextWater;
}
