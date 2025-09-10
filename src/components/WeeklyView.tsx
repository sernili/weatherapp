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
          <WeeklyViewItem key={data.date} data={data} />
        ))}
        <WeeklyViewItem
          key={weatherTimeline.today.date}
          data={weatherTimeline.today}
        />

        {weatherTimeline.future.map((data) => (
          <WeeklyViewItem key={data.date} data={data} />
        ))}
      </div>
    </div>
  );
}
