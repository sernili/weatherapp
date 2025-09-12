import React from "react";
import { WeatherDay } from "@/types/weather";
import { WateringArray } from "@/types/watering";
import { isToday } from "date-fns";

export default function WeeklyViewItem({
  weather,
  watering,
}: {
  weather: WeatherDay;
  watering: WateringArray;
}) {
  const currDate = new Date(weather.date);
  const currDateName = currDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  currDate.setHours(0, 0, 0, 0);

  const isPast = currDate < todayDate;

  // Styling
  const cssContainerBase =
    "text-white p-4 rounded-sm text-center mb-2 space-y-4 shadow-lg w-32 h-full flex flex-col justify-between items-center gap-2";

  const cssPast = "bg-weather/50";
  const cssFuture = "bg-weather/80";
  const cssToday = "bg-weather scale-110";

  const cssContainer = watering.isToday
    ? `${cssContainerBase} ${cssToday}`
    : isPast
    ? `${cssContainerBase} ${cssPast}`
    : `${cssContainerBase} ${cssFuture}`;

  // Status Colors
  const cssColorsBase = "p-4 rounded-full";
  const cssWater = isPast ? "bg-water/50" : "bg-water";
  const cssWarn = isPast ? "bg-warning/50" : "bg-warning";
  const cssTemp = isPast ? "bg-tertiary/50" : "bg-tertiary";

  const cssColors =
    watering.isWateringDay || watering.isRainDay
      ? `${cssColorsBase} ${cssWater}`
      : watering.isWarnDay
      ? `${cssColorsBase} ${cssWarn}`
      : `${cssColorsBase} ${cssTemp}`;

  return (
    <div className="flex flex-col">
      <div className={cssContainer}>
        <div>
          <h2 className="font-bold text-lg">
            {watering.isToday ? "TODAY" : currDateName}
          </h2>
          <p className=" mb-4">{currDate.toLocaleDateString()}</p>
          <div>
            <p className="text-3xl">{weather.day.avgtemp_c}°C</p>
            <div className="flex justify-between text-xs bg-acc">
              <p>{weather.day.mintemp_c}°C</p>
              <p>{weather.day.maxtemp_c}°C</p>
            </div>
          </div>
        </div>
        <div>
          <p>{weather.day.daily_chance_of_rain}%</p>
          <p>{weather.day.totalprecip_mm}mm</p>
        </div>

        <div className={cssColors}>
          {watering.isLastWater && <div>💦</div>}
          {watering.isRainDay && <div>🌧️</div>}
          {watering.isTempDay && <div>✅</div>}
          {watering.isWateringDay && <div>💦</div>}
          {watering.isWarnDay && <div>🚨</div>}
        </div>
      </div>
    </div>
  );
}
