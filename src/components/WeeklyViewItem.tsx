import React from "react";
import { WeatherDay } from "@/types/weather";
import { WateringArray } from "@/types/watering";

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
      {watering.isRainDay && <div>🌧️</div>}
      {watering.isTempDay && <div>✅</div>}
      {watering.isWateringDay && <div>💦</div>}
      {watering.isWarnDay && <div>🚨</div>}
    </div>
  );
}
