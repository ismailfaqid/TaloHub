"use client";

import { ListFilter } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function FilterBar() {
    const { t: translations } = useLanguage();
    const t = translations.feed;

    return (
        <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold">{t.latest}</h2>
            <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                    <ListFilter className="h-4 w-4" />
                    <span className="hidden sm:inline">{t.filter}</span>
                </button>
            </div>
        </div>
    );
}
