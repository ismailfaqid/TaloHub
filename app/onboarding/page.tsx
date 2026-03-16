"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const topics = [
    { id: "tech", name: "Technology", image: "/placeholder-tech.jpg" },
    { id: "health", name: "Health", image: "/placeholder-health.jpg" },
    { id: "business", name: "Business", image: "/placeholder-business.jpg" },
    { id: "education", name: "Education", image: "/placeholder-edu.jpg" },
    { id: "law", name: "Law", image: "/placeholder-law.jpg" },
    { id: "culture", name: "Culture", image: "/placeholder-culture.jpg" },
    { id: "science", name: "Science", image: "/placeholder-science.jpg" },
    { id: "heritage", name: "Heritage", image: "/placeholder-heritage.jpg" },
];

export default function OnboardingPage() {
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

    const toggleTopic = (id: string) => {
        setSelectedTopics((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
        );
    };

    return (
        <div className="flex min-h-screen flex-col items-center py-12 px-4 max-w-5xl mx-auto">
            <div className="w-full flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-primary rounded-lg"></div>
                    <span className="font-bold text-xl">TaloHub</span>
                </div>
                <div className="text-sm text-muted-foreground">
                    Step 2 of 4 <span className="ml-2 inline-block w-24 h-2 bg-muted rounded-full overflow-hidden align-middle"><span className="block h-full w-1/2 bg-primary"></span></span>
                </div>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4">What are you interested in?</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Select at least 3 topics so we can set up your recommendations and TaloHub feed.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-12">
                {topics.map((topic) => {
                    const isSelected = selectedTopics.includes(topic.id);
                    return (
                        <div
                            key={topic.id}
                            onClick={() => toggleTopic(topic.id)}
                            className={cn(
                                "group relative aspect-video sm:aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all border-2",
                                isSelected ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-primary/50"
                            )}
                        >
                            <div className={cn("absolute inset-0 bg-black/40 transition-colors", isSelected ? "bg-black/60" : "group-hover:bg-black/50")} />
                            {/* Fallback pattern for images since we don't have real ones yet */}
                            <div className="absolute inset-0 bg-muted -z-10 flex items-center justify-center text-muted-foreground opacity-20 text-4xl font-bold uppercase tracking-widest">
                                {topic.id.substring(0, 2)}
                            </div>

                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <h3 className="text-white font-bold text-xl">{topic.name}</h3>
                                <p className="text-white/80 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Follow for updates
                                </p>
                            </div>

                            {isSelected && (
                                <div className="absolute top-4 right-4 bg-primary text-white h-6 w-6 rounded-full flex items-center justify-center shadow-lg">
                                    <Check className="h-4 w-4" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-between w-full max-w-4xl border-t pt-8">
                <Button variant="ghost" className="gap-2">
                    Go back
                </Button>
                <div className="flex items-center gap-4">
                    <span className="text-muted-foreground text-sm">Skip</span>
                    <Button className="min-w-[120px] gap-2">
                        Continue
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </Button>
                </div>
            </div>
        </div>
    );
}

