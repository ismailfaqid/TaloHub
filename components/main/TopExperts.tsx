import { Award, CheckCircle2, MessageSquare, UserPlus, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getTopExperts } from "@/app/actions/questions";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const bgColors = [
    "bg-sky-500",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-rose-500",
    "bg-amber-500",
];

import { toggleFollow } from "@/app/actions/questions";

export function TopExperts() {
    const { t: translations } = useLanguage();
    const t = translations.feed;
    const tc = translations.common;
    const [experts, setExperts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [followLoading, setFollowLoading] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const data = await getTopExperts();
                setExperts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const handleFollow = async (expertId: string) => {
        if (followLoading) return;
        setFollowLoading(expertId);

        const prevExperts = [...experts];
        const expertIndex = experts.findIndex(e => e.id === expertId);
        if (expertIndex !== -1) {
            const updatedExperts = [...experts];
            updatedExperts[expertIndex] = {
                ...updatedExperts[expertIndex],
                isFollowing: !updatedExperts[expertIndex].isFollowing
            };
            setExperts(updatedExperts);
        }

        try {
            await toggleFollow(expertId);
        } catch (err) {
            setExperts(prevExperts);
        } finally {
            setFollowLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm animate-pulse">
                <div className="h-4 w-32 bg-muted rounded mb-6"></div>
                <div className="space-y-6">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex gap-3">
                            <div className="h-10 w-10 bg-muted rounded-full"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-3 w-24 bg-muted rounded"></div>
                                <div className="h-3 w-32 bg-muted rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
                    <Award className="h-4 w-4 text-sky-600" />
                </div>
                <h3 className="font-bold text-lg tracking-tight">{t.expertsOfTheWeek}</h3>
            </div>

            {experts.length === 0 ? (
                <div className="py-8 text-center px-4">
                    <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4 border border-dashed border-slate-200">
                        <Award className="h-6 w-6 text-slate-300" />
                    </div>
                    <p className="text-sm font-bold text-slate-600 mb-1">{t.beExpert}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        {t.beExpertDesc}
                    </p>
                    <Button variant="outline" size="sm" className="mt-4 rounded-full text-[10px] h-8">
                        {t.signupNow}
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    {experts.map((expert, index) => (
                        <div key={expert.id} className="group relative">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Link href={`/profile/${expert.id}`}>
                                        <div className={cn(
                                            "h-11 w-11 rounded-full flex items-center justify-center text-white font-black text-sm shadow-inner transition-transform group-hover:scale-105",
                                            bgColors[index % bgColors.length]
                                        )}>
                                            {expert.avatar}
                                        </div>
                                    </Link>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <Link href={`/profile/${expert.id}`} className="hover:text-primary transition-colors">
                                                <p className="text-sm font-bold leading-none">{expert.name}</p>
                                            </Link>
                                            <CheckCircle2 className="h-3.5 w-3.5 text-sky-500 fill-sky-50" />
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1.5 font-medium">{expert.role}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full font-bold">
                                                <MessageSquare className="h-2.5 w-2.5" />
                                                {expert.answers} {t.answersCount}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleFollow(expert.id)}
                                    disabled={followLoading === expert.id}
                                    className={cn(
                                        "h-8 rounded-full text-[10px] font-bold border-muted-foreground/20 transition-all active:scale-95",
                                        expert.isFollowing
                                            ? "bg-slate-100 text-slate-600 border-none hover:bg-slate-200"
                                            : "hover:bg-primary hover:text-white hover:border-primary"
                                    )}
                                >
                                    {expert.isFollowing ? (
                                        tc.unfollow
                                    ) : (
                                        <>
                                            <UserPlus className="h-3 w-3 mr-1" />
                                            {tc.follow}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {experts.length > 0 && (
                <button className="w-full mt-6 py-2.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors border-t border-dashed border-border pt-4">
                    {t.viewAllExperts}
                </button>
            )}
        </div>
    );
}
