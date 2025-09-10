import React, { useEffect } from "react";
import WeeklyViewItem from "./WeeklyViewItem";
import { WeatherTimeline } from "@/types/weather";

export default function WeeklyView({
  weatherTimeline,
}: {
  weatherTimeline: WeatherTimeline;
}) {
  useEffect(() => {
    console.log("DATA", weatherTimeline);
  }, [weatherTimeline]);

  return (
    <div className="grid ">
      <div className="flex gap-3 place-items-center h-full ">
        {weatherTimeline.past.map((data) => (
          <WeeklyViewItem
            key={data.date}
            date={data.date}
            temp_min={data.day.mintemp_c}
            temp_max={data.day.maxtemp_c}
            temp_avg={data.day.avgtemp_c}
            condition={data.day.condition}
            isToday={false}
          />
        ))}
        <WeeklyViewItem
          key={weatherTimeline.today.date}
          date={weatherTimeline.today.date}
          temp_min={weatherTimeline.today.day.mintemp_c}
          temp_max={weatherTimeline.today.day.maxtemp_c}
          temp_avg={weatherTimeline.today.day.avgtemp_c}
          condition={weatherTimeline.today.day.condition}
          isToday={true}
        />

        {weatherTimeline.future.map((data) => (
          <WeeklyViewItem
            key={data.date}
            date={data.date}
            temp_min={data.day.mintemp_c}
            temp_max={data.day.maxtemp_c}
            temp_avg={data.day.avgtemp_c}
            condition={data.day.condition}
            isToday={false}
          />
        ))}
      </div>
    </div>
  );
}
