import React, { useEffect } from "react";
import WeeklyViewItem from "./WeeklyViewItem";

export interface WeatherDataMockup {
  date: string;
  temperature: number;
  background: string;
}

export interface WeatherDataItem extends WeatherDataMockup {
  city: string;
}

export default function WeeklyView({ weatherData }) {
  // TODO: get weather data from API
  const weatherDataMockup: WeatherDataMockup[] = [
    { date: "2024-03-03", temperature: 22, background: "" },
    { date: "2024-03-04", temperature: 28, background: "" },
    { date: "2024-03-05", temperature: 25, background: "" },
    { date: "2024-02-06", temperature: 20, background: "" },
    { date: "2024-03-07", temperature: 19, background: "" },
    { date: "2024-03-08", temperature: 23, background: "" },
    { date: "2024-03-09", temperature: 24, background: "" },
  ];
  const backgroundColors = [
    "bg-blue-100",
    "bg-blue-200",
    "bg-blue-300",
    "bg-blue-400",
    "bg-blue-500",
    "bg-blue-600",
    "bg-blue-700",
  ];

  weatherDataMockup.forEach((data, index) => {
    return (data.background = backgroundColors[index]);
  });

  const city = "Dresden";

  useEffect(() => {
    console.log("DATA", weatherData);
  }, [weatherData]);

  return (
    <div className="flex gap-2 flex-col place-items-center">
      <div className="flex gap-2 place-items-center ">
        {weatherDataMockup.map((data) => (
          <WeeklyViewItem
            key={data.background}
            date={data.date}
            temperature={data.temperature}
            background={data.background}
            city={city}
          />
        ))}
      </div>
    </div>
  );
}
