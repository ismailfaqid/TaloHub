"use client";

import { Button } from "@/components/ui/button";
import { Star, Filter, Check, UserPlus } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const topExperts = [
    {
        id: "expert-1",
        rank: 1,
        name: "Dr. Amina Mohamed",
        role: "HEALTH",
        answers: 1240,
        rating: "9.2k",
        image: "/avatars/amina.jpg",
        color: "bg-amber-100 text-amber-600 ring-amber-300",
    },
    {
        id: "expert-2",
        rank: 2,
        name: "Ahmed Muse, Esq.",
        role: "LEGAL",
        answers: 842,
        rating: "4.8k",
        image: "/avatars/ahmed.jpg",
        color: "bg-slate-200 text-slate-600 ring-slate-300",
    },
    {
        id: "expert-3",
        rank: 3,
        name: "Eng. Hodan Farah",
        role: "TECHNOLOGY",
        answers: 615,
        rating: "3.1k",
        image: "/avatars/hodan.jpg",
        color: "bg-orange-100 text-orange-600 ring-orange-300",
    },
];

const otherExperts = [
    {
        id: "expert-4",
        rank: 4,
        name: "Dr. Yusuf Cali",
        role: "Surgeon",
        category: "HEALTH",
        answers: 521,
        rating: "2.9k",
    },
    {
        id: "expert-5",
        rank: 5,
        name: "Sucaad Ismaaciil",
        role: "Business Consultant",
        category: "BUSINESS",
        answers: 488,
        rating: "2.4k",
    },
    {
        id: "expert-6",
        rank: 6,
        name: "Mustafe Xasan",
        role: "Software Engineer",
        category: "TECHNOLOGY",
        answers: 412,
        rating: "1.8k",
    },
    {
        id: "expert-7",
        rank: 7,
        name: "Fahma Maxamuud",
        role: "Lawyer",
        category: "LEGAL",
        answers: 395,
        rating: "1.6k",
    },
];

