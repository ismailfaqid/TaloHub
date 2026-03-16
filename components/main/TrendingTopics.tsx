"use client";

import Link from "next/link";
import { TrendingUp, MessageSquare, ArrowUpRight, HeartPulse, Briefcase, GraduationCap, Scale, Cpu, BookOpen, Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getTrendingTopics } from "@/app/actions/questions";
import { useLanguage } from "@/components/providers/LanguageProvider";

const iconMap: Record<string, any> = {
    "Health": HeartPulse,
    "Business": Briefcase,
    "Education": GraduationCap,
    "Law": Scale,
    "Tech": Cpu,
    "Religion": BookOpen,
};

export function TrendingTopics() {
    const { t: translations } = useLanguage();
    const t = translations.feed;
    const [topics, setTopics] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await getTrendingTopics();
                setTopics(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) {
        return (
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm animate-pulse">
                <div className="h-4 w-32 bg-muted rounded mb-6"></div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 bg-muted rounded-xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (topics.length === 0) return null;

    return (
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg tracking-tight">{t.trendingTopics}</h3>
            </div>
            <div className="space-y-2">
                {topics.map((topic) => (
                    <Link key={topic.name} href={`/?q=${encodeURIComponent(topic.name)}`}>
                        <div className="flex items-center justify-between group cursor-pointer p-3 -mx-2 rounded-xl hover:bg-muted/50 transition-all active:scale-[0.98]">
                            <div>
                                <p className="text-sm font-bold group-hover:text-primary transition-colors">#{topic.name}</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">{topic.count} {t.questionsCount}</p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-muted/0 group-hover:bg-primary/10 flex items-center justify-center transition-all">
                                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
