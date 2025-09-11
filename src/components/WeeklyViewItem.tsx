import React from "react";
import { WeatherDay } from "@/types/weather";
import { Divide } from "lucide-react";

export default function WeeklyViewItem({
  weather,
  daysSinceLastWatering,
  nextWater_Temp,
  additionalDays_Rain,
}: {
  weather: WeatherDay;
  daysSinceLastWatering: number;
  nextWater_Temp: number;
  additionalDays_Rain: number;
}) {
  const dayDate = new Date(weather.date);
  const dayName = dayDate.toLocaleDateString("en-US", { weekday: "long" });
  const cssContainerBase =
    "text-white p-4 rounded-xl text-center mb-8 space-y-4 shadow-lg w-32 h-full flex flex-col justify-between items-center  gap-4";
  const cssNotToday = "bg-secondary";
  const cssToday = "scale-110 bg-accent";

  const isToday = dayDate.toDateString() === new Date().toDateString();
  const isLastWatering = daysSinceLastWatering === 0;

  const cssContainer = isToday
    ? `${cssContainerBase} ${cssToday}`
    : `${cssContainerBase} ${cssNotToday}`;

  const isPlusDay = weather.day.totalprecip_mm >= 5;
  const isWaterDay =
    daysSinceLastWatering == nextWater_Temp + additionalDays_Rain;
  const isTempDay =
    !isPlusDay && daysSinceLastWatering < nextWater_Temp + additionalDays_Rain;

  return (
    <div className="flex flex-col">
      <div className={cssContainer}>
        <div className="">
          <h2 className="font-bold">{dayName}</h2>
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

      {isLastWatering && <div>💦✅</div>}

      {daysSinceLastWatering > 0 && (
        <>
          <div>{daysSinceLastWatering}</div>

          {isPlusDay && <div>+</div>}
          {isTempDay && <div>TEMP</div>}
          {isWaterDay && <div>WATER</div>}
        </>
      )}
    </div>
  );
}
