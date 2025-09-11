import React, { useEffect, useState } from "react";
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
  const waterRequirements: WateringRequirements = 3;
  const lastWatering: WateringLast = new Date("2025-09-07");

  const [weatherArray, setWeatherArray] = useState<WeatherDay[]>([]);

  useEffect(() => {
    setWeatherArray([
      ...weatherTimeline.past,
      weatherTimeline.today,
      ...weatherTimeline.future,
    ]);
  }, [weatherTimeline]);

  // useEffect(() => {
  //   setDaysUntilWatering(
  //     getNextWatering_Temperature(
  //       lastWatering,
  //       lastRain,
  //       waterRequirements,
  //       weatherArray
  //     )
  //   );
  // }, [lastRain]);

  return (
    <div className="grid ">
      <div className="flex gap-3 place-items-center h-full ">
        {weatherArray.map((data) => (
          <WeeklyViewItem
            key={data.date}
            weather={data}
            lastWater={lastWatering}
            waterRequirements={waterRequirements}
            weatherArray={weatherArray}
          />
        ))}
      </div>
    </div>
  );
}

// function getNextWatering_Temperature(
//   lastWatering: Date,
//   lastRain: Date,
//   waterRequirements: WateringRequirements,
//   weatherArray: WeatherDay[]
// ) {

//   let daysUntilWatering = 0;

//   const tempNextDay = weatherArray[indexLastWatering + 1].day.avgtemp_c;

//   const tempRules = {
//     cold: {
//       1: 5,
//       2: 4,
//       3: 3,
//     },
//     medium: {
//       1: 3,
//       2: 2,
//       3: 2,
//     },
//     hot: {
//       1: 2,
//       2: 1,
//       3: 1,
//     },
//   };

//   if (tempNextDay < 20) {
//     daysUntilWatering = tempRules["cold"][waterRequirements];
//   } else if (tempNextDay >= 20 && tempNextDay < 30) {
//     daysUntilWatering = tempRules["medium"][waterRequirements];
//   } else {
//     daysUntilWatering = tempRules["hot"][waterRequirements];
//   }

//   return daysUntilWatering;
// }
