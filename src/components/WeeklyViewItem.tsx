import React from "react";
import { WeatherDataItem } from "../weekly-view/WeeklyView";

export default function WeeklyViewItem({
  date,
  temp_min,
  temp_max,
  temp_avg,
  condition,
  isToday,
}: WeatherDataItem) {
  const dayDate = new Date(date);
  const dayName = dayDate.toLocaleDateString("en-US", { weekday: "long" });
  const cssContainerBase =
    "text-white p-4 rounded-xl text-center space-y-4 shadow-lg w-32 h-full flex flex-col justify-between items-center  gap-4";
  const cssNotToday = "bg-secondary";
  const cssToday = "scale-110 bg-accent";

  const cssContainer = isToday
    ? `${cssContainerBase} ${cssToday}`
    : `${cssContainerBase} ${cssNotToday}`;

  return (
    <div className={cssContainer}>
      <div className="">
        <h2 className="font-bold mb-4">{dayName}</h2>
        <div>
          <p className="text-3xl">{temp_avg}°C</p>
          <div className="flex justify-between text-xs">
            <p>{temp_min}°C</p>
            <p>{temp_max}°C</p>
          </div>
        </div>
      </div>
      <p>{condition.text}</p>
    </div>
  );
}
