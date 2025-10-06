// src/app/user/page.tsx

"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
// Import icons for the fields
import { Save, User, Rss, Ruler, Weight, Hand, Info, Code, Loader2, Calendar } from "lucide-react"; 

// Assuming you have these components:
import ProfileHeader from "@/Components/ProfileHeader";
import CornerElements from "@/Components/CornerElements";

// 🛑 REMOVED THE CRASHING 'toast' FUNCTION CALL 🛑
// The local notification logic now uses native browser functions (alert/console.log)
// to prevent the "Function not implemented" error and allow deployment.


const CustomUserProfilePage = () => {
  const { isLoaded, user } = useUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); 
  
  const [dateOfBirth, setDateOfBirth] = useState(""); 
  
  const [codeName, setCodeName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [disability, setDisability] = useState("");
  const [description, setDescription] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // Initialize state once the user object is fully loaded
  useEffect(() => {
    if (isLoaded && user && !initialDataLoaded) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || ""); 
      
      // Safely read custom fields from unsafeMetadata, defaulting to empty string
      const metadata = user.unsafeMetadata || {};
      
      // Initialize fields from metadata 
      setDateOfBirth((metadata.dateOfBirth as string) || "");
      setCodeName((metadata.codeName as string) || "");
      setAge((metadata.age as string) || "");
      setHeight((metadata.height as string) || "");
      setWeight((metadata.weight as string) || "");
      setDisability((metadata.disability as string) || "");
      setDescription((metadata.description as string) || "");
      
      setInitialDataLoaded(true);
    }
  }, [isLoaded, user, initialDataLoaded]);

  // --- Guard/Loading Check ---
  if (!isLoaded || !user) {
    return (
      <section className="text-center pt-20 flex-grow container mx-auto px-4">
        <Loader2 className="animate-spin size-8 text-primary mx-auto" />
        <p className="mt-4 text-primary">Loading user data...</p>
      </section>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Update core fields (First Name and Last Name)
      const coreUpdates = {
        firstName: firstName,
        lastName: lastName, 
      };

      // 2. Prepare ALL metadata updates
      const metadataUpdates = {
          unsafeMetadata: {
            // NOTE: It is better to spread the existing metadata first to ensure no data is lost
            // when updating a subset of fields. The current code does this correctly:
            ...user.unsafeMetadata, 
            
            dateOfBirth: dateOfBirth, 
            codeName: codeName,
            age: age,
            height: height,
            weight: weight,
            disability: disability,
            description: description,
          },
      };

      // 3. Apply both updates
      await Promise.all([
          user.update(coreUpdates),
          user.update(metadataUpdates),
      ]);

      // 🛑 SAFE SUCCESS NOTIFICATION 🛑
      console.log("SUCCESS: Profile Updated successfully!");
      alert("Profile Updated successfully!"); // Temporary browser alert
      
    } catch (error) {
      console.error("Failed to update user profile:", error);
      
      // 🛑 SAFE FAILURE NOTIFICATION 🛑
      alert("ERROR: Could not save profile changes. Check console for details.");
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4 max-w-lg">
      <ProfileHeader user={user} />

      <div className="relative backdrop-blur-sm border border-border rounded-lg p-6 space-y-8 mt-4">
        <CornerElements />

        {/* --- HEADER --- */}
        <div className="flex items-center gap-4 border-b border-border/50 pb-4">
          <User className="size-8 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">
            <span className="text-primary">Edit</span> Profile Details
          </h2>
        </div>

        {/* --- FORM --- */}
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* NAME FIELDS GRID */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Name Input */}
            <div className="space-y-2">
              <label htmlFor="firstName" className="font-mono flex items-center gap-2 text-sm font-medium">
                <User className="size-4 text-primary/70" /> First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isLoading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
              />
            </div>
            
            {/* Last Name Input */}
            <div className="space-y-2">
              <label htmlFor="lastName" className="font-mono flex items-center gap-2 text-sm font-medium">
                <User className="size-4 text-primary/70" /> Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isLoading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
              />
            </div>
          </div>
          {/* END NAME FIELDS GRID */}

          {/* DOB Input */}
          <div className="space-y-2">
            <label htmlFor="dateOfBirth" className="font-mono flex items-center gap-2 text-sm font-medium">
              <Calendar className="size-4 text-primary/70" /> Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date" 
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              disabled={isLoading}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
            />
          </div>
          
          {/* Code Name Input */}
          <div className="space-y-2">
            <label htmlFor="codeName" className="font-mono flex items-center gap-2 text-sm font-medium">
              <Code className="size-4 text-primary/70" /> Code Name
            </label>
            <input
              id="codeName"
              type="text" 
              value={codeName}
              onChange={(e) => setCodeName(e.target.value)}
              disabled={isLoading}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
            />
          </div>
          
          {/* STATS GRID (Age, Height, Weight) */}
          <div className="grid grid-cols-3 gap-4">
            {/* Age Input */}
            <div className="space-y-2">
              <label htmlFor="age" className="font-mono flex items-center gap-2 text-sm font-medium">
                <Rss className="size-4 text-primary/70" /> Age
              </label>
              <input
                id="age"
                type="number" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                disabled={isLoading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
              />
            </div>
            
            {/* Height Input */}
            <div className="space-y-2">
              <label htmlFor="height" className="font-mono flex items-center gap-2 text-sm font-medium">
                <Ruler className="size-4 text-primary/70" /> Height (cm)
              </label>
              <input
                id="height"
                type="number" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                disabled={isLoading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
              />
            </div>

            {/* Weight Input */}
            <div className="space-y-2">
              <label htmlFor="weight" className="font-mono flex items-center gap-2 text-sm font-medium">
                <Weight className="size-4 text-primary/70" /> Weight (kg)
              </label>
              <input
                id="weight"
                type="number" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                disabled={isLoading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
              />
            </div>
          </div>
          
          {/* Physical Disability Input */}
          <div className="space-y-2">
            <label htmlFor="disability" className="font-mono flex items-center gap-2 text-sm font-medium">
              <Hand className="size-4 text-primary/70" /> Physical Disability
            </label>
            <input
              id="disability"
              type="text" 
              value={disability}
              onChange={(e) => setDisability(e.target.value)}
              disabled={isLoading}
              placeholder="e.g., None, Knee Injury, Limited Mobility"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
            />
          </div>

          {/* Description About Yourself (Textarea) */}
          <div className="space-y-2">
            <label htmlFor="description" className="font-mono flex items-center gap-2 text-sm font-medium">
              <Info className="size-4 text-primary/70" /> Description / Bio
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              placeholder="Tell us about your fitness goals and challenges..."
              className="flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
            />
          </div>


          {/* Read-Only Email/ID */}
          <div className="space-y-2 border-t border-dashed border-border/50 pt-4">
            <label className="font-mono text-muted-foreground block text-sm font-medium">
              Primary Email (Managed by Clerk):
            </label>
            <p className="font-mono text-sm text-primary break-all">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Save className="mr-2 size-4" />
            )}
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CustomUserProfilePage;