export default function TopExpertsPage() {
    const { t: translations } = useLanguage();
    const t = translations.expertsPage;
    const tc = translations.common;
    const ts = translations.sidebar;

    const [followedIds, setFollowedIds] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const toggleFollow = (id: string) => {
        setFollowedIds(prev =>
            prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
        );
    };

    const categories = [
        { id: "All", name: tc.all },
        { id: "HEALTH", name: ts.health },
        { id: "LEGAL", name: ts.law },
        { id: "BUSINESS", name: ts.business },
        { id: "TECHNOLOGY", name: ts.tech },
        { id: "EDUCATION", name: ts.education },
    ];

    const filteredExperts = activeCategory === "All"
        ? otherExperts
        : otherExperts.filter(e => e.category === activeCategory);

    const FollowButton = ({ id, className }: { id: string, className?: string }) => {
        const isFollowed = followedIds.includes(id);
        return (
            <Button
                onClick={() => toggleFollow(id)}
                className={cn(
                    "transition-all duration-200",
                    isFollowed
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : className || "bg-[#1AA1F5] hover:bg-[#1AA1F5]/90 text-white"
                )}
            >
                {isFollowed ? (
                    <><Check className="h-4 w-4 mr-2" /> {tc.unfollow}</>
                ) : (
                    <><UserPlus className="h-4 w-4 mr-2" /> {t.follow}</>
                )}
            </Button>
        );
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-4">{t.title}</h1>
                    <p className="text-muted-foreground max-w-2xl">
                        {t.subtitle}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link href="/expert-application">
                        <Button className="bg-sky-400 hover:bg-sky-500 text-white rounded-full px-8 py-6 text-base font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                            {t.join}
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="relative flex flex-col md:flex-row justify-center items-end gap-10 lg:gap-16 mb-20 px-4 pt-16">
                {/* Rank 2 */}
                <div className="order-2 md:order-1 flex flex-col items-center">
                    <div className="relative mb-4">
                        <div className="h-24 w-24 rounded-full bg-slate-200 border-4 border-white shadow-lg overflow-hidden">
                            <div className="h-full w-full flex items-center justify-center bg-slate-300 text-slate-600 text-2xl font-bold">{topExperts[1].name.charAt(0)}</div>
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold border-2 border-white shadow-sm">2</div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow text-center w-64 border border-border/60">
                        <Link href={`/profile/${topExperts[1].id}`}>
                            <h3 className="font-bold text-lg hover:text-primary transition-colors">{topExperts[1].name}</h3>
                        </Link>
                        <p className="text-xs font-bold text-sky-500 mb-4">{topExperts[1].role}</p>
                        <div className="flex justify-center gap-8 text-sm">
                            <div>
                                <div className="font-bold">{topExperts[1].answers}</div>
                                <div className="text-[10px] text-muted-foreground uppercase">{t.answers}</div>
                            </div>
                            <div>
                                <div className="font-bold">{topExperts[1].rating}</div>
                                <div className="text-[10px] text-muted-foreground uppercase">{t.rating}</div>
                            </div>
                        </div>
                        <FollowButton id={topExperts[1].id} className="mt-4 w-full bg-slate-100 text-slate-700 hover:bg-slate-200" />
                    </div>
                </div>

                {/* Rank 1 */}
                <div className="order-1 md:order-2 flex flex-col items-center -mt-12 z-10">
                    <div className="relative mb-4">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-amber-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </div>
                        <div className="h-32 w-32 rounded-full bg-amber-100 border-4 border-amber-200 shadow-xl overflow-hidden ring-4 ring-white">
                            <div className="h-full w-full flex items-center justify-center bg-amber-200 text-amber-600 text-3xl font-bold">{topExperts[0].name.charAt(0)}</div>
                        </div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-amber-400 text-white flex items-center justify-center font-bold border-2 border-white shadow-sm text-lg">1</div>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-amber-100/50 text-center w-72 relative transform hover:scale-[1.02] transition-transform">
                        <Link href={`/profile/${topExperts[0].id}`}>
                            <h3 className="font-bold text-xl mb-1 hover:text-primary transition-colors">{topExperts[0].name}</h3>
                        </Link>
                        <p className="text-xs font-bold text-amber-500 mb-6">{topExperts[0].role}</p>
                        <div className="flex justify-center gap-10 text-base">
                            <div>
                                <div className="font-bold text-lg">{topExperts[0].answers}</div>
                                <div className="text-[10px] text-muted-foreground uppercase font-bold">{t.answers}</div>
                            </div>
                            <div>
                                <div className="font-bold text-lg">{topExperts[0].rating}</div>
                                <div className="text-[10px] text-muted-foreground uppercase font-bold">{t.rating}</div>
                            </div>
                        </div>
                        <FollowButton id={topExperts[0].id} className="mt-6 w-full bg-[#1AA1F5] hover:bg-[#1AA1F5]/90 text-white h-12 text-base font-medium rounded-xl shadow-blue-200 shadow-lg" />
                    </div>
                </div>

                {/* Rank 3 */}
                <div className="order-3 flex flex-col items-center">
                    <div className="relative mb-4">
                        <div className="h-24 w-24 rounded-full bg-orange-100 border-4 border-white shadow-lg overflow-hidden">
                            <div className="h-full w-full flex items-center justify-center bg-orange-200 text-orange-600 text-2xl font-bold">{topExperts[2].name.charAt(0)}</div>
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-orange-300 text-white flex items-center justify-center font-bold border-2 border-white shadow-sm">3</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm text-center w-64 border border-border">
                        <Link href={`/profile/${topExperts[2].id}`}>
                            <h3 className="font-bold text-lg hover:text-primary transition-colors">{topExperts[2].name}</h3>
                        </Link>
                        <p className="text-xs font-bold text-sky-500 mb-4">{topExperts[2].role}</p>
                        <div className="flex justify-center gap-8 text-sm">
                            <div>
                                <div className="font-bold">{topExperts[2].answers}</div>
                                <div className="text-[10px] text-muted-foreground uppercase">{t.answers}</div>
                            </div>
                            <div>
                                <div className="font-bold">{topExperts[2].rating}</div>
                                <div className="text-[10px] text-muted-foreground uppercase">{t.rating}</div>
                            </div>
                        </div>
                        <FollowButton id={topExperts[2].id} className="mt-4 w-full bg-slate-100 text-slate-700 hover:bg-slate-200" />
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex items-center gap-8 border-b mb-6 overflow-x-auto pb-1 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={cn(
                                "text-sm pb-3 px-1 whitespace-nowrap transition-all border-b-2",
                                activeCategory === cat.id
                                    ? "font-semibold text-primary border-primary"
                                    : "font-medium text-muted-foreground border-transparent hover:text-foreground"
                            )}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="bg-white dark:bg-card rounded-xl border border-border overflow-hidden">
                    <div className="grid grid-cols-12 gap-6 p-6 bg-muted/30 text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b">
                        <div className="col-span-1">{t.rank}</div>
                        <div className="col-span-4">{t.expert}</div>
                        <div className="col-span-2">{t.topic}</div>
                        <div className="col-span-2">{t.answers}</div>
                        <div className="col-span-2">{t.rating}</div>
                        <div className="col-span-1">Action</div>
                    </div>

                    {filteredExperts.length > 0 ? (
                        filteredExperts.map((expert) => (
                            <div key={expert.rank} className="grid grid-cols-12 gap-6 p-6 items-center border-b last:border-0 hover:bg-muted/10 transition-colors group/row">
                                <div className="col-span-1 font-bold text-muted-foreground">#{expert.rank}</div>
                                <div className="col-span-4 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                                        {expert.name.charAt(0)}
                                    </div>
                                    <div>
                                        <Link href={`/profile/${expert.id}`}>
                                            <div className="font-semibold text-sm hover:text-primary transition-colors">{expert.name}</div>
                                        </Link>
                                        <div className="text-xs text-muted-foreground">{expert.role}</div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${expert.category === 'HEALTH' ? 'bg-blue-100 text-blue-600' :
                                        expert.category === 'BUSINESS' ? 'bg-green-100 text-green-600' :
                                            expert.category === 'TECHNOLOGY' ? 'bg-purple-100 text-purple-600' :
                                                'bg-gray-100 text-gray-600'
                                        }`}>
                                        {expert.category}
                                    </span>
                                </div>
                                <div className="col-span-2 font-semibold text-sm">{expert.answers}</div>
                                <div className="col-span-2 flex items-center gap-1 text-sm font-semibold">
                                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                    {expert.rating}
                                </div>
                                <div className="col-span-1">
                                    <FollowButton id={expert.id} className="h-8 w-full variant-outline text-xs" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-muted-foreground italic">
                            No experts found in this category.
                        </div>
                    )}
                </div>

                <div className="flex justify-center mt-6">
                    <Button variant="ghost" className="text-primary hover:text-primary/90">
                        {t.viewAll} (150+)
                    </Button>
                </div>
            </div>
        </div>
    );
}
