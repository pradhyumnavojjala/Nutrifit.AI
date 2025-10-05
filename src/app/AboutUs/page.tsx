// src/app/DietInfo/page.tsx

"use client";

import { useUser } from "@clerk/nextjs";
import ProfileHeader from "@/Components/ProfileHeader";
import CornerElements from "@/Components/CornerElements";
import { Zap, AppleIcon, DumbbellIcon, Calculator } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { NutritionGuide, EquipmentGuide, CalorieBasics } from "@/constants/StatcInfo";

const StaticInfoPage = () => {
  const { user } = useUser();

  return (
    <section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4">
      <ProfileHeader user={user} />
      
      <div className="relative backdrop-blur-sm border border-border rounded-lg p-6 space-y-8">
        <CornerElements />

        {/* --- PAGE HEADER --- */}
        <div className="flex items-center gap-4 border-b border-border/50 pb-4">
          <Zap className="size-8 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">
            <span className="text-primary">Fitness</span> Reference Library
          </h2>
        </div>

        {/* --- TABS --- */}
        {/* --- TABS --- */}
        <Tabs defaultValue="nutrition">
          {/* FIX: Use flex layout and center the list. Remove grid-cols-3. */}
          <TabsList className="flex w-fit mx-auto border border-border/50 rounded-lg p-1 bg-muted/50">
            <TabsTrigger value="nutrition" className="flex items-center gap-2 px-4 py-2">
              <AppleIcon className="size-4" /> Nutrition Guide
            </TabsTrigger>
            <TabsTrigger value="calories" className="flex items-center gap-2 px-4 py-2">
              <Calculator className="size-4" /> Calorie Basics
            </TabsTrigger>
            <TabsTrigger value="equipment" className="flex items-center gap-2 px-4 py-2">
              <DumbbellIcon className="size-4" /> Equipment Guide
            </TabsTrigger>
          </TabsList>

          {/* ... Tabs Content Sections follow (Nutrition, Calories, Equipment) ... */}

          {/* =======================
             NUTRITION TAB CONTENT 
             ======================= */}
          <TabsContent value="nutrition" className="space-y-6 pt-4">
            <h3 className="text-xl font-bold border-b border-border pb-2 text-primary">
              Core Nutritional Pillars
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {NutritionGuide.map((item, index) => (
                <div key={index} className="border border-border p-4 rounded-lg bg-background/50 shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon className="size-5 text-green-500" />
                    <h4 className="text-lg font-mono font-semibold text-foreground">{item.category}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <p className="text-xs font-mono text-primary/70 mb-1">Examples:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 mb-3">
                    {item.examples.map((ex, exIndex) => (
                        <li key={exIndex}>{ex}</li>
                    ))}
                  </ul>
                  <div className="text-xs font-bold text-yellow-500 border-t border-border/50 pt-2">
                      ⭐ Tip: {item.key_tip}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* =======================
             CALORIE BASICS TAB CONTENT 
             ======================= */}
          <TabsContent value="calories" className="space-y-6 pt-4">
            <h3 className="text-xl font-bold border-b border-border pb-2 text-primary">
              Calorie & Energy Fundamentals
            </h3>
            <div className="space-y-4">
                {CalorieBasics.map((item, index) => (
                    <div key={index} className="border border-border p-4 rounded-lg bg-background/50 shadow-md">
                        <h4 className="text-lg font-mono font-semibold mb-1 text-foreground">{item.term}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                            {item.definition}
                        </p>
                    </div>
                ))}
            </div>
          </TabsContent>

          {/* =======================
             EQUIPMENT TAB CONTENT 
             ======================= */}
          <TabsContent value="equipment" className="space-y-6 pt-4">
            <h3 className="text-xl font-bold border-b border-border pb-2 text-primary">
              Essential Home Workout Gear
            </h3>
            <div className="space-y-4">
                {EquipmentGuide.map((item, index) => (
                    <div key={index} className="border border-border p-4 rounded-lg bg-background/50 shadow-md">
                        <h4 className="text-lg font-mono font-semibold mb-1 text-foreground">{item.item}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                            **Purpose:** {item.purpose}
                        </p>
                        <p className="text-xs font-mono text-primary/70">
                            **Notes:** {item.notes}
                        </p>
                    </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default StaticInfoPage;