const QueastionResponse = {
  success: true,
  message: "Questions retrieved successfully",
  data: {
    questions: [
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff5af",
        },
        text: "What is your main goal with intermittent fasting?",
        subtitle: "Choose the reason that motivates you the most!",
        type: "mcq",
        next: "question",
        options: [
          {
            text: "Healthier lifestyle",
            value: 1,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5b0",
            },
          },
          {
            text: "Weight loss",
            value: 2,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5b1",
            },
          },
          {
            text: "Feeling more energetic",
            value: 3,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5b2",
            },
          },
        ],
        order: 1,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.903Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.903Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff5b3",
        },
        text: "How experienced are you with intermittent fasting?",
        subtitle: "No worries if you're new! We'll guide you at every step.",
        type: "mcq",
        next: "question",
        options: [
          {
            text: "Beginner",
            value: 4,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5b4",
            },
          },
          {
            text: "Intermediate",
            value: 5,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5b5",
            },
          },
          {
            text: "Advanced",
            value: 6,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5b6",
            },
          },
        ],
        order: 2,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff5b7",
        },
        text: "What do you find most challenging about fasting?",
        subtitle:
          "This helps us understand where you might need extra support.",
        type: "mcq",
        next: "question",
        options: [
          {
            text: "Feeling hungry",
            value: 7,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5b8",
            },
          },
          {
            text: "Low energy",
            value: 8,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5b9",
            },
          },
          {
            text: "Lack of motivation",
            value: 9,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5ba",
            },
          },
          {
            text: "Fitting in with social events",
            value: 10,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5bb",
            },
          },
          {
            text: "Sleep issues",
            value: 11,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5bc",
            },
          },
        ],
        order: 3,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff5bd",
        },
        text: "Let’s complete your profile",
        subtitle:
          "Please enter your details so we can tailor you plan perfectly to achieve your goals.",
        type: "profile",
        next: "info1",
        options: [
          {
            text: "gender",
            value: 12,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5be",
            },
          },
          {
            text: "dob",
            value: 13,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5bf",
            },
          },
          {
            text: "age",
            value: 14,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5c0",
            },
          },
          {
            text: "height",
            value: 15,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5c1",
            },
          },
          {
            text: "weight",
            value: 16,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5c2",
            },
          },
          {
            text: "bmi",
            value: 17,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5c3",
            },
          },
        ],
        order: 4,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff5c4",
        },
        text: "What should we focus on together? (Multi-select)",
        subtitle:
          "Exploring the key areas where our teamwork can make the biggest impact.",
        type: "multiSelect",
        next: "question",
        options: [
          {
            text: "Strong immune system",
            value: 18,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5c5",
            },
          },
          {
            text: "Better digestion",
            value: 19,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5c6",
            },
          },
          {
            text: "Boosting energy",
            value: 20,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5c7",
            },
          },
          {
            text: "Challenging myself",
            value: 21,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5c8",
            },
          },
          {
            text: "Improving sleep quality ",
            value: 22,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5c9",
            },
          },
          {
            text: "Mental clarity",
            value: 23,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5ca",
            },
          },
          {
            text: "Reducing stress and tension ",
            value: 24,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5cb",
            },
          },
          {
            text: "Increasing self-confidence ",
            value: 25,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5cc",
            },
          },
          {
            text: "Longer and healthier life",
            value: 26,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5cd",
            },
          },
        ],
        order: 5,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff5ce",
        },
        text: "Which intermittent fasting method do you prefer? ",
        subtitle:
          "Various intermittent fasting methods can help us choose the one that best fits our lifestyle and goals.",
        type: "mcq",
        next: "question",
        options: [
          {
            text: "16:8 (16 hours fasting, 8 hours eating window)",
            value: 27,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5cf",
            },
          },
          {
            text: "5:2 (5 days normal, 2 days low calorie) ",
            value: 28,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5d0",
            },
          },
          {
            text: "OMAD (One Meal a Day) ",
            value: 29,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5d1",
            },
          },
          {
            text: "I haven’t decided yet",
            value: 30,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5d2",
            },
          },
        ],
        order: 6,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff5d3",
        },
        text: "How many days a week do you plan to fast?  ",
        subtitle:
          "Consider how many days each week you intend to dedicate to fasting.",
        type: "mcq",
        next: "question",
        options: [
          {
            text: "1-2 days",
            value: 31,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5d4",
            },
          },
          {
            text: "3-4 days ",
            value: 32,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5d5",
            },
          },
          {
            text: "5-6 days ",
            value: 33,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5d6",
            },
          },
          {
            text: "Every day ",
            value: 34,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5d7",
            },
          },
          {
            text: "I’m not sure yet",
            value: 35,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5d8",
            },
          },
        ],
        order: 7,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff5d9",
        },
        text: "How many meals do you eat per day? ",
        subtitle:
          "Your daily meal frequency can help you make better dietary choices and maintain a balanced lifestyle.",
        type: "mcq",
        next: "info3",
        options: [
          {
            text: "1",
            value: 36,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5da",
            },
          },
          {
            text: "2",
            value: 37,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5db",
            },
          },
          {
            text: "3",
            value: 38,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5dc",
            },
          },
          {
            text: "More Than 3",
            value: 39,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5dd",
            },
          },
        ],
        order: 8,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff5de",
        },
        text: "What time do you usually have your first meal?  ",
        subtitle:
          "Your first meal can provide insight into your eating habits and help you optimize your nutrition throughout the day.",
        type: "time1",
        next: "question",
        options: [
          {
            text: "mealTime",
            value: 40,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5df",
            },
          },
        ],
        order: 9,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff5e0",
        },
        text: "What time do you usually have your last meal?  ",
        subtitle:
          "Your last meal timing helps us optimize your fasting window.",
        type: "time2",
        next: "question",
        options: [
          {
            text: "mealTime",
            value: 41,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5e1",
            },
          },
        ],
        order: 10,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff5e2",
        },
        text: "Do you track the nutritional value of your meals?",
        subtitle:
          "Your meals can reveal patterns in your eating habits and guide you in making healthier choices throughout the day.",
        type: "mcq",
        next: "info4",
        options: [
          {
            text: "Regularly",
            value: 42,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5e3",
            },
          },
          {
            text: "Sometimes",
            value: 43,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5e4",
            },
          },
          {
            text: "Not Really",
            value: 44,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5e5",
            },
          },
        ],
        order: 11,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff5e6",
        },
        text: "Do you know what calories are?",
        subtitle:
          "Calories measure energy in food. Understanding them helps manage fasting and nutrition goals effectively",
        type: "mcq",
        next: "question",
        options: [
          {
            text: "Yes",
            value: 45,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5e7",
            },
          },
          {
            text: "No",
            value: 46,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5e8",
            },
          },
          {
            text: "A little",
            value: 47,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5e9",
            },
          },
        ],
        order: 12,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff5ea",
        },
        text: "How many calories do you consume daily on average?",
        subtitle:
          "Estimating your daily intake helps us provide better fasting and meal recommendations.",
        type: "mcq",
        next: "info5",
        options: [
          {
            text: "Less than 1500 kcal",
            value: 48,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5eb",
            },
          },
          {
            text: "Between 1500-2000 kcal ",
            value: 49,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5ec",
            },
          },
          {
            text: "Between 2000-2500 kcal ",
            value: 50,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5ed",
            },
          },
          {
            text: "More than 2500 kcal ",
            value: 51,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5ee",
            },
          },
          {
            text: "I’m not sure",
            value: 52,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5ef",
            },
          },
        ],
        order: 13,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff5f0",
        },
        text: "How would you describe your eating habits? (Multi-select)",
        subtitle:
          "Estimating your daily intake helps us provide better fasting and meal recommendations.",
        type: "multiSelect",
        next: "question",
        options: [
          {
            text: "Normal",
            value: 53,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5f1",
            },
          },
          {
            text: "Pescatarian",
            value: 54,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5f2",
            },
          },
          {
            text: "Vegetarian",
            value: 55,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5f3",
            },
          },
          {
            text: "Vegan",
            value: 56,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5f4",
            },
          },
          {
            text: "Ketogenic",
            value: 57,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5f5",
            },
          },
          {
            text: "Paleo",
            value: 58,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5f6",
            },
          },
          {
            text: "Ketogenic Vegan ",
            value: 59,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5f7",
            },
          },
          {
            text: "Lactose-free ",
            value: 60,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5f8",
            },
          },
          {
            text: "Gluten-free",
            value: 61,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5f9",
            },
          },
          {
            text: "Mediterranean diet",
            value: 62,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5fa",
            },
          },
        ],
        order: 14,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.904Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff5fb",
        },
        text: "How much water do you drink daily?",
        subtitle:
          "Proper hydration supports fasting, energy levels, and overall well-being.",
        type: "mcq",
        next: "question",
        options: [
          {
            text: "About 2 glasses ",
            value: 63,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5fc",
            },
          },
          {
            text: "Between 2-6 glasses",
            value: 64,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5fd",
            },
          },
          {
            text: "More than 6 glasses",
            value: 65,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5fe",
            },
          },
          {
            text: "I mostly drink coffee and tea",
            value: 66,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5ff",
            },
          },
        ],
        order: 15,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.905Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.905Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff600",
        },
        text: "How often do you exercise? ",
        subtitle:
          "Your activity level affects your fasting needs. Let’s align your plan accordingly.",
        type: "mcq",
        next: "question",
        options: [
          {
            text: "Never",
            value: 67,
            _id: {
              $oid: "67f90bb08b68fd5c142ff601",
            },
          },
          {
            text: "Once a week",
            value: 68,
            _id: {
              $oid: "67f90bb08b68fd5c142ff602",
            },
          },
          {
            text: "2-3 times a week",
            value: 69,
            _id: {
              $oid: "67f90bb08b68fd5c142ff603",
            },
          },
          {
            text: "Almost every day",
            value: 70,
            _id: {
              $oid: "67f90bb08b68fd5c142ff604",
            },
          },
        ],
        order: 16,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.905Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.905Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff605",
        },
        text: "When do you usually exercise? ",
        subtitle:
          "Knowing your workout time helps us optimize fasting and energy management.",
        type: "mcq",
        next: "question",
        options: [
          {
            text: "Morning",
            value: 71,
            _id: {
              $oid: "67f90bb08b68fd5c142ff606",
            },
          },
          {
            text: "Noon",
            value: 72,
            _id: {
              $oid: "67f90bb08b68fd5c142ff607",
            },
          },
          {
            text: "Evening",
            value: 73,
            _id: {
              $oid: "67f90bb08b68fd5c142ff608",
            },
          },
          {
            text: "I don’t exercise",
            value: 74,
            _id: {
              $oid: "67f90bb08b68fd5c142ff609",
            },
          },
        ],
        order: 17,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.905Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.905Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff60a",
        },
        text: "How would you describe your lifestyle? ",
        subtitle:
          "Your daily routine impacts your fasting success. Let’s personalize your experience.",
        type: "mcq",
        next: "info6",
        options: [
          {
            text: "Sedentary",
            value: 75,
            _id: {
              $oid: "67f90bb08b68fd5c142ff60b",
            },
          },
          {
            text: "Somewhat active",
            value: 76,
            _id: {
              $oid: "67f90bb08b68fd5c142ff60c",
            },
          },
          {
            text: "Very active",
            value: 77,
            _id: {
              $oid: "67f90bb08b68fd5c142ff60d",
            },
          },
        ],
        order: 18,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.905Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.905Z",
        },
      },
      {
        _id: {
          $oid: "67f90bb08b68fd5c142ff60e",
        },
        text: "What is your goal weight?",
        subtitle:
          "We use this info to tailor your fasting plan and progress tracking.",
        type: "number",
        next: "planScreen",
        options: [
          {
            text: "weight",
            value: 78,
            _id: {
              $oid: "67f90bb08b68fd5c142ff60f",
            },
          },
        ],
        order: 19,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.905Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.905Z",
        },
      },
    ],

    plans: [
      {
        type: "Basic",
        months: 3,
        price: 34.99,
        priceText: "$11.66/month",
        deviceId: "unique-device-id-123",
        description: "only $34.99 for 3 months",
      },
      {
        type: "Best price",
        months: 12,
        price: 79.99,
        priceText: "$6.66/month",
        deviceId: "unique-device-id-123",
        description: "only $79.99 annually",
      },
      {
        type: "Popular",
        months: 6,
        price: 49.99,
        priceText: "$6.66/month",
        deviceId: "unique-device-id-123",
        description: "only $49.99 for 6 months",
      },
    ],
  },
};
export default QueastionResponse;
