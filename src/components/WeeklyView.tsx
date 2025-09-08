import React, { useEffect } from "react";
import WeeklyViewItem from "./WeeklyViewItem";

export default function WeeklyView({ weatherData }) {
  const todayData = weatherData?.forecast?.forecastday?.slice(0, 1);
  const upComingData = weatherData?.forecast?.forecastday?.slice(1, 4);

  useEffect(() => {
    console.log("DATA", todayData);
  }, [todayData]);

  return (
    <div className="grid ">
      <div className="flex gap-3 place-items-center h-full ">
        <WeeklyViewItem
          key={todayData[0].date}
          date={todayData[0].date}
          temp_min={todayData[0].day.mintemp_c}
          temp_max={todayData[0].day.maxtemp_c}
          temp_avg={todayData[0].day.avgtemp_c}
          condition={todayData[0].day.condition}
          isToday={true}
        />

        {upComingData.map((data) => (
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
