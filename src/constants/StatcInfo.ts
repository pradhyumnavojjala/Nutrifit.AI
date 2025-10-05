// src/constants/staticInfo.ts

import { AppleIcon, DumbbellIcon, Zap, Droplet } from "lucide-react";


// --- Nutrition Information: Expanded Categories ---
export const NutritionGuide = [
  {
    category: "Proteins",
    icon: DumbbellIcon,
    description: "The building blocks for muscle, tissue repair, and enzyme production. Crucial for satiety.",
    examples: ["Lean Meats (Chicken, Turkey), Fish (Tuna, Salmon), Eggs, Tofu/Tempeh, Cottage Cheese, Lentils."],
    key_tip: "Target 0.8 to 1.0 grams of protein per pound of body weight for muscle gain."
  },
  {
    category: "Complex Carbohydrates",
    icon: Zap,
    description: "Provide slow-releasing energy, stabilize blood sugar, and are rich in fiber.",
    examples: ["Oats, Brown Rice, Quinoa, Sweet Potatoes, Whole Grain Bread, Beans, Barley."],
    key_tip: "Consume complex carbs before workouts for sustained energy."
  },
  {
    category: "Healthy Fats",
    icon: AppleIcon,
    description: "Essential for hormone balance (testosterone), brain function, and absorption of fat-soluble vitamins (A, D, E, K).",
    examples: ["Avocado, Olive Oil, Nuts (Almonds, Walnuts), Seeds (Chia, Flax), Fatty Fish (Salmon)."],
    key_tip: "Fats should make up 20-30% of your total daily caloric intake."
  },
  {
    category: "Fiber & Greens",
    icon: Droplet,
    description: "Supports digestive health, helps control appetite, and provides vital micronutrients.",
    examples: ["Spinach, Kale, Broccoli, Asparagus, Berries, Apples (with skin), Legumes."],
    key_tip: "Aim for 25-35 grams of total fiber daily from diverse sources."
  },
  {
    category: "Hydration",
    icon: Droplet,
    description: "Critical for joint lubrication, nutrient transport, and regulating body temperature during exercise.",
    examples: ["Water (plain/infused), Electrolyte drinks (sugar-free), Herbal teas."],
    key_tip: "Drink 8-10 glasses (2-2.5 liters) of water daily, increasing intake during workouts."
  },
];

// --- Calorie Calculation & Basics ---
export const CalorieBasics = [
    {
        term: "TDEE (Total Daily Energy Expenditure)",
        definition: "The total number of calories your body burns in a day, including physical activity, digestion, and basic bodily functions (BMR).",
    },
    {
        term: "Caloric Surplus",
        definition: "Consuming more calories than your TDEE. Required for gaining weight (muscle and fat).",
    },
    {
        term: "Caloric Deficit",
        definition: "Consuming fewer calories than your TDEE. Required for losing weight (fat and muscle).",
    },
    {
        term: "Macro Split",
        definition: "The percentage breakdown of your total daily calories into Protein, Carbohydrates, and Fats.",
    },
];


// --- Common Workout Equipment Guide: Expanded ---
export const EquipmentGuide = [
  {
    item: "Dumbbells (Adjustable)",
    purpose: "Resistance for compound movements (squats, presses) and isolation exercises (curls, flys).",
    notes: "Ideal for home gyms as they save space and cover a wide range of weights.",
  },
  {
    item: "Kettlebells",
    purpose: "Excellent for dynamic, full-body exercises like swings, snatches, and Turkish get-ups, improving power and endurance.",
    notes: "Requires specific technique; focus on lighter weights initially to master form.",
  },
  {
    item: "Pull-up Bar (Doorway)",
    purpose: "Essential for back and biceps strength (pull-ups and chin-ups).",
    notes: "Check doorframe compatibility and load rating before use.",
  },
  {
    item: "Resistance Bands (Loop & Tube)",
    purpose: "Versatile tool for stretching, pre-hab (injury prevention), and adding progressive resistance to bodyweight exercises.",
    notes: "Tube bands with handles are great for simulating cable exercises.",
  },
  {
    item: "Exercise Mat",
    purpose: "Provides cushioning and traction for floor-based movements (core work, yoga, stretching).",
    notes: "A thicker mat is recommended for joint comfort on hard floors.",
  },
];