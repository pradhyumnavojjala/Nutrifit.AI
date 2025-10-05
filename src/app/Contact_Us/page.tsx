"use client";

import { useUser } from "@clerk/nextjs";
import ProfileHeader from "@/Components/ProfileHeader";
import CornerElements from "@/Components/CornerElements";
import { Mail, Phone, Zap, FileText, Users, ArrowRight } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion"; // Assuming this is available

// --- Static FAQ Data ---
const faqData = [
  {
    question: "How do I update my personal details?",
    answer: "Your name and email are managed through Clerk. You can update these details by clicking on your profile icon in the navigation bar and selecting 'Manage Account'."
  },
  {
    question: "Why is my plan not appearing?",
    answer: "This usually means the plan was not successfully saved or your user ID is not correctly linked. Ensure you are logged in and try creating a new plan. If the issue persists, contact technical support."
  },
  {
    question: "Can I have more than one active plan?",
    answer: "No. Only one plan can be set to 'Active' at a time. Activating a new plan automatically deactivates any existing one."
  },
];

const resourceItems = [
    { 
        icon: FileText, 
        title: "Official Documentation", 
        detail: "Reference guides for all features and technical requirements.", 
        link: "#", // Placeholder link
        linkText: "View Docs"
    },
    { 
        icon: Users, 
        title: "Community Forum", 
        detail: "Connect with other users for tips, motivation, and common questions.", 
        link: "#", // Placeholder link
        linkText: "Join Community"
    },
];

const ContactsPage = () => {
  const { user } = useUser();

  const contactItems = [
    {
      icon: Mail,
      title: "Email Support",
      detail: "support@nutrifit.dev",
      action: "mailto:support@nutrifit.dev",
    },
    {
      icon: Phone,
      title: "Hotline (Mon-Fri, 9am-5pm)",
      detail: "+1 (555) 555-NUTRI",
      action: "tel:+155555568874",
    },
  ];

  return (
    <section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4">
      <ProfileHeader user={user} />

      <div className="relative backdrop-blur-sm border border-border rounded-lg p-6 space-y-10">
        <CornerElements />

        {/* --- MAIN HEADER --- */}
        <div className="flex items-center gap-4 border-b border-border/50 pb-4">
          <Zap className="size-8 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">
            <span className="text-primary">Contact</span> & Support Center
          </h2>
        </div>

        {/* =======================
           1. DIRECT CONTACTS 
           ======================= */}
        <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-border pb-2">Direct Contact Channels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactItems.map((item, index) => (
                    <div
                        key={index}
                        className="border border-border p-5 rounded-lg shadow-lg space-y-3"
                    >
                        <item.icon className="size-6 text-primary mb-2" />
                        <h4 className="text-lg font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground font-mono">{item.detail}</p>
                        <Button asChild variant="outline" className="mt-2 w-full">
                            <a href={item.action}>
                                {item.title.includes("Email") ? "Send Email" : "Call Now"}
                            </a>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
        
        {/* =======================
           2. FAQ ACCORDION 
           ======================= */}
        <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-border pb-2">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full border border-border/50 rounded-lg p-4 bg-background/50">
                {faqData.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="font-semibold text-left text-foreground hover:text-primary transition-colors">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pt-2 pl-4 border-l-2 border-primary/50">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>

        {/* =======================
           3. RESOURCES 
           ======================= */}
        <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-border pb-2">Additional Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resourceItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border border-dashed border-border rounded-lg">
                        <div className="flex items-center gap-3">
                            <item.icon className="size-5 text-primary" />
                            <div>
                                <h4 className="font-semibold">{item.title}</h4>
                                <p className="text-xs text-muted-foreground">{item.detail}</p>
                            </div>
                        </div>
                        <Button asChild variant="ghost" className="text-primary hover:bg-primary/10">
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                {item.linkText} <ArrowRight className="size-4 ml-1" />
                            </a>
                        </Button>
                    </div>
                ))}
            </div>
        </div>

        {/* --- FOOTER MESSAGE --- */}
        <div className="pt-4 border-t border-dashed border-border/50 text-center text-sm text-muted-foreground">
          Reference your system log (console) for your session ID when reporting technical issues.
        </div>
      </div>
    </section>
  );
};

export default ContactsPage;