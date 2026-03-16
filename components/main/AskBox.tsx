"use client";

import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function AskBox() {
    const { t: translations } = useLanguage();
    const t = translations.feed;

    return (
        <div className="mb-6 rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <HelpCircle className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-base sm:text-lg font-semibold leading-none tracking-tight">
                            {t.askTitle}
                        </h2>
                        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-none">
                            {t.askSubtitle}
                        </p>
                    </div>
                </div>
                <Link href="/ask" className="w-full sm:w-auto mt-2 sm:mt-0">
                    <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                        {translations.ask.submit}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
