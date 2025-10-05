"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

// Import all necessary icons for the new custom fields
import { AppleIcon, CalendarIcon, DumbbellIcon, Settings, User, Rss, Ruler, Weight, Hand, Info, Code, Mail } from "lucide-react"; 
import ProfileHeader from "@/Components/ProfileHeader";
import CornerElements from "@/Components/CornerElements";
import { Button } from "@/Components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import NoFitnessPlan from "@/Components/NoFitnessPlan";


const ProfilePage = () => {
  const { user } = useUser();
 
  const userId = user?.id as string;

  // Function to safely format DOB
  const formatDOB = (dob: string | undefined): string => {
    if (!dob) return 'N/A';
    // DOB is stored as YYYY-MM-DD string, so we display it as a local date string
    try {
      return new Date(dob).toLocaleDateString();
    } catch {
      return dob;
    }
  };

  const allPlans = useQuery(api.plans.getUserPlans, { userId });
  const [selectedPlanId, setSelectedPlanId] = useState<null | string>(null);

  const activePlan = allPlans?.find((plan) => plan.isActive);

  const currentPlan = selectedPlanId
    ? allPlans?.find((plan) => plan._id === selectedPlanId)
    : activePlan;

  // 🛑 NEW: Safely extract custom metadata 🛑
  const metadata = user?.unsafeMetadata || {};
  const dob = metadata.dateOfBirth as string || 'N/A';
  const codeName = metadata.codeName as string || 'N/A';
  const age = metadata.age as string || 'N/A';
  const height = metadata.height as string || 'N/A';
  const weight = metadata.weight as string || 'N/A';
  const disability = metadata.disability as string || 'N/A';
  const description = metadata.description as string || 'No description provided.';


  return (
    <section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4">
      <ProfileHeader user={user} />

      {/* --- UPDATED USER STATS OVERVIEW WITH EDIT OPTION --- */}
      <div className="relative backdrop-blur-sm border border-border rounded-lg p-6 mb-8 mt-4">
        <CornerElements />
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border/50 pb-4">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold tracking-tight">
                        Welcome, <span className="text-primary">{user?.firstName || user?.username || 'User'}</span>!
                    </h3>
                    <p className="text-sm text-muted-foreground font-mono">
                        System ID: <span className="text-xs text-primary/70">{user?.id}</span>
                    </p>
                </div>
                
                {/* 🛑 THE EDIT OPTION (Manage Account) 🛑 */}
                <Button 
                    asChild 
                    variant="default" 
                    className="mt-4 md:mt-0"
                >
                    {/* Link to custom user profile path */}
                    <a href="/user" className="flex items-center gap-2"> 
                        <Settings className="size-4" />
                        Manage Account
                    </a>
                </Button>
                {/* 🛑 END EDIT OPTION 🛑 */}

            </div>
            
            <h4 className="text-lg font-bold tracking-tight border-b border-border/50 pb-2 flex items-center gap-2">
                <User className="size-5 text-primary"/> Personal & Physical Stats
            </h4>

            {/* --- DETAILED INFO GRID (2 columns) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm font-mono">
                
                {/* Row 1: Names */}
                <div className="flex items-center gap-2">
                    <User className="size-4 text-primary/70"/>
                    <span className="text-muted-foreground">Name:</span>
                    <span className="text-foreground font-bold">
                        {user?.firstName || 'N/A'} {user?.lastName || ''}
                    </span>
                </div>
                
                <div className="flex items-center gap-2">
                    <Code className="size-4 text-primary/70"/>
                    <span className="text-muted-foreground">Code Name:</span>
                    <span className="text-primary font-bold">{codeName}</span>
                </div>
                
                {/* Row 2: Contact/DOB */}
                <div className="flex items-center gap-2">
                    <Mail className="size-4 text-primary/70"/>
                    <span className="text-muted-foreground">Email:</span>
                    <span className="text-primary break-all">{user?.emailAddresses?.[0]?.emailAddress || 'N/A'}</span>
                </div>

                <div className="flex items-center gap-2">
                    <CalendarIcon className="size-4 text-primary/70"/>
                    <span className="text-muted-foreground">DOB:</span>
                    <span className="text-foreground">{formatDOB(dob)}</span>
                </div>
                
                {/* Row 3: Physical Stats */}
                <div className="flex items-center gap-2">
                    <Rss className="size-4 text-primary/70"/>
                    <span className="text-muted-foreground">Age:</span>
                    <span className="text-foreground">{age}</span>
                </div>
                
                <div className="flex items-center gap-2">
                    <Ruler className="size-4 text-primary/70"/>
                    <span className="text-muted-foreground">Height:</span>
                    <span className="text-foreground">{height} cm</span>
                </div>
                
                <div className="flex items-center gap-2">
                    <Weight className="size-4 text-primary/70"/>
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="text-foreground">{weight} kg</span>
                </div>

                <div className="flex items-center gap-2">
                    <Hand className="size-4 text-primary/70"/>
                    <span className="text-muted-foreground">Disability:</span>
                    <span className="text-foreground">{disability}</span>
                </div>
                
                {/* Row 4: Description (full width) */}
                <div className="md:col-span-2 pt-2 border-t border-border/50">
                    <div className="flex items-start gap-2">
                        <Info className="size-4 text-primary/70 mt-1"/>
                        <span className="text-muted-foreground">About Me:</span>
                    </div>
                    <p className="text-foreground mt-1 ml-6 text-sm whitespace-pre-wrap">{description}</p>
                </div>

            </div>
            {/* --- END DETAILED INFO GRID --- */}
        </div>
      </div>
      {/* --- END UPDATED USER STATS OVERVIEW --- */}

      {allPlans && allPlans?.length > 0 ? (
        <div className="space-y-8">
          {/* PLAN SELECTOR (unchanged) */}
          <div className="relative backdrop-blur-sm border border-border p-6">
            <CornerElements />
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold tracking-tight">
                <span className="text-primary">Your</span>{" "}
                <span className="text-foreground">Fitness Plans</span>
              </h2>
              <div className="font-mono text-xs text-muted-foreground">
                TOTAL: {allPlans.length}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {allPlans.map((plan) => (
                <Button
                  key={plan._id}
                  onClick={() => setSelectedPlanId(plan._id)}
                  className={`text-foreground border hover:text-white ${
                    selectedPlanId === plan._id
                      ? "bg-primary/20 text-primary border-primary"
                      : "bg-transparent border-border hover:border-primary/50"
                  }`}
                >
                  {plan.name}
                  {plan.isActive && (
                    <span className="ml-2 bg-green-500/20 text-green-500 text-xs px-2 py-0.5 rounded">
                      ACTIVE
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* PLAN DETAILS (unchanged) */}

          {currentPlan && (
            <div className="relative backdrop-blur-sm border border-border rounded-lg p-6">
              <CornerElements />

              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <h3 className="text-lg font-bold">
                  PLAN: <span className="text-primary">{currentPlan.name}</span>
                </h3>
              </div>

              <Tabs defaultValue="workout" className="w-full">
                <TabsList className="mb-6 w-full grid grid-cols-2 bg-cyber-terminal-bg border">
                  <TabsTrigger
                    value="workout"
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                  >
                    <DumbbellIcon className="mr-2 size-4" />
                    Workout Plan
                  </TabsTrigger>

                  <TabsTrigger
                    value="diet"
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                  >
                    <AppleIcon className="mr-2 h-4 w-4" />
                    Diet Plan
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="workout">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      <span className="font-mono text-sm text-muted-foreground">
                        SCHEDULE: {currentPlan.workoutPlan.schedule.join(", ")}
                      </span>
                    </div>

                    <Accordion type="multiple" className="space-y-4">
                      {currentPlan.workoutPlan.exercises.map((exerciseDay, index) => (
                        <AccordionItem
                          key={index}
                          value={exerciseDay.day}
                          className="border rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-primary/10 font-mono">
                            <div className="flex justify-between w-full items-center">
                              <span className="text-primary">{exerciseDay.day}</span>
                              <div className="text-xs text-muted-foreground">
                                {exerciseDay.routines.length} EXERCISES
                              </div>
                            </div>
                          </AccordionTrigger>

                          <AccordionContent className="pb-4 px-4">
                            <div className="space-y-3 mt-2">
                              {currentPlan.workoutPlan.exercises[index]?.routines.map((routine, routineIndex) => (
                                <div
                                  key={routineIndex}
                                  className="border border-border rounded p-3 bg-background/50"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-foreground">
                                      {routine.name}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                      <div className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-mono">
                                        {routine.sets} SETS
                                      </div>
                                      <div className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs font-mono">
                                        {routine.reps} REPS
                                      </div>
                                    </div>
                                  </div>
                                  {routine.description && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {routine.description}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>

                <TabsContent value="diet">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-sm text-muted-foreground">
                        DAILY CALORIE TARGET
                      </span>
                      <div className="font-mono text-xl text-primary">
                        {currentPlan.dietPlan.dailyCalories} KCAL
                      </div>
                    </div>

                    <div className="h-px w-full bg-border my-4"></div>

                    <div className="space-y-4">
                      {currentPlan.dietPlan.meals.map((meal, index) => (
                        <div
                          key={index}
                          className="border border-border rounded-lg overflow-hidden p-4"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <h4 className="font-mono text-primary">{meal.name}</h4>
                          </div>
                          <ul className="space-y-2">
                            {meal.foods.map((food, foodIndex) => (
                              <li
                                key={foodIndex}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                              >
                                <span className="text-xs text-primary font-mono">
                                  {String(foodIndex + 1).padStart(2, "0")}
                                </span>
                                {food}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      ) : (
        <NoFitnessPlan />
      )}
    </section>
  );
};
export default ProfilePage;