"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle2, UploadCloud, Briefcase, GraduationCap, Scale, Cpu, HeartPulse, BookOpen, Users } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ExpertApplicationPage() {
    const { t: translations } = useLanguage();
    const t = translations.expertApplication;
    const ts = translations.sidebar;
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="max-w-3xl mx-auto py-20 px-4 text-center">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    <CheckCircle2 className="h-10 w-10" />
                </div>
                <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    {t.success}
                </p>
                <Link href="/">
                    <Button size="lg" className="px-8">
                        {translations.common.backToHome}
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <div className="mb-8">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    {t.back}
                </Link>
                <h1 className="text-3xl font-bold tracking-tight mb-2">{t.title}</h1>
                <p className="text-muted-foreground">
                    {t.subtitle}
                </p>
            </div>

            <div className="space-y-6">
                <div className="rounded-xl border border-border bg-card p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">{t.progress}</h3>
                        <span className="text-primary font-bold">25%</span>
                    </div>
                    <h2 className="font-bold mb-2">{t.step}</h2>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/4"></div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-primary/10 p-2 rounded-full text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        </div>
                        <h2 className="text-lg font-semibold">{t.personalInfo}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullname">{t.fullName}</Label>
                            <Input id="fullname" placeholder={t.fullNamePlaceholder} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="title">{t.proTitle}</Label>
                            <Input id="title" placeholder={t.proTitlePlaceholder} />
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-primary/10 p-2 rounded-full text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5" /><polyline points="13.5 2 13.5 8.5 20 8.5" /></svg>
                        </div>
                        <h2 className="text-lg font-semibold">{t.category}</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { id: "health", name: ts.health, icon: HeartPulse },
                            { id: "business", name: ts.business, icon: Briefcase },
                            { id: "edu", name: ts.education, icon: GraduationCap },
                            { id: "religion", name: ts.religion, icon: BookOpen },
                            { id: "tech", name: ts.tech, icon: Cpu },
                            { id: "law", name: ts.law, icon: Scale },
                        ].map((cat) => (
                            <div
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition-all hover:border-primary/50",
                                    selectedCategory === cat.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "bg-card border-border"
                                )}
                            >
                                <cat.icon className={cn("h-6 w-6", selectedCategory === cat.id ? "text-primary" : "text-muted-foreground")} />
                                <span className="text-xs font-semibold">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4 pt-6">
                    <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                        <h2 className="text-lg font-semibold">{t.verification}</h2>
                    </div>

                    <div
                        className={cn(
                            "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer",
                            selectedFile ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30"
                        )}
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".pdf,image/*"
                        />
                        <div className={cn("p-3 rounded-full mb-4", selectedFile ? "bg-primary text-white" : "bg-primary/10 text-primary")}>
                            {selectedFile ? <CheckCircle2 className="h-6 w-6" /> : <UploadCloud className="h-6 w-6" />}
                        </div>
                        <h3 className="font-semibold mb-1">
                            {selectedFile ? selectedFile.name : t.uploadTitle}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : t.uploadDesc}
                        </p>
                        <div className="flex gap-2 mt-4">
                            <Button variant={selectedFile ? "secondary" : "outline"} size="sm">
                                {selectedFile ? "Change File" : t.chooseFile}
                            </Button>
                            {selectedFile && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFile(null);
                                    }}
                                >
                                    Clear
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-6">
                    <div className="flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10v6" /><path d="M20 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" /><path d="m15 14 1 1-3 3-3-3 1-1" /><path d="M20 22a2 2 0 0 1 2-2v-2a2 2 0 0 1-2-2H4a2 2 0 0 1-2 2v2a2 2 0 0 1 2 2z" /></svg>
                        <h2 className="text-lg font-semibold">{t.experience}</h2>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="experience">{t.experienceLabel}</Label>
                        <Textarea
                            id="experience"
                            placeholder={t.experiencePlaceholder}
                            className="min-h-[120px]"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-6">
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 px-8"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? t.submitting : t.submit}
                    </Button>
                </div>
            </div>

            <div className="mt-12 flex justify-center gap-8 border-t pt-8">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                    {t.secureData}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {t.verifiedExperts}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    <Users className="h-4 w-4 text-primary" />
                    {t.community}
                </div>
            </div>
        </div>
    );
}
