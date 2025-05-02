import IMAGES from "../Assets/Images";

export type DateDataType = {
  id: number;
  day: string;
};

export const DateData: DateDataType[] = [
  {
    id: 1,
    day: "1",
  },
  {
    id: 2,
    day: "2",
  },
  {
    id: 3,
    day: "3",
  },
  {
    id: 4,
    day: "4",
  },
  {
    id: 5,
    day: "5",
  },
  {
    id: 6,
    day: "6",
  },
  {
    id: 7,
    day: "7",
  },
];

export type FoodDataType = {
  id: number;
  IMG: any;
  title: string;
  kcal: string;
  completed: string;
  name: string;
};

export const foodData: FoodDataType[] = [
  {
    id: 1,
    IMG: IMAGES.breakFastImg,
    title: "Breakfast for Intermittent Fasting",
    kcal: "311",
    completed: "completed",
    name: "BREAKFAST",
  },
  {
    id: 2,
    IMG: IMAGES.snackImg,
    title: "Lunch for Intermittent Fasting",
    kcal: "311",
    completed: "pending",
    name: "SNACK",
  },
  {
    id: 3,
    IMG: IMAGES.dinnerImg,
    title: "Dinner for Intermittent Fasting",
    kcal: "311",
    completed: "pending",
    name: "DINNER",
  },
];

export type TipsDataType = {
  id: number;
  IMG: any;
  title: string;
  shortDescription: string;
  date: string;
};

export const TipsData: TipsDataType[] = [
  {
    id: 1,
    IMG: IMAGES.benefitImg,
    title: "Benfits of fasting for health",
    shortDescription:
      "Fasting boosts health in many ways,From weight loss to brighter days!",
    date: "23 March",
  },
  {
    id: 2,
    IMG: IMAGES.fastingImg,
    title: "The Advantages of Fasting",
    shortDescription:
      "Fasting boosts health in many ways,From weight loss to brighter days!",
    date: "23 March",
  },
  {
    id: 3,
    IMG: IMAGES.exploringImg,
    title: "Exploring the Benefits of Fasting",
    shortDescription:
      "Fasting boosts health in many ways,From weight loss to brighter days!",
    date: "23 March",
  },
];
