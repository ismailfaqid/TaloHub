import { Button } from "@/components/ui/button";
import { CheckCircle2, Globe, Mail } from "lucide-react";

export default function AnswerNotificationPage() {
    return (
        <div className="max-w-xl mx-auto py-12 px-4">
            <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                <div className="h-2 bg-primary w-full"></div>
                <div className="p-8 text-center bg-card">
                    <h1 className="text-2xl font-bold mb-4">Your question has been answered</h1>
                    <p className="text-muted-foreground mb-8">
                        You have a new answer from one of our verified professionals.
                    </p>

                    <div className="bg-muted/30 rounded-xl p-6 text-left mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 bg-orange-100 rounded-full"></div>
                            <div>
                                <div className="flex items-center gap-1">
                                    <h3 className="font-bold text-sm">Dr. Abdullahi Mohamed</h3>
                                    <CheckCircle2 className="h-3 w-3 text-primary fill-primary text-white" />
                                </div>
                                <p className="text-xs text-muted-foreground">General Health Specialist</p>
                            </div>
                        </div>

                        <div className="pl-4 border-l-2 border-primary/20">
                            <p className="italic text-muted-foreground">
                                &quot;In short: It is important to follow your doctor's advice regarding sleep and nutrition. The symptoms you mentioned require...&quot;
                            </p>
                        </div>
                    </div>

                    <Button className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90">
                        View Full Answer
                    </Button>
                </div>
                <div className="bg-muted/10 p-4 border-t border-border text-center text-xs text-muted-foreground">
                    You submitted this question 24 hours ago. We always strive to connect you with knowledgeable experts.
                </div>
            </div>

            <div className="mt-8 flex justify-center gap-4 text-xs font-semibold text-primary">
                <span className="cursor-pointer hover:underline">Email Preferences</span>
                <span className="text-muted-foreground">|</span>
                <span className="cursor-pointer hover:underline">Contact Us</span>
            </div>

            <div className="mt-8 text-center space-y-2">
                <p className="text-[10px] text-muted-foreground">
                    © 2026 TaloHub. All rights reserved.
                </p>
                <p className="text-[10px] text-muted-foreground">
                    Mogadishu, Somalia.
                </p>
                <div className="flex justify-center gap-4 mt-2 text-muted-foreground">
                    <Globe className="h-3 w-3" />
                    <Mail className="h-3 w-3" />
                </div>
            </div>
        </div>
    );
}

