export type WateringRequirements = 1 | 2 | 3; // based on soil, kinds of plants and individual wish to conserve water
export type WateringLast = Date;

export type WateringArray = {
  date: Date;
  isToday: boolean;
  isLastWater: boolean;
  isRainDay: boolean;
  isTempDay: boolean;
  isWateringDay: boolean;
};
