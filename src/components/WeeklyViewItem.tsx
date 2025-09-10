import React from "react";
import { WeatherDay } from "@/types/weather";

export default function WeeklyViewItem({ data }: { data: WeatherDay }) {
  const dayDate = new Date(data.date);
  const dayName = dayDate.toLocaleDateString("en-US", { weekday: "long" });
  const cssContainerBase =
    "text-white p-4 rounded-xl text-center space-y-4 shadow-lg w-32 h-full flex flex-col justify-between items-center  gap-4";
  const cssNotToday = "bg-secondary";
  const cssToday = "scale-110 bg-accent";

  const isToday = dayDate.toDateString() === new Date().toDateString();

  const cssContainer = isToday
    ? `${cssContainerBase} ${cssToday}`
    : `${cssContainerBase} ${cssNotToday}`;

  return (
    <div className={cssContainer}>
      <div className="">
        <h2 className="font-bold mb-4">{dayName}</h2>
        <div>
          <p className="text-3xl">{data.day.avgtemp_c}°C</p>
          <div className="flex justify-between text-xs">
            <p>{data.day.mintemp_c}°C</p>
            <p>{data.day.maxtemp_c}°C</p>
          </div>
        </div>
      </div>
      <p>{data.day.daily_chance_of_rain}%</p>
    </div>
  );
}
