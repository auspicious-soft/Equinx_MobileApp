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
            hasIcon: true,
          },
          {
            text: "Weight loss",
            value: 2,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5b1",
            },
            hasIcon: true,
          },
          {
            text: "Feeling more energetic",
            value: 3,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5b2",
            },
            hasIcon: true,
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
            hasIcon: true,
          },
          {
            text: "Intermediate",
            value: 5,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5b5",
            },
            hasIcon: true,
          },
          {
            text: "Advanced",
            value: 6,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5b6",
            },
            hasIcon: true,
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
            hasIcon: true,
          },
          {
            text: "Low energy",
            value: 8,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5b9",
            },
            hasIcon: true,
          },
          {
            text: "Lack of motivation",
            value: 9,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5ba",
            },
            hasIcon: true,
          },
          {
            text: "Fitting in with social events",
            value: 10,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5bb",
            },
            hasIcon: true,
          },
          {
            text: "Sleep issues",
            value: 11,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5bc",
            },
            hasIcon: true,
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
            hasIcon: false,
          },
          {
            text: "dob",
            value: 13,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5bf",
            },
            hasIcon: false,
          },
          {
            text: "age",
            value: 14,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5c0",
            },
            hasIcon: false,
          },
          {
            text: "height",
            value: 15,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5c1",
            },
            hasIcon: false,
          },
          {
            text: "weight",
            value: 16,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5c2",
            },
            hasIcon: false,
          },
          {
            text: "bmi",
            value: 17,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5c3",
            },
            hasIcon: false,
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
      // {
      //   _id: {
      //     $oid: "67f90bb08b68fd5c142ff5c4",
      //   },
      //   text: "What should we focus on together? (Multi-select)",
      //   subtitle:
      //     "Exploring the key areas where our teamwork can make the biggest impact.",
      //   type: "multiSelect",
      //   next: "info2",
      //   options: [
      //     {
      //       text: "Strong immune system",
      //       value: 18,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff5c5",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "Better digestion",
      //       value: 19,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff5c6",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "Boosting energy",
      //       value: 20,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff5c7",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "Challenging myself",
      //       value: 21,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff5c8",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "Improving sleep quality ",
      //       value: 22,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff5c9",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "Mental clarity",
      //       value: 23,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff5ca",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "Reducing stress and tension ",
      //       value: 24,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff5cb",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "Increasing self-confidence ",
      //       value: 25,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff5cc",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "Longer and healthier life",
      //       value: 26,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff5cd",
      //       },
      //       hasIcon: false,
      //     },
      //   ],
      //   order: 5,
      //   __v: 0,
      //   createdAt: {
      //     $date: "2025-04-11T12:31:44.904Z",
      //   },
      //   updatedAt: {
      //     $date: "2025-04-11T12:31:44.904Z",
      //   },
      // },
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
            hasIcon: false,
          },
          {
            text: "5:2 (5 days normal, 2 days low calorie) ",
            value: 28,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5d0",
            },
            hasIcon: false,
          },
          {
            text: "OMAD (One Meal a Day) ",
            value: 29,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5d1",
            },
            hasIcon: false,
          },
          {
            text: "I haven’t decided yet",
            value: 30,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5d2",
            },
            hasIcon: false,
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
            hasIcon: false,
          },
          {
            text: "3-4 days ",
            value: 32,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5d5",
            },
            hasIcon: false,
          },
          {
            text: "5-6 days ",
            value: 33,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5d6",
            },
            hasIcon: false,
          },
          {
            text: "Every day ",
            value: 34,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5d7",
            },
            hasIcon: false,
          },
          {
            text: "I’m not sure yet",
            value: 35,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5d8",
            },
            hasIcon: false,
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
            hasIcon: false,
          },
          {
            text: "2",
            value: 37,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5db",
            },
            hasIcon: false,
          },
          {
            text: "3",
            value: 38,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5dc",
            },
            hasIcon: false,
          },
          {
            text: "More Than 3",
            value: 39,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5dd",
            },
            hasIcon: false,
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
        text: "What time do you usually have your meals?",
        subtitle:
          "Knowing when you eat your first and last meals helps analyze your eating habits and daily nutrition patterns.",
        type: "mealTimes",
        next: "info4",
        options: [
          {
            text: "First Meal Time",
            value: 40,
            key: "time1",
            _id: {
              $oid: "67f90bb08b68fd5c142ff5df",
            },
            hasIcon: false,
          },
          {
            text: "Last Meal Time",
            value: 41,
            key: "time2",
            _id: {
              $oid: "67f90bb08b68fd5c142ff5e1",
            },
            hasIcon: false,
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
      // {
      //   _id: {
      //     $oid: "67f90bb08b68fd5c142ff5e2",
      //   },
      //   text: "Do you track the nutritional value of your meals?",
      //   subtitle:
      //     "Your meals can reveal patterns in your eating habits and guide you in making healthier choices throughout the day.",
      //   type: "mcq",
      //   next: "info4",
      //   options: [
      //     {
      //       text: "Regularly",
      //       value: 42,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff5e3",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "Sometimes",
      //       value: 43,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff5e4",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "Not Really",
      //       value: 44,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff5e5",
      //       },
      //       hasIcon: false,
      //     },
      //   ],
      //   order: 10,
      //   __v: 0,
      //   createdAt: {
      //     $date: "2025-04-11T12:31:44.904Z",
      //   },
      //   updatedAt: {
      //     $date: "2025-04-11T12:31:44.904Z",
      //   },
      // },
      // {
      //   _id: {
      //     $oid: "67f90bb08b68fd5c142ff5e6",
      //   },
      //   text: "Do you know what calories are?",
      //   subtitle:
      //     "Calories measure energy in food. Understanding them helps manage fasting and nutrition goals effectively",
      //   type: "mcq",
      //   next: "question",
      //   options: [
      //     {
      //       text: "Yes",
      //       value: 45,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff5e7",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "No",
      //       value: 46,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff5e8",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "A little",
      //       value: 47,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff5e9",
      //       },
      //       hasIcon: false,
      //     },
      //   ],
      //   order: 11,
      //   __v: 0,
      //   createdAt: {
      //     $date: "2025-04-11T12:31:44.904Z",
      //   },
      //   updatedAt: {
      //     $date: "2025-04-11T12:31:44.904Z",
      //   },
      // },
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
            hasIcon: false,
          },
          {
            text: "Between 1500-2000 kcal ",
            value: 49,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5ec",
            },
            hasIcon: false,
          },
          {
            text: "Between 2000-2500 kcal ",
            value: 50,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5ed",
            },
            hasIcon: false,
          },
          {
            text: "More than 2500 kcal ",
            value: 51,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5ee",
            },
            hasIcon: false,
          },
          {
            text: "I’m not sure",
            value: 52,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5ef",
            },
            hasIcon: false,
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
            hasIcon: false,
          },
          {
            text: "Pescatarian",
            value: 54,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5f2",
            },
            hasIcon: false,
          },
          {
            text: "Vegetarian",
            value: 55,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5f3",
            },
            hasIcon: false,
          },
          {
            text: "Vegan",
            value: 56,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5f4",
            },
            hasIcon: false,
          },
          {
            text: "Ketogenic",
            value: 57,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5f5",
            },
            hasIcon: false,
          },
          {
            text: "Lactose-free ",
            value: 60,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5f8",
            },
            hasIcon: false,
          },
          {
            text: "Gluten-free",
            value: 61,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5f9",
            },
            hasIcon: false,
          },
          {
            text: "Mediterranean diet",
            value: 62,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5fa",
            },
            hasIcon: false,
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
          $oid: "67f90bb08b68fd5c142ff5fb",
        },
        text: "How much water do you drink daily?",
        subtitle:
          "Proper hydration supports fasting, energy levels, and overall well-being.",
        type: "mcq",
        next: "info6",
        options: [
          {
            text: "About 2 glasses ",
            value: 63,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5fc",
            },
            hasIcon: false,
          },
          {
            text: "Between 2-6 glasses",
            value: 64,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5fd",
            },
            hasIcon: false,
          },
          {
            text: "More than 6 glasses",
            value: 65,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5fe",
            },
            hasIcon: false,
          },
          {
            text: "I mostly drink coffee and tea",
            value: 66,
            _id: {
              $oid: "67f90bb08b68fd5c142ff5ff",
            },
            hasIcon: false,
          },
        ],
        order: 14,
        __v: 0,
        createdAt: {
          $date: "2025-04-11T12:31:44.905Z",
        },
        updatedAt: {
          $date: "2025-04-11T12:31:44.905Z",
        },
      },
      // {
      //   _id: {
      //     $oid: "67f90bb08b68fd5c142ff600",
      //   },
      //   text: "How often do you exercise? ",
      //   subtitle:
      //     "Your activity level affects your fasting needs. Let’s align your plan accordingly.",
      //   type: "mcq",
      //   next: "question",
      //   options: [
      //     {
      //       text: "Never",
      //       value: 67,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff601",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "Once a week",
      //       value: 68,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff602",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "2-3 times a week",
      //       value: 69,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff603",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "Almost every day",
      //       value: 70,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff604",
      //       },
      //       hasIcon: false,
      //     },
      //   ],
      //   order: 15,
      //   __v: 0,
      //   createdAt: {
      //     $date: "2025-04-11T12:31:44.905Z",
      //   },
      //   updatedAt: {
      //     $date: "2025-04-11T12:31:44.905Z",
      //   },
      // },
      // {
      //   _id: {
      //     $oid: "67f90bb08b68fd5c142ff605",
      //   },
      //   text: "When do you usually exercise? ",
      //   subtitle:
      //     "Knowing your workout time helps us optimize fasting and energy management.",
      //   type: "mcq",
      //   next: "info6",
      //   options: [
      //     {
      //       text: "Morning",
      //       value: 71,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff606",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "Noon",
      //       value: 72,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff607",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "Evening",
      //       value: 73,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff608",
      //       },
      //       hasIcon: false,
      //     },
      //     {
      //       text: "I don’t exercise",
      //       value: 74,
      //       _id: {
      //         $oid: "67f90bb08b68fd5c142ff609",
      //       },
      //       hasIcon: false,
      //     },
      //   ],
      //   order: 16,
      //   __v: 0,
      //   createdAt: {
      //     $date: "2025-04-11T12:31:44.905Z",
      //   },
      //   updatedAt: {
      //     $date: "2025-04-11T12:31:44.905Z",
      //   },
      // },
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
