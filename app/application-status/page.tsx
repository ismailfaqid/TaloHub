"use client";

import { Button } from "@/components/ui/button";
import { Check, Clock, Home } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ApplicationStatusPage() {
    const { t: translations } = useLanguage();
    const tc = translations.common;
    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12 px-4 max-w-md mx-auto">
            <div className="bg-primary/10 p-4 rounded-full mb-6">
                <div className="bg-primary h-12 w-12 rounded-full flex items-center justify-center text-white shadow-lg">
                    <Check className="h-6 w-6 stroke-[3]" />
                </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-4">
                Thank you for your application!
            </h1>
            <p className="text-center text-muted-foreground mb-10 leading-relaxed">
                The TaloHub team will review your information within <span className="font-semibold text-primary">24-48 hours</span> to verify your expertise.
            </p>

            <div className="w-full relative pl-8 border-l-2 border-border/60 space-y-12 my-4">
                {/* Step 1: Completed */}
                <div className="relative">
                    <div className="absolute -left-[41px] bg-primary/20 h-8 w-8 rounded-full flex items-center justify-center">
                        <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center text-white">
                            <Check className="h-3 w-3" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Application submitted</h3>
                        <p className="text-xs text-muted-foreground">Today</p>
                    </div>
                </div>

                {/* Step 2: Current */}
                <div className="relative">
                    <div className="absolute -left-[41px] bg-card border-2 border-primary text-primary h-8 w-8 rounded-full flex items-center justify-center z-10">
                        <Clock className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-primary">In Review</h3>
                        <p className="text-xs text-muted-foreground">Currently in progress - Verifying documents</p>
                    </div>
                </div>

                {/* Step 3: Pending */}
                <div className="relative">
                    <div className="absolute -left-[39px] bg-muted h-6 w-6 rounded-full border-4 border-background"></div>
                    <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Final Verification</h3>
                        <p className="text-xs text-muted-foreground font-light text-muted-foreground/60">Waiting...</p>
                    </div>
                </div>
            </div>

            <Link href="/" className="w-full mt-12">
                <Button size="lg" className="w-full gap-2 bg-primary hover:bg-primary/90">
                    <Home className="h-4 w-4" />
                    {tc.backToHome}
                </Button>
            </Link>

            <p className="mt-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">
                Or browse open questions
            </p>
        </div>
    );
}
