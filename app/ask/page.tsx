"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Bold,
    Italic,
    List,
    Link as LinkIcon,
    Plus,
    HeartPulse,
    Briefcase,
    GraduationCap,
    Cpu,
    Gavel,
    Lightbulb,
    Loader2,
    BookOpen
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { createQuestion } from "@/app/actions/questions";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AskQuestionPage() {
    const { t: translations } = useLanguage();
    const t = translations.ask;
    const ts = translations.sidebar;
    const tc = translations.common;

    const categories = [
        { id: "health", name: ts.health, icon: HeartPulse },
        { id: "business", name: ts.business, icon: Briefcase },
        { id: "education", name: ts.education, icon: GraduationCap },
        { id: "religion", name: ts.religion, icon: BookOpen },
        { id: "tech", name: ts.tech, icon: Cpu },
        { id: "law", name: ts.law, icon: Gavel },
    ];

    const [selectedCategory, setSelectedCategory] = useState("health");
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [type, setType] = useState<"QUESTION" | "POST">("QUESTION");
    const isPostType = type === "POST";
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!title.trim()) {
            setError(t.errorTitle);
            return;
        }

        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", details);
        formData.append("category", selectedCategory);
        formData.append("type", type);
        if (isAnonymous) formData.append("isAnonymous", "on");

        try {
            const result = await createQuestion(formData);
            if (result.success) {
                router.push("/");
            } else {
                setError(result.error || t.errorSubmit);
            }
        } catch (err) {
            setError(tc.error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        {isPostType ? "Create a Post" : t.title}
                    </h1>
                    <p className="text-muted-foreground">
                        {isPostType ? "Share your thoughts, articles, or insights about a topic." : t.subtitle}
                    </p>
                </div>
                <div className="bg-muted p-1 rounded-lg flex items-center shrink-0 w-fit">
                    <button
                        onClick={() => setType("QUESTION")}
                        className={cn(
                            "px-6 py-2 rounded-md text-sm font-medium transition-all",
                            !isPostType ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                        )}
                    >
                        Question
                    </button>
                    <button
                        onClick={() => setType("POST")}
                        className={cn(
                            "px-6 py-2 rounded-md text-sm font-medium transition-all",
                            isPostType ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                        )}
                    >
                        Post
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border rounded-xl shadow-sm p-6 md:p-8">
                        {error && (
                            <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}
                        {/* Title Input */}
                        <div className="space-y-3 mb-8">
                            <Label htmlFor="title" className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                                {isPostType ? "Post Title" : t.questionTitle}
                            </Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={isPostType ? "What is your post about?" : t.titlePlaceholder}
                                className="text-lg md:text-xl font-medium border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 placeholder:text-gray-300 h-12"
                            />
                            <div className="flex justify-end">
                                <span className="text-xs text-muted-foreground">{title.length} / 150</span>
                            </div>
                        </div>

                        {/* Details Input */}
                        <div className="space-y-3 mb-8">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="details" className="font-semibold text-sm">
                                    {isPostType ? "Content" : t.details}{" "}
                                    <span className="text-muted-foreground font-normal">
                                        {!isPostType && tc.optional}
                                    </span>
                                </Label>
                                <div className="flex items-center gap-1 text-muted-foreground bg-gray-50 rounded-md p-1">
                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-white hover:text-black hover:shadow-sm"><Bold className="h-3.5 w-3.5" /></Button>
                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-white hover:text-black hover:shadow-sm"><Italic className="h-3.5 w-3.5" /></Button>
                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-white hover:text-black hover:shadow-sm"><List className="h-3.5 w-3.5" /></Button>
                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-white hover:text-black hover:shadow-sm"><LinkIcon className="h-3.5 w-3.5" /></Button>
                                </div>
                            </div>
                            <Textarea
                                id="details"
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                placeholder={isPostType ? "Share your knowledge and ideas..." : t.detailsPlaceholder}
                                className="min-h-[180px] bg-gray-50/50 border-gray-200 resize-none text-base p-4 focus-visible:ring-1 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
                            />
                        </div>

                        {/* Category Selection */}
                        <div className="space-y-3 mb-8">
                            <Label className="font-semibold text-sm">{t.category}</Label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border",
                                            selectedCategory === cat.id
                                                ? "bg-blue-50 border-blue-200 text-blue-700 ring-1 ring-blue-200"
                                                : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                        )}
                                    >
                                        <cat.icon className={cn("h-4 w-4", selectedCategory === cat.id ? "text-blue-600" : "text-gray-400")} />
                                        {cat.name}
                                    </button>
                                ))}
                                <button className="h-9 w-9 flex items-center justify-center rounded-full border border-dashed border-gray-300 text-gray-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50 transition-colors">
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <Switch id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                                <Label htmlFor="anonymous" className="font-normal text-sm cursor-pointer text-gray-600">
                                    {t.anonymous}
                                </Label>
                            </div>

                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                <button className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
                                    {t.saveDraft}
                                </button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white px-6 font-semibold shadow-blue-200 shadow-md transition-all active:scale-95 min-w-[140px]"
                                >
                                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                    {isLoading ? t.sending : (isPostType ? "Publish Post" : t.submit)}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex gap-4">
                        <div className="text-blue-600 shrink-0 mt-0.5">
                            <Lightbulb className="h-5 w-5 fill-current" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-blue-900 text-sm">
                                {isPostType ? "Tips for a great post" : t.adviceTitle}
                            </h3>
                            <ul className="list-disc list-inside text-sm text-blue-800 space-y-1 ml-1" role="list">
                                {isPostType ? (
                                    <>
                                        <li>Make sure your post is informative and well-structured.</li>
                                        <li>Use formatting options to highlight important points.</li>
                                        <li>Choose the right category to reach the target audience.</li>
                                    </>
                                ) : (
                                    <>
                                        <li>{t.advice1}</li>
                                        <li>{t.advice2}</li>
                                        <li>{t.advice3}</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block space-y-6">
                    <div className="text-center py-12 px-4 opacity-40">
                    </div>
                </div>
            </div>

            <footer className="mt-16 py-8 text-center text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                © 2026 TaloHub Community. Made for Growth.
            </footer>
        </div>
    );
}
