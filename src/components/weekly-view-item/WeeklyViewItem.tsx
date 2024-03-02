import React from "react";
import { WeatherDataItem } from "../weekly-view/WeeklyView";

export default function WeeklyViewItem({
  date,
  temperature,
  background,
  city,
}: WeatherDataItem) {
  const dayIndex = new Date(date).getDay();
  const dayNames = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  const dayOfTheWeek = dayNames[dayIndex];
  const cssContainerBase =
    "text-white p-4 rounded-xl text-center space-y-4 w-32";
  const cssContainerBackground = background;

  return (
    <div className={cssContainerBase + " " + cssContainerBackground}>
      <h2 className="font-bold">{dayOfTheWeek}</h2>
      <p className="text-3xl">{temperature} °C</p>
      <p>{city}</p>
    </div>
  );
}
