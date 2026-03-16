"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Check, Briefcase, GraduationCap, Gavel, Cog, HeartPulse } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";

export default function TopicsPage() {
    const { t: translations, language } = useLanguage();
    const t = translations.topicsPage;
    const ts = translations.sidebar;
    const tc = translations.common;

    const categories = [
        { slug: "health", name: ts.health, description: language === "so" ? "Talooyinka iyo dooda ku saabsan caafimaadka guud iyo badqabka nolosha." : "General health advice and discussions on well-being.", icon: HeartPulse, color: "bg-blue-100 text-blue-600", following: false },
        { slug: "business", name: ts.business, description: language === "so" ? "Ganacsiga, maalgashiga iyo isbedelada suuqa maxaliga ah." : "Business, investment and local market trends.", icon: Briefcase, color: "bg-green-100 text-green-600", following: true },
        { slug: "education", name: ts.education, description: language === "so" ? "Khayraadka waxbarashada, deeqaha iyo talooyinka akadeemiyada." : "Education resources, scholarships and academic advice.", icon: GraduationCap, color: "bg-indigo-100 text-indigo-600", following: false },
        { slug: "law", name: ts.law, description: language === "so" ? "Xuquuqda sharciga, xeerarka dalka iyo arrimaha cadaaladda." : "Legal rights, national laws and justice matters.", icon: Gavel, color: "bg-red-100 text-red-600", following: false },
        { slug: "religion", name: ts.religion, description: language === "so" ? "Su'aalaha diinta, fatwooyinka iyo anshaxa nolosha Muslimka." : "Religious questions, fatwas and Muslim life ethics.", icon: Briefcase, color: "bg-amber-100 text-amber-600", following: false },
        { slug: "tech", name: ts.tech, description: language === "so" ? "Aaladaha dhijitaalka ah, software-ka iyo isbedelka farsamada." : "Digital tools, software and technological change.", icon: Cog, color: "bg-purple-100 text-purple-600", following: false },
    ];

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="mb-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">{t.title}</h1>
                    <p className="text-muted-foreground mb-6">
                        {t.subtitle}
                    </p>
                    <div className="relative max-w-xl">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder={t.searchPlaceholder}
                            className="pl-10 h-11 rounded-xl bg-white dark:bg-card border-border shadow-sm"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {categories.map((category) => (
                        <div key={category.name} className="bg-card border border-border p-6 rounded-xl flex flex-col items-start gap-4 hover:shadow-md transition-shadow group">
                            <Link href={`/topic/${category.slug}`} className="w-full">
                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${category.color}`}>
                                    <category.icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                        {category.description}
                                    </p>
                                </div>
                            </Link>
                            <Button
                                className={`w-full ${category.following ? "bg-green-500 hover:bg-green-600" : "bg-[#1AA1F5] hover:bg-[#1AA1F5]/90"}`}
                            >
                                {category.following ? (
                                    <>
                                        <Check className="h-4 w-4 mr-2" /> {tc.unfollow}
                                    </>
                                ) : (
                                    <>
                                        <Plus className="h-4 w-4 mr-2" /> {tc.follow}
                                    </>
                                )}
                            </Button>
                        </div>
                    ))}

                    <div className="border-2 border-dashed border-border p-6 rounded-xl flex flex-col items-center justify-center text-center text-muted-foreground min-h-[200px] cursor-pointer hover:bg-muted/30">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                            <Plus className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold">{t.suggest}</h3>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto">
                <div className="bg-[#1AA1F5] p-8 rounded-2xl text-white text-center shadow-lg">
                    <h3 className="font-bold text-2xl mb-3">{t.trusted}</h3>
                    <p className="text-base opacity-90 mb-6 font-medium">
                        {t.trustedDesc}
                    </p>
                    <div className="flex justify-center">
                        <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Check className="h-7 w-7" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